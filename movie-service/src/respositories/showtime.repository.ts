import { FindOptions } from 'sequelize';
import { Metadata } from '@interfaces/pagination.interface';
import { ShowTimeDto } from '@dtos/showtime.dto';
import ApiFeaturesHandler from '@utils/api.features';
import ShowTime from '@models/showtime';

export default class ShowtimeRepository {
  public async create(data: ShowTimeDto): Promise<ShowTime> {
    return await ShowTime.create(data);
  }

  public async findByPk(showtimeId: string, options?: FindOptions): Promise<ShowTime | null> {
    return await ShowTime.findByPk(showtimeId, options);
  }

  public async findOne(options: FindOptions): Promise<ShowTime | null> {
    return await ShowTime.findOne(options);
  }

  public async findAll(reqQuery: Record<string, string>): Promise<{ showtimes: ShowTime[]; metadata: Metadata }> {
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

  public async update(showTimeId: string, options: Partial<ShowTime>): Promise<ShowTime> {
    await ShowTime.update({ ...options }, { where: { showTimeId } });
    return await this.findByPk(showTimeId);
  }

  public async delete(showTimeId: string): Promise<ShowTime | number> {
    return await ShowTime.destroy({ where: { showTimeId } });
  }
}
