import { ConflictException } from '@cineverse/exceptions';
import { showtimeRepository } from '@respositories';
import { ShowtimeDataValidator } from '@validators/showtimeDataValidator';
import { ShowTimeDto } from '@dtos/showtime.dto';

export default class ShowtimeService {
  public async createShowtime(showtime: ShowTimeDto): Promise<ShowTimeDto> {
    new ShowtimeDataValidator<ShowTimeDto>(showtime).validate();
    const { startTime, movieId, theaterId } = showtime;
    const showtimeExist = await showtimeRepository.findOne({ where: { movieId, theaterId, startTime } });
    if (showtimeExist) throw new ConflictException('Show time already exist');

    const newShowtime = await showtimeRepository.create(showtime);
    return newShowtime;
  }

  public async getAllShowtime(reqQuery: Record<string, unknown>): Promise<{ showtimes: ShowTimeDto[]; metadata: object }> {
    return showtimeRepository.findAll(reqQuery as Record<string, string>);
  }

  public async getShowtime(showtimeId: string): Promise<ShowTimeDto> {
    return showtimeRepository.findByPk(showtimeId);
  }
}
