import {
  Column,
  Table,
  Model,
  DataType,
  CreatedAt,
  ForeignKey,
  Default,
  PrimaryKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Booking } from './booking';

export enum TicketType {
  ADULT = 'ADULT',
  CHILD = 'CHILD',
  SENIOR = 'SENIOR',
}

@Table
export class Ticket extends Model<Ticket> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({ type: DataType.UUID, allowNull: false })
  ticketId!: string;

  @ForeignKey(() => Booking)
  @Column({ type: DataType.UUID })
  bookingId: string;

  @BelongsTo(() => Booking)
  booking: Booking;

  @Column({ type: DataType.STRING })
  seatNumber!: string;

  @Column({ type: DataType.TEXT })
  QRCode!: string;

  @Column({
    defaultValue: TicketType.ADULT,
    type: DataType.ENUM(...Object.values(TicketType)),
  })
  ticketType!: string;

  @Column({ type: DataType.DECIMAL(10, 2) })
  price!: number;

  @CreatedAt
  @Column({ type: DataType.DATE, defaultValue: DataType.NOW })
  createdAt!: Date;
}
