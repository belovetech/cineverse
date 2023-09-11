import { v4 as uuidv4 } from 'uuid';
import { ForeignKey, Table, Model, Column, Default, DataType, DefaultScope } from 'sequelize-typescript';
import Theater from './theater';

export const STATUSES = ['available', 'booked', 'cancelled'];
export const SEATTYPES = ['regular', 'standard', 'recliner'];

export enum Status {
  AVAILABLE = 'available',
  BOOKED = 'booked',
  CANCELLED = 'cancelled',
}

export enum SeatType {
  REGULAR = 'regular',
  STANDARD = 'standard',
  RECLINER = 'recliner',
}
// TODO: update seatType to standard, vip, premium

@DefaultScope(() => ({
  attributes: { exclude: ['createdAt', 'updatedAt'] },
  where: { status: ['available', 'cancelled'] },
}))
@Table({ tableName: 'seats' })
export default class Seat extends Model<Seat> {
  @Default(() => uuidv4().replace(/-/g, ''))
  @Column({ primaryKey: true, type: DataType.UUID })
  seatId: string;

  @Column({ type: DataType.STRING })
  seatNumber: string;

  @Column(DataType.ENUM({ values: SEATTYPES }))
  seatType: string;

  @Column(DataType.ENUM({ values: STATUSES }))
  status: string;

  @Column({ type: DataType.DECIMAL(10, 2) })
  price: number;

  @ForeignKey(() => Theater)
  @Column({ type: DataType.UUID })
  theaterId: string;
}

// regular -> 1000, standard -> 1500, recliner -> 2000
