import { Table, Model, Column, DataType, ForeignKey } from 'sequelize-typescript';
import Theater from './theater';
import Seat from './seat';

@Table
export default class TheaterSeat extends Model {
  @ForeignKey(() => Theater)
  @Column({ type: DataType.UUID })
  theaterId: string;

  @ForeignKey(() => Seat)
  @Column({ type: DataType.UUID })
  seatId: string;
}
