import { ConflictException, NotFoundException } from '@cineverse/exceptions';
import { MovieDto } from '@dtos/movie.dto';
import { MovieDataValidator } from '@validators/movieDataValidator';
import { movieRepository } from '@respositories';
import { Metadata } from '@interfaces/pagination.interface';
import Movie from '@models/movies';

export default class MovieService {
  public async createMovie(movieData: MovieDto): Promise<Movie> {
    new MovieDataValidator<MovieDto>(movieData).validate();

    const movieExist = await movieRepository.findOne({ where: { title: movieData.title } });
    if (movieExist) throw new ConflictException('Movie with this title already exist');

    const newMovie = await movieRepository.create(movieData);
    return newMovie;
  }

  public async getMovies(reqQuery: Record<string, unknown>): Promise<{ movies: Movie[]; metadata: Metadata }> {
    return await movieRepository.findAll(reqQuery as Record<string, string>);
  }

  public async getMovie(movieId: string): Promise<Movie | null> {
    let movie: Movie | null = null;
    try {
      movie = await movieRepository.findByPk(movieId, {
        include: [Movie.associations.showTimes],
        rejectOnEmpty: true,
      });
    } catch (error) {
      throw new NotFoundException('Movie not found');
    }
    return movie;
  }
}
