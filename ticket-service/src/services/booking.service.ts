import { bookingRepository } from '@repositories';
import { CreateBookingDto } from '@dto';
import { Booking } from '@models';
import { validateDto } from '@utils/validator';
import { BadRequestException } from '@cineverse/libs';

export class BookingService {
  public async create(booking: CreateBookingDto): Promise<Booking> {
    const errors = await validateDto(booking, CreateBookingDto);

    if (errors.length > 0) {
      throw new BadRequestException({ errors });
    }

    return await bookingRepository.create(booking);
  }
}
