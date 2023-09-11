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

  private checkSeatAvailability(seat: Seat): boolean {
    return seat.status === 'available';
  }

  private getUnavailableSeats(seats: Seat[]): {
    message: string;
    seats: Seat[];
  } {
    const unavailableSeats = [];
    seats.forEach((seat) => {
      if (!this.checkSeatAvailability(seat)) {
        unavailableSeats.push(seat);
      }
    });
    const message = 'seats are not available, kindly choose another seat';
    return { message, seats: unavailableSeats };
  }

  private calculateTotalAmount(seats: Seat[]): number {
    let total = 0;
    seats.forEach((seat) => {
      total += seat.price;
    });
    return total;
  }
}
