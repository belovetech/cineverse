import { v4 as uuidv4 } from 'uuid';
import { Model, Table, Column, Default, DataType, HasMany, BelongsToMany } from 'sequelize-typescript';
import Seat from './seat';
import ShowTime from './showtime';
import TheaterSeat from './theaterSeat';

@Table({ tableName: 'theaters' })
export default class Theater extends Model<Theater> {
  @Default(() => uuidv4().replace(/-/g, ''))
  @Column({ primaryKey: true, type: DataType.UUID })
  theaterId: string;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  location: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  seatingCapacity: number;

  @HasMany(() => ShowTime)
  showTimes: ShowTime[];

  @BelongsToMany(() => Seat, () => TheaterSeat)
  seats: Seat[];
}
