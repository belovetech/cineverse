import { v4 as uuidv4 } from 'uuid';
import { ForeignKey, Table, Model, Column, Default, DataType } from 'sequelize-typescript';
import Theater from './theater';

const AVAILABLESTATUS = ['available', 'booked', 'cancelled'];

@Table({ tableName: 'seats' })
export default class Seat extends Model<Seat> {
  @Default(() => uuidv4().replace(/-/g, ''))
  @Column({ primaryKey: true, type: DataType.UUID })
  seatId: string;

  @Column({ type: DataType.INTEGER })
  seatNumber: number;

  @Column({ type: DataType.CHAR(1) })
  rowNumber: string;

  @Column(DataType.ENUM({ values: AVAILABLESTATUS }))
  availableStatus: string;

  @ForeignKey(() => Theater)
  @Column({ type: DataType.UUID })
  theaterId: string;
}
