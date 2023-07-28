import Movie from '@models/movies';
import { FindOptions } from 'sequelize';
import { MovieDto } from '@dtos/movie.dto';

export default class MovieRepository {
  public async createMovie(movieData: MovieDto): Promise<MovieDto> {
    return await Movie.create(movieData);
  }

  public async getMovieById(movieId: string, options?: FindOptions): Promise<Movie | null> {
    return await Movie.findByPk(movieId, options);
  }

  public async getMovie(options: FindOptions): Promise<Movie | null> {
    return await Movie.findOne(options);
  }

  public async getMovies(options?: FindOptions): Promise<Movie[]> {
    return await Movie.findAll(options);
  }

  public async updateMovie(movieId: string, options: Partial<Movie>): Promise<Movie> {
    await Movie.update({ ...options }, { where: { movieId } });
    return await this.getMovieById(movieId);
  }

  public async deleteMovie(movieId: string): Promise<Movie | number> {
    return await Movie.destroy({ where: { movieId: movieId } });
  }
}
