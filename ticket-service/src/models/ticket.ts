import { v4 as uuidv4 } from 'uuid';
import {
  Column,
  Table,
  Model,
  DataType,
  CreatedAt,
  DeletedAt,
  BeforeCreate,
} from 'sequelize-typescript';

@Table
export class Ticket extends Model<Ticket> {
  @Column({ primaryKey: true, type: DataType.UUID })
  ticketId!: string;

  @Column({ type: DataType.STRING })
  customerId!: string;

  @Column({ type: DataType.STRING })
  bookingId!: string;

  @Column({ type: DataType.STRING })
  movieId!: string;

  @Column({ type: DataType.STRING })
  showtimeId!: string;

  @Column({ type: DataType.STRING })
  seatNumber!: string;

  @Column({ type: DataType.STRING })
  QRCode!: string;

  @Column({ type: DataType.STRING })
  ticketType!: string;

  @Column({ type: DataType.STRING })
  price!: string;

  @CreatedAt
  @Column({ type: DataType.DATE })
  createdAt!: Date;

  @DeletedAt
  @Column({ type: DataType.DATE })
  deletedAt!: Date;

  @BeforeCreate
  static addUUID(instance: Ticket) {
    instance.ticketId = uuidv4().replace(/-/g, '');
  }
}
