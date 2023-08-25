import { FindOptions } from 'sequelize';
import ApiFeaturesHandler from '@utils/api.features';
import ShowTime from '@models/showtime';

export default class ShowtimeRepository {
  public async create(data: ShowTime): Promise<ShowTime> {
    return await ShowTime.create(data);
  }

  public async findByPk(movieId: string, options?: FindOptions): Promise<ShowTime | null> {
    return await ShowTime.findByPk(movieId, options);
  }

  public async findOne(options: FindOptions): Promise<ShowTime | null> {
    return await ShowTime.findOne(options);
  }

  public async findAll(reqQuery: Record<string, string>): Promise<{ showtimes: ShowTime[]; metadata: object }> {
    const query = new ApiFeaturesHandler(reqQuery);
    const [offset, limit] = query.paginate();

    const rows = await ShowTime.findAll({
      where: query.filter(),
      attributes: query.getFieldsQuery(),
      order: query.sort(),
      offset: offset,
      limit: limit,
    });

    const metadata = query.getMetadata({ total: rows.length, itemPerPage: rows.length });
    return { showtimes: rows, metadata };
  }

  public async updateMovie(movieId: string, options: Partial<ShowTime>): Promise<ShowTime> {
    await ShowTime.update({ ...options }, { where: { movieId } });
    return await this.findByPk(movieId);
  }

  public async delete(movieId: string): Promise<ShowTime | number> {
    return await ShowTime.destroy({ where: { movieId: movieId } });
  }
}
