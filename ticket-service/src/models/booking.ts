import { v4 as uuidv4 } from 'uuid';
import {
  BeforeCreate,
  Column,
  UpdatedAt,
  DataType,
  Table,
  Model,
  CreatedAt,
} from 'sequelize-typescript';

@Table
export class Booking extends Model<Booking> {
  @Column({ primaryKey: true, type: DataType.UUID })
  bookingId!: string;

  @Column({ type: DataType.UUID })
  customerId!: string;

  @Column({ type: DataType.UUID })
  movieId!: string;

  @Column({ type: DataType.UUID })
  showtimeId!: string;

  @Column({ type: DataType.STRING })
  seatNumber!: string;

  @Column({ type: DataType.DATE })
  bookingDate!: Date;

  @Column({ type: DataType.STRING })
  bookingStatus!: string;

  @Column({ type: DataType.DECIMAL(10, 2) })
  totalAmount!: number;

  @Column({ type: DataType.UUID })
  paymentId!: string;

  @Column({ type: DataType.STRING })
  ticketId!: string;

  @CreatedAt
  @Column({ type: DataType.STRING })
  createdAt!: Date;

  @UpdatedAt
  @Column({ type: DataType.STRING })
  updatedAt!: Date;

  @BeforeCreate
  static addUUID(instance: Booking) {
    instance.bookingId = uuidv4().replace(/-/g, '');
  }
}
