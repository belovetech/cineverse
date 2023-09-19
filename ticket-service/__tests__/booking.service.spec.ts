import { describe, it, expect, beforeAll } from 'vitest';
import { BookingService } from '../src/services/booking.service';

describe('BookingService', () => {
  let bookingService: BookingService;

  beforeAll(() => {
    bookingService = new BookingService();
  });

  describe('create', () => {
    it('should throw an error if booking is not valid', async () => {
      try {
        await bookingService.create({} as any);
      } catch (error) {
        expect(error.message).toBe('bookingId must be a string');
      }
    });

    it('should create a booking', async () => {
      const booking = await createBooking(bookingService);
      expect(booking).toBeDefined();
      expect(booking.bookingId).toBe('bookingId');
      expect(booking.seats).toEqual(['A1']);
      expect(booking.totalAmount).toBe(250.0);
    });
  });

  describe('update booking', () => {
    it('should update booking status', async () => {
      const booking = await createBooking(bookingService);
      const updatedBooking = await bookingService.updateBookingStatus(
        booking.bookingId,
        'CANCELLED',
      );
      expect(updatedBooking).toBeDefined();
      expect(updatedBooking.bookingStatus).toBe('CANCELLED');
    });

    it('should update booking status and total amount', async () => {
      let booking = await createBooking(bookingService);
      booking.totalAmount = 500.0;
      const updatedBooking =
        await bookingService.updateBookingStatusAndTotalAmount(booking);
      expect(updatedBooking).toBeDefined();
      expect(updatedBooking.bookingStatus).toBe('COMPLETED');
      expect(updatedBooking.totalAmount).toBe(500.0);
    });
  });
});

const createBooking = async (bookingService: BookingService) => {
  return await bookingService.create({
    customerId: 'd4f9f8f76d9a4a6388f96e66d59b19d0',
    movieId: 'd4f9f8f7-6d9a-4a63-88f9-6e66d59b19d0',
    theaterId: 'd4f9f8f7-6d9a-4a63-88f9-6e66d59b19d0',
    showtimeId: 'd4f9f8f7-6d9a-4a63-88f9-6e66d59b19d0',
    seatNumber: 'A12',
    seats: [
      {
        bookingId: 'd4f9f8f7-6d9a-4a63-88f9-6e66d59b19d0',
        seatNumber: 'A12',
        price: 125.0,
      },
      {
        bookingId: 'd4f9f8f7-6d9a-4a63-88f9-6e66d59b19d0',
        seatNumber: 'A12',
        price: 125.0,
      },
    ],
  });
};
