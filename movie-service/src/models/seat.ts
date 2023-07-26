import { v4 as uuidv4 } from 'uuid';
import { Table, Model, Column, Default, DataType, BelongsToMany } from 'sequelize-typescript';
import Theater from './theater';
import TheaterSeat from './theaterSeat';

const AVAILABLESTATUS = ['available', 'booked', 'cancelled'];

@Table
export default class Seat extends Model<Seat> {
  @Column({ primaryKey: true, type: DataType.UUID })
  @Default(() => uuidv4().replace(/-/g, ''))
  seatId: string;

  @Column({ type: DataType.INTEGER })
  seatNumber: number;

  @Column(DataType.ENUM({ values: AVAILABLESTATUS }))
  availableStatus: string;

  @BelongsToMany(() => Theater, () => TheaterSeat)
  theaters: Theater[];
}
