import Movie from '@models/movies';
import { FindOptions } from 'sequelize';

export class MovieRepository {
  public async createMovie(movieData: Partial<Movie>): Promise<Movie> {
    return await Movie.create(movieData);
  }

  public async getMovie(movieId: string, options?: FindOptions): Promise<Movie | null> {
    return await Movie.findByPk(movieId, options);
  }

  public async getMovies(options?: FindOptions): Promise<Movie[]> {
    return await Movie.findAll(options);
  }

  public async updateMovie(movieId: string, options: Partial<Movie>): Promise<Movie> {
    await Movie.update({ ...options }, { where: { movieId } });
    return await this.getMovie(movieId);
  }

  public async deleteMovie(movieId: string): Promise<Movie | number> {
    return await Movie.destroy({ where: { movieId: movieId } });
  }
}
