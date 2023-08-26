import { FindOptions } from 'sequelize';
import { Metadata } from '@interfaces/pagination.interface';
import { TheaterDto } from '@dtos/theater.dto';
import ApiFeaturesHandler from '@utils/api.features';
import Theater from '@models/theater';

export default class TheaterRepository {
  public async create(theaterData: TheaterDto): Promise<Theater> {
    return await Theater.create(theaterData);
  }

  public async findByPk(theaterId: string, options?: unknown): Promise<Theater | null> {
    return await Theater.findByPk(theaterId, options);
  }

  public async findOne(options: FindOptions): Promise<Theater | null> {
    return await Theater.findOne(options);
  }

  public async findAll(reqQuery: Record<string, string>): Promise<{ theaters: Theater[]; metadata: Metadata }> {
    const query = new ApiFeaturesHandler(reqQuery);

    const [offset, limit] = query.paginate();
    const { count, rows } = await Theater.findAndCountAll({
      where: query.filter(),
      attributes: query.getFieldsQuery(),
      order: query.sort(),
      offset: offset,
      limit: limit,
    });

    const metadata = query.getMetadata({ total: count, itemPerPage: rows.length });
    return { theaters: rows, metadata };
  }

  public async update(theaterId: string, options: Partial<Theater>): Promise<Theater> {
    await Theater.update({ ...options }, { where: { theaterId } });
    return await this.findByPk(theaterId);
  }

  public async delete(theaterId: string, options?: Partial<Theater>): Promise<number> {
    if (options) return await Theater.destroy({ where: { ...options } });
    return await Theater.destroy({ where: { theaterId } });
  }
}
