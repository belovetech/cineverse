import { ConflictException, NotFoundException } from '@cineverse/libs';
import { ShowtimeDataValidator } from '@validators/showtimeDataValidator';
import { ShowTimeDto } from '@dtos/showtime.dto';
import { showtimeRepository } from '@respositories';
import { Metadata } from '@interfaces/pagination.interface';
import ShowTime from '@models/showtime';

export default class ShowtimeService {
  public async createShowtime(showtime: ShowTimeDto): Promise<ShowTime> {
    new ShowtimeDataValidator(showtime).validate();

    const { startTime, endTime, theaterId } = showtime;
    const showtimeExist = await showtimeRepository.findOne({ where: { startTime, endTime, theaterId } });
    if (showtimeExist) throw new ConflictException('Show time already exist');

    const newShowtime = await showtimeRepository.create(showtime);
    return newShowtime;
  }

  public async getShowtimes(reqQuery: Record<string, unknown>): Promise<{ showtimes: ShowTime[]; metadata: Metadata }> {
    return await showtimeRepository.findAll(reqQuery as Record<string, string>);
  }

  public async getShowtime(showTimeId: string): Promise<ShowTime | null> {
    const showtime = await showtimeRepository.findByPk(showTimeId);
    if (showtime === null) throw new NotFoundException('Show time not found');
    return showtime;
  }
}
