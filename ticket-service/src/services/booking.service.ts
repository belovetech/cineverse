import { Booking } from '@models';
import { bookingRepository } from '@repositories';
import { CreateBookingDto } from '@dto';
import { ticketService } from '@services';
import { BookingStatus } from '@models/booking';
import { v4 as uuidv4 } from 'uuid';
import { SeatUtils } from './seat.utils';
import {
  BadRequestException,
  MessageQueue,
  validateDto,
} from '@cineverse/libs';

const { calculateTotalAmount, getUnavailableSeats } = new SeatUtils();

export class BookingService {
  constructor(private messageQueue = new MessageQueue('amqp://localhost')) {}

  public async create(booking: CreateBookingDto): Promise<Booking> {
    const validationErrors = await validateDto(booking, CreateBookingDto);

    if (validationErrors.length > 0) {
      throw new BadRequestException({ errors: validationErrors });
    }

    const unavailableSeat = getUnavailableSeats(booking.seats);
    if (unavailableSeat.seats.length > 0) {
      throw new BadRequestException(unavailableSeat);
    }

    let newBooking: Booking | undefined;
    let updatedBooking: Booking[] | [];
    try {
      newBooking = await bookingRepository.create({
        bookingId: uuidv4(),
        ...booking,
      });

      if (!newBooking.seats.length) {
        throw new BadRequestException({ message: 'No seats selected' });
      }

      updatedBooking = await this.updateBookingStatusAndTotalAmount(newBooking);
      // send booking details for payment process
      this.messageQueue.bindExchangeWithQueue('booking-X', 'booking-queue');
      this.messageQueue.sendMessage(updatedBooking[0]);

      await ticketService.generateTickets(
        newBooking.bookingId,
        newBooking.seats,
      );

      // TODO: update seat status to newBooking
    } catch (err) {
      if (newBooking !== undefined) {
        this.updateBookingStatus(booking, BookingStatus.CANCELLED);
        await ticketService.deleteGeneratedTickets(newBooking.bookingId);
        await bookingRepository.delete(newBooking.bookingId);
        // TODO: update seat status to available/cancelled
      }
      throw new BadRequestException(JSON.parse((err as Error).message));
    }

    return updatedBooking[0];
  }

  private async updateBookingStatus(
    booking: Partial<Booking>,
    status: BookingStatus,
  ) {
    return await bookingRepository.update(booking.bookingId, {
      bookingStatus: status,
    });
  }

  private updateBookingStatusAndTotalAmount(booking: Partial<Booking>) {
    return bookingRepository.update(booking.bookingId, {
      bookingStatus: BookingStatus.COMPLETED,
      totalAmount: calculateTotalAmount(booking.seats),
    });
  }

  public async checkPaymentStatus() {
    return new Promise((resolve, reject) => {
      try {
        const content = this.messageQueue.getMessage();
        resolve(content);
      } catch (error) {
        reject(error);
      }
    });
  }
}
