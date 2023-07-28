import MovieRepository from '@respositories/movie.repository';
import { conflictException } from '@cineverse/exceptions';
import { MovieDto } from '@dtos/movie.dto';

export default class MovieService {
  private static movieRepository = new MovieRepository();

  public static async createMovie(movieData: MovieDto): Promise<MovieDto> {
    const movieExist = await this.movieRepository.getMovie({ where: { title: movieData.title } });
    if (movieExist) throw new conflictException('Movie with the title already exist');
    const newMovie: MovieDto = await this.movieRepository.createMovie(movieData);
    return newMovie;
  }
}
