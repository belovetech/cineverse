import { v4 as uuidv4 } from 'uuid';
import { Ticket } from './ticket';
import {
  BeforeCreate,
  Column,
  UpdatedAt,
  DataType,
  Table,
  Model,
  CreatedAt,
  HasMany,
  Default,
  PrimaryKey,
} from 'sequelize-typescript';

export enum BookingStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

@Table
export class Booking extends Model<Booking> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({ type: DataType.UUID, allowNull: false })
  bookingId: string;

  @Column({ type: DataType.STRING })
  customerId: string;

  @Column({ type: DataType.UUID })
  movieId: string;

  @Column({ type: DataType.UUID })
  showtimeId: string;

  @Column({
    type: DataType.ENUM({ values: Object.values(BookingStatus) }),
    defaultValue: BookingStatus.PENDING,
  })
  bookingStatus: string;

  @Column({ type: DataType.DECIMAL(10, 2) })
  totalAmount: number;

  @Column({ type: DataType.UUID })
  paymentId!: string;

  @CreatedAt
  @Column({ type: DataType.DATE, defaultValue: DataType.NOW })
  createdAt: Date;

  @UpdatedAt
  @Column({ type: DataType.DATE })
  updatedAt: Date;

  @HasMany(() => Ticket)
  tickets: Ticket[];

  @BeforeCreate
  static addUUID(instance: Booking) {
    instance.bookingId = uuidv4().replace(/-/g, '');
  }

  // @BeforeCreate
  // static addBookingStatus(instance: Booking) {
  //   instance.bookingStatus = BookingStatus.PENDING;
  // }
}
