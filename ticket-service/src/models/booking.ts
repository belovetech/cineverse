import { v4 as uuidv4 } from 'uuid';
import {
  Column,
  Table,
  Model,
  CreatedAt,
  UpdatedAt,
  BeforeCreate,
  PrimaryKey,
} from 'sequelize-typescript';

@Table
export class Booking extends Model<Booking> {
  @Column
  @PrimaryKey
  bookingId!: string;

  @Column
  customerId!: string;

  @Column
  movieId!: string;

  @Column
  showtimeId!: string;

  @Column
  seatNumber!: string;

  @Column
  bookingDate!: Date;

  @Column
  bookingStatus!: string;

  @Column
  totalAmount!: number;

  @Column
  paymentId!: string;

  @Column
  ticketId!: string;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;

  @BeforeCreate
  static addUUID(instance: Booking) {
    instance.bookingId = uuidv4().replace(/-/g, '');
  }
}
