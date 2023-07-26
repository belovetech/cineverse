import { v4 as uuidv4 } from 'uuid';
import { Model, Table, Column, Default, DefaultScope, DataType, BeforeCreate, HasMany } from 'sequelize-typescript';
import ShowTime from './showtime';

@DefaultScope(() => ({
  attributes: ['movieId', 'title', 'genre', 'description', 'duration'],
}))
@Table
export default class Movie extends Model<Movie> {
  @Column({ primaryKey: true, type: DataType.UUID })
  @Default(() => uuidv4().replace(/-/g, ''))
  movieId: string;

  @Column({ type: DataType.STRING, allowNull: false, unique: true, validate: { len: [1, 255] } })
  title: string;

  @Column({ type: DataType.STRING, allowNull: false })
  genre: string;

  @Column({ type: DataType.TEXT })
  description: string;

  @Column({ type: DataType.INTEGER, defaultValue: 0, allowNull: false })
  duration: number;

  @Column({ type: DataType.STRING })
  photo: string;

  @BeforeCreate
  static setDefaultPhoto(instance: Movie) {
    instance.photo = 'default.jpg';
  }

  @HasMany(() => ShowTime)
  showTimes: ShowTime[];
}
