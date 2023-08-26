import { FindOptions } from 'sequelize';
import { Metadata } from '@interfaces/pagination.interface';
import { SeatDto } from '@dtos/seat.dto';
import ApiFeaturesHandler from '@utils/api.features';
import Seat from '@models/seat';

export default class SeatRepository {
  public async create(data: SeatDto): Promise<Seat> {
    return await Seat.create(data);
  }

  public async findByPk(seatId: string, options?: FindOptions): Promise<Seat | null> {
    return await Seat.findByPk(seatId, options);
  }

  public async findOne(options: FindOptions): Promise<Seat | null> {
    return await Seat.findOne(options);
  }

  public async findAll(reqQuery: Record<string, string>): Promise<{ seats: Seat[]; metadata: Metadata }> {
    const query = new ApiFeaturesHandler(reqQuery);
    const [offset, limit] = query.paginate();

    const { count, rows } = await Seat.findAndCountAll({
      where: query.filter(),
      attributes: query.getFieldsQuery(),
      order: query.sort(),
      offset: offset,
      limit: limit,
    });

    const metadata = query.getMetadata({ total: count, itemPerPage: rows.length });
    return { seats: rows, metadata };
  }

  public async update(seatId: string, options: Partial<Seat>): Promise<Seat> {
    await Seat.update({ ...options }, { where: { seatId } });
    return await this.findByPk(seatId);
  }

  public async delete(seatId: string): Promise<Seat | number> {
    return await Seat.destroy({ where: { seatId } });
  }
}
