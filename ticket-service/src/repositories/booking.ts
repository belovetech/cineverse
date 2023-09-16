import { Booking } from '@models';
import { CreateBookingDto } from '@dto';

export class BookingRepository {
  public async create(booking: CreateBookingDto): Promise<Booking> {
    return await Booking.create(booking);
  }

  public async update(
    bookingId: string,
    options: Partial<Booking>,
  ): Promise<Booking[]> {
    const [_, updatedBooking] = await Booking.update(
      { ...options },
      { where: { bookingId }, returning: true },
    );
    return updatedBooking;
  }

  public async findByPk(bookingId: string): Promise<Booking | null> {
    return await Booking.findByPk(bookingId);
  }

  public async delete(bookingId: string): Promise<void> {
    await Booking.destroy({ where: { bookingId } });
  }
}
