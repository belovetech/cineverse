import { FindOptions } from 'sequelize';
import ApiFeaturesHandler from '@utils/api.features';
import { ShowTimeDto } from '@dtos/showtime.dto';
import ShowTime from '@models/showtime';

export default class ShowtimeRepository {
  public async create(data: ShowTimeDto): Promise<ShowTimeDto> {
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

    const { count, rows } = await ShowTime.findAndCountAll({
      where: query.filter(),
      attributes: query.getFieldsQuery(),
      order: query.sort(),
      offset: offset,
      limit: limit,
    });

    const metadata = query.getMetadata({ total: count, itemPerPage: rows.length });
    return { showtimes: rows, metadata };
  }

  public async update(movieId: string, options: Partial<ShowTime>): Promise<ShowTime> {
    await ShowTime.update({ ...options }, { where: { movieId } });
    return await this.findByPk(movieId);
  }

  public async delete(movieId: string): Promise<ShowTime | number> {
    return await ShowTime.destroy({ where: { movieId: movieId } });
  }
}
