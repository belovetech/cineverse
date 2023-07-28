import MovieRepository from '@respositories/movie.repository';
import { ConflictException } from '@cineverse/exceptions';
import { MovieDto } from '@dtos/movie.dto';
import { MovieDataValidator } from '@validators/movieDataValidator';

export default class MovieService {
  private static movieRepository = new MovieRepository();

  public static async createMovie(movieData: MovieDto): Promise<MovieDto> {
    new MovieDataValidator<MovieDto>(movieData).validate();
    const movieExist = await this.movieRepository.getMovie({ where: { title: movieData.title } });
    if (movieExist) throw new ConflictException('Movie with this title already exist');

    const newMovie: MovieDto = await this.movieRepository.createMovie(movieData);
    return newMovie;
  }
}
