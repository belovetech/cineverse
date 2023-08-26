import { FindOptions } from 'sequelize';
import { MovieDto } from '@dtos/movie.dto';
import { Metadata } from '@interfaces/pagination.interface';
import ApiFeaturesHandler from '@utils/api.features';
import Movie from '@models/movies';

export default class MovieRepository {
  public async create(movieData: MovieDto): Promise<Movie> {
    return await Movie.create(movieData);
  }

  public async findByPk(movieId: string, options?: unknown): Promise<Movie | null> {
    return await Movie.findByPk(movieId, options);
  }

  public async findOne(options: FindOptions): Promise<Movie | null> {
    return await Movie.findOne(options);
  }

  public async findAll(reqQuery: Record<string, string>): Promise<{ movies: Movie[]; metadata: Metadata }> {
    const query = new ApiFeaturesHandler(reqQuery);
    const [offset, limit] = query.paginate();

    const { count, rows } = await Movie.findAndCountAll({
      where: query.filter(),
      attributes: query.getFieldsQuery(),
      order: query.sort(),
      offset: offset,
      limit: limit,
    });

    const metadata = query.getMetadata({ total: count, itemPerPage: rows.length });
    return { movies: rows, metadata };
  }

  public async update(movieId: string, options: Partial<Movie>): Promise<Movie> {
    await Movie.update({ ...options }, { where: { movieId } });
    return await this.findByPk(movieId);
  }

  public async delete(movieId: string): Promise<Movie | number> {
    return await Movie.destroy({ where: { movieId: movieId } });
  }

  public async findMovieWithAssociates(movieId: string): Promise<Movie | null> {
    let movie: Movie | null = null;
    try {
      movie = await Movie.findByPk(movieId, {
        include: [Movie.associations.showTimes],
        rejectOnEmpty: true,
      });
    } catch (error) {
      if (error.name === 'SequelizeEmptyResultError') {
        movie = await Movie.findByPk(movieId);
      } else {
        return null;
      }
    }
    return movie;
  }
}
