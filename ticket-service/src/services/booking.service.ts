import { v4 as uuidv4 } from 'uuid';
import { Booking } from '@models';
import { validateDto } from '@utils/validator';
import { bookingRepository } from '@repositories';
import { BadRequestException, logger } from '@cineverse/libs';
import { CreateBookingDto, CreateTicketDto } from '@dto';
import { ticketService } from '@services';
import { generateQRCode } from '@utils/generateQRcode';
import { BookingStatus } from '@models/booking';
// import database from '@datasource/database';

export interface Seat {
  seatId: string;
  seatNumber: string;
  seatType: string;
  price: number;
  status: string;
}

export class BookingService {
  public async create(booking: CreateBookingDto): Promise<Booking> {
    const validationErrors = await validateDto(booking, CreateBookingDto);

    if (validationErrors.length > 0) {
      throw new BadRequestException({ errors: validationErrors });
    }

    const unavailable = this.getUnavailableSeats(booking.seats);
    if (unavailable.seats.length > 0) {
      throw new BadRequestException(unavailable);
    }

    // TODO: update seat status to booked by making an update request to seat-service
    // Create booking
    let booked;
    try {
      booking.totalAmount = this.calculateTotalAmount(booking.seats);
      booking.bookingStatus = BookingStatus.COMPLETED;
      booked = await bookingRepository.create(booking);
    } catch (error) {
      booking.bookingStatus = BookingStatus.CANCELLED;
    }

    // generate ticket for each seat
    try {
      await this.createTicket(booked.bookingId, booking.seats);
    } catch (error) {
      throw new BadRequestException(error);
    }

    // TODO: make payment via rabbitmq to payment-service
    return booked;
  }

  private async createTicket(bookingId: string, seats: Seat[]) {
    for (const seat of seats) {
      try {
        const priceToDecimal = (price) => Number(price.toFixed(2));
        await ticketService.create({
          bookingId: bookingId,
          seatNumber: seat.seatNumber,
          price: priceToDecimal(seat.price),
          QRCode: await this.generateQRCode(seat),
        } as CreateTicketDto);
      } catch (error) {
        if (error instanceof BadRequestException) {
          throw error;
        }
        logger.error('Error creating ticket:', error);
      }
    }
  }

  private async generateQRCode(seat: Seat): Promise<string> {
    const [_, qrImagePath] = await generateQRCode({
      qrcodeId: uuidv4(),
      seatId: seat.seatId,
      seatNumber: seat.seatNumber,
      price: seat.price,
    });
    return qrImagePath;
  }

  private calculateTotalAmount(seats: Seat[]): number {
    // TODO: calculate only available seats price
    return seats.reduce((total, seat) => total + seat.price, 0);
  }

  private getUnavailableSeats(seats: Seat[]): {
    message: string;
    seats: Seat[];
  } {
    const unavailableSeats = seats.filter((seat) => seat.status === 'booked');
    const message = 'Seats are not available, kindly choose another seat';
    return { message, seats: unavailableSeats };
  }
}
