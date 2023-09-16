import { Booking } from '@models';
import { validateDto } from '@utils/validator';
import { bookingRepository } from '@repositories';
import { BadRequestException } from '@cineverse/libs';
import { CreateBookingDto } from '@dto';
import { ticketService } from '@services';
import { BookingStatus } from '@models/booking';
import { v4 as uuidv4 } from 'uuid';
import { SeatUtils } from './seat.utils';

const { calculateTotalAmount, getUnavailableSeats } = new SeatUtils();

export class BookingService {
  public async create(booking: CreateBookingDto): Promise<Booking> {
    const validationErrors = await validateDto(booking, CreateBookingDto);

    if (validationErrors.length > 0) {
      throw new BadRequestException({ errors: validationErrors });
    }

    const unavailable = getUnavailableSeats(booking.seats);
    if (unavailable.seats.length > 0) {
      throw new BadRequestException(unavailable);
    }

    let newBooking: Booking | undefined;
    let updatedBooking: Booking[] | [];
    try {
      booking.bookingId = uuidv4();
      newBooking = await bookingRepository.create(booking);
      await this.updateBookingStatus(newBooking, BookingStatus.COMPLETED);
      updatedBooking = await this.updateBookingTotalAmount(newBooking);
      await ticketService.generateTickets(newBooking.bookingId, booking.seats);
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

    // TODO: make payment via rabbitmq to payment-service
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

  private updateBookingTotalAmount(booking: Partial<Booking>) {
    return bookingRepository.update(booking.bookingId, {
      totalAmount: calculateTotalAmount(booking.seats),
    });
  }
}
