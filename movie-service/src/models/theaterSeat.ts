import { Table, Model, Column, DataType, ForeignKey } from 'sequelize-typescript';
import Theater from './theater';
import Seat from './seat';

@Table({ tableName: 'theaterSeats' })
export default class TheaterSeat extends Model {
  @ForeignKey(() => Theater)
  @Column(DataType.UUID)
  theaterId: string;

  @ForeignKey(() => Seat)
  @Column(DataType.UUID)
  seatId: string;
}
