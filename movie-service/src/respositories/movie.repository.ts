import { FindOptions } from 'sequelize';
import { MovieDto } from '@dtos/movie.dto';
import { IGetMovie } from '@interfaces/movie.interface';
import ApiFeaturesHandler from '@utils/api.features';
import Movie from '@models/movies';

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

  public async getMovies(reqQuery: Record<string, unknown>): Promise<IGetMovie> {
    const query = new ApiFeaturesHandler(reqQuery as Record<string, string>);
    const [offset, limit] = query.paginate();

    const rows = await Movie.findAll({
      where: query.filter(),
      attributes: query.getFieldsQuery(),
      order: query.sort(),
      offset: offset,
      limit: limit,
    });

    const metadata = query.getMetadata({ total: rows.length, itemPerPage: rows.length });
    return { movies: rows, metadata };
  }

  public async updateMovie(movieId: string, options: Partial<Movie>): Promise<Movie> {
    await Movie.update({ ...options }, { where: { movieId } });
    return await this.getMovieById(movieId);
  }

  public async deleteMovie(movieId: string): Promise<Movie | number> {
    return await Movie.destroy({ where: { movieId: movieId } });
  }
}
