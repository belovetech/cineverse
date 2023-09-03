import { v4 as uuidv4 } from 'uuid';
import {
  Column,
  Table,
  Model,
  CreatedAt,
  DeletedAt,
  PrimaryKey,
  BeforeCreate,
} from 'sequelize-typescript';

@Table
export class Ticket extends Model<Ticket> {
  @Column
  @PrimaryKey
  ticketId!: string;

  @Column
  customerId!: string;

  @Column
  bookingId!: string;

  @Column
  movieId!: string;

  @Column
  showtimeId!: string;

  @Column
  seatNumber!: string;

  @Column
  QRCode!: string;

  @Column
  ticketType!: string;

  @Column
  price!: string;

  @CreatedAt
  @Column
  createdAt!: Date;

  @DeletedAt
  @Column
  deletedAt!: Date;

  @BeforeCreate
  static addUUID(instance: Ticket) {
    instance.ticketId = uuidv4().replace(/-/g, '');
  }
}
