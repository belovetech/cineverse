export interface Seat {
  seatId: string;
  seatNumber: string;
  seatType: string;
  price: number;
  status: string;
}

export class SeatUtils {
  public calculateTotalAmount(seats: Seat[]): number {
    return seats
      .filter((seat) => seat.status !== 'booked')
      .reduce((total, seat) => total + seat.price, 0);
  }

  public async updateSeatStatus(seatId: string, status: string) {
    //TODO: update seat status
    return seatId + status;
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
