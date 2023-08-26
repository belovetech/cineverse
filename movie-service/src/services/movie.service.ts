import { ConflictException } from '@cineverse/exceptions';
import { MovieDto } from '@dtos/movie.dto';
import { MovieDataValidator } from '@validators/movieDataValidator';
import IMovie, { IGetMovie } from '@interfaces/movie.interface';
import { movieRepository } from '@respositories';

export default class MovieService {
  public static async createMovie(movieData: MovieDto): Promise<MovieDto> {
    new MovieDataValidator<MovieDto>(movieData).validate();
    const movieExist = await movieRepository.findOne({ where: { title: movieData.title } });
    if (movieExist) throw new ConflictException('Movie with this title already exist');

    const newMovie: MovieDto = await movieRepository.create(movieData);
    return newMovie;
  }

  public static async getMovies(reqQuery: Record<string, unknown>): Promise<IGetMovie> {
    return movieRepository.findAll(reqQuery as Record<string, string>);
  }

  public static async getMovie(movieId: string): Promise<IMovie> {
    return movieRepository.findByPk(movieId);
  }
}
