import { Booking } from '@models';
import { CreateBookingDto } from '@dto';

export class BookingRepository {
  public async create(booking: CreateBookingDto): Promise<Booking> {
    return await Booking.create(booking);
  }

  public async update(
    bookingId: string,
    options: Partial<Booking>,
  ): Promise<Booking> {
    Booking.update({ ...options }, { where: { bookingId } });
    return await this.findByPk(bookingId);
  }

  public async findByPk(bookingId: string): Promise<Booking | null> {
    return await Booking.findByPk(bookingId);
  }
}
