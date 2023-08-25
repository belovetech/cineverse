import { ConflictException } from '@cineverse/exceptions';
import { showtimeRepository } from '@respositories';
import ShowTimeDto from '@dtos/showtime.dto';

export default class ShowtimeService {
  public static async createShowtime(showtime: ShowTimeDto): Promise<ShowTimeDto> {
    new ShowtimeDataValidator<ShowTimeDto>(showtime).validate();
    const movieExist = await showtimeRepository.findOne({ where: { title: showtime.title } });
    if (movieExist) throw new ConflictException('Movie with this title already exist');

    const newMovie: ShowTimeDto = await showtimeRepository.create(showtime);
    return newMovie;
  }

  public static async getShowtime(reqQuery: Record<string, unknown>): Promise<IGetMovie> {
    return showtimeRepository.getMovies(reqQuery as Record<string, string>);
  }

  public static async getMovie(movieId: string): Promise<IMovie> {
    return showtimeRepository.getMovieById(movieId);
  }
}
