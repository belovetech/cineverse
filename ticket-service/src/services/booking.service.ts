import { v4 as uuidv4 } from 'uuid';
import { Booking } from '@models';
import { validateDto } from '@utils/validator';
import { bookingRepository } from '@repositories';
import { BadRequestException } from '@cineverse/libs';
import { CreateBookingDto, CreateTicketDto } from '@dto';
import { ticketService } from '@services';
import { generateQRCode } from '@utils/generateQRcode';
import { isInstance } from 'class-validator';
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

    //TODO: take customerId from token

    const unavailable = this.getUnavailableSeats(booking.seats);
    if (unavailable.seats.length > 0) {
      throw new BadRequestException(unavailable);
    }

    booking.totalAmount = this.calculateTotalAmount(booking.seats);

    // TODO: update seat status to booked by making an update request to seat-service

    // TODO: create ticket
    const bookingId = uuidv4();
    try {
      await this.createTicket(bookingId, booking.seats);
    } catch (error) {
      throw new BadRequestException(error);
    }

    // TODO: make payment

    // TODO: create booking
    booking.bookingId = bookingId;
    return await bookingRepository.create(booking);
  }

  private async createTicket(bookingId: string, seats: Seat[]) {
    for (const seat of seats) {
      try {
        await ticketService.create({
          bookingId: bookingId,
          seatNumber: seat.seatNumber,
          price: seat.price,
          QRCode: await this.generateQRCode(seat),
        } as CreateTicketDto);
      } catch (error) {
        if (error instanceof BadRequestException) {
          console.log(error.errors);
        }
        throw new BadRequestException(error);
      }
    }
  }

  private async generateQRCode(seat: Seat): Promise<string> {
    return await generateQRCode({
      qrcodeId: uuidv4(),
      seatId: seat.seatId,
      seatNumber: seat.seatNumber,
      price: seat.price,
    });
  }

  private calculateTotalAmount(seats: Seat[]): number {
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
