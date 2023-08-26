import { v4 as uuidv4 } from 'uuid';
import { Model, Table, Column, Default, DefaultScope, DataType, BeforeCreate, HasMany } from 'sequelize-typescript';
import ShowTime from './showtime';

@DefaultScope(() => ({
  attributes: { exclude: ['createdAt', 'updatedAt'] },
}))
@Table({ tableName: 'movies' })
export default class Movie extends Model<Movie> {
  @Default(() => uuidv4().replace(/-/g, ''))
  @Column({ primaryKey: true, type: DataType.UUID })
  movieId: string;

  @Column({ type: DataType.STRING, allowNull: false, unique: true, validate: { len: [1, 255] } })
  title: string;

  @Column({ type: DataType.STRING, allowNull: false })
  genre: string;

  @Column({ type: DataType.TEXT })
  description: string;

  @Column({ type: DataType.STRING, defaultValue: 0, allowNull: false })
  duration: string;

  @Column({ type: DataType.STRING })
  photo: string;

  @HasMany(() => ShowTime)
  showTimes: ShowTime[];

  @BeforeCreate
  static setDefaultPhoto(instance: Movie) {
    instance.photo = 'default.jpg';
  }
}
