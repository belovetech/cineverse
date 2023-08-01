import { ConflictException } from '@cineverse/exceptions';
import { MovieDto } from '@dtos/movie.dto';
import { MovieDataValidator } from '@validators/movieDataValidator';
import { IGetMovie } from '@interfaces/movie.interface';
import MovieRepository from '@respositories/movie.repository';

export default class MovieService {
  private static movieRepository = new MovieRepository();

  public static async createMovie(movieData: MovieDto): Promise<MovieDto> {
    new MovieDataValidator<MovieDto>(movieData).validate();
    const movieExist = await this.movieRepository.getMovie({ where: { title: movieData.title } });
    if (movieExist) throw new ConflictException('Movie with this title already exist');

    const newMovie: MovieDto = await this.movieRepository.createMovie(movieData);
    return newMovie;
  }

  public static async getMovies(reqQuery: Record<string, any>): Promise<IGetMovie> {
    return this.movieRepository.getMovies(reqQuery);
  }
}
