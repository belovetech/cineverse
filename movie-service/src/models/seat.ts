import { v4 as uuidv4 } from 'uuid';
import { Table, Model, Column, Default, DataType, BelongsToMany, PrimaryKey } from 'sequelize-typescript';
import Theater from './theater';
import TheaterSeat from './theaterSeat';

const AVAILABLESTATUS = ['available', 'booked', 'cancelled'];

@Table({ tableName: 'seats' })
export default class Seat extends Model<Seat> {
  @PrimaryKey
  @Default(() => uuidv4().replace(/-/g, ''))
  @Column(DataType.UUID)
  seatId: string;

  @Column({ type: DataType.INTEGER })
  seatNumber: number;

  @Column(DataType.ENUM({ values: AVAILABLESTATUS }))
  availableStatus: string;

  @BelongsToMany(() => Theater, () => TheaterSeat)
  theaters: Theater[];
}
