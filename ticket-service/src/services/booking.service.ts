import { bookingRepository } from '@repositories';
import { CreateBookingDto } from '@dto';
import { Booking } from '@models';
import { validateDto } from '@utils/validator';
import { BadRequestException } from '@cineverse/libs';

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

    /**
     * [  {"seatId": "aaaa", "seatNumber": "A2", "seatType": "regular", "price": 10, "status": "available"},"},
     */

    const unavailable = this.getUnavailableSeats(booking.seats);
    if (unavailable.seats.length > 0) {
      throw new BadRequestException(unavailable);
    }

    booking.totalAmount = this.calculateTotalAmount(booking.seats);

    // TODO: update seat status to booked by making an update request to seat-service

    // TODO: create ticket

    // TODO: make payment

    // TODO: create booking

    return await bookingRepository.create(booking);
  }

  calculateTotalAmount(seats: Seat[]): number {
    return seats.reduce((total, seat) => total + seat.price, 0);
  }

  public getUnavailableSeats(seats: Seat[]): {
    message: string;
    seats: Seat[];
  } {
    const unavailableSeats = seats.filter((seat) => seat.status === 'booked');
    const message = 'Seats are not available, kindly choose another seat';
    return { message, seats: unavailableSeats };
  }
}
