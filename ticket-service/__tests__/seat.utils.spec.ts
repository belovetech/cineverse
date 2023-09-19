import { describe, it, expect, beforeAll } from 'vitest';
import { SeatUtils, Seat } from '../src/services/seat.utils';

describe('SeatUtils', () => {
  let seatUtils: SeatUtils;
  let seats: Seat[];
  beforeAll(() => {
    seatUtils = new SeatUtils();

    seats = [
      {
        seatId: 'seatId',
        seatNumber: 'A1',
        seatType: 'regular',
        price: 10,
        status: 'available',
      },
      {
        seatId: 'seatId',
        seatNumber: 'A2',
        seatType: 'regular',
        price: 10,
        status: 'booked',
      },
    ];
  });

  describe('calculateTotalAmount', () => {
    it('should calculate total amount', async () => {
      const totalAmount = seatUtils.calculateTotalAmount(seats);
      expect(totalAmount).toBe(20);
    });
  });

  describe('getUnavailableSeats', () => {
    it('should return unavailable seats', async () => {
      const unavailableSeats = seatUtils.getUnavailableSeats(seats);
      expect(unavailableSeats.message).toBe(
        'Seats are not available, kindly choose another seat',
      );
      expect(unavailableSeats.seats.length).toBe(1);
    });
  });
});
