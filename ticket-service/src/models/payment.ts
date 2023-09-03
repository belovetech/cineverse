import { v4 as uuidv4 } from 'uuid';
import {
  Table,
  Model,
  Column,
  CreatedAt,
  DataType,
  UpdatedAt,
  BeforeCreate,
} from 'sequelize-typescript';

@Table
export class Payment extends Model<Payment> {
  @Column({ primaryKey: true, type: DataType.UUID })
  paymentId!: string;

  @Column({ type: DataType.STRING })
  bookingId!: string;

  @Column({ type: DataType.DECIMAL(10, 2) })
  amount!: number;

  @Column({ type: DataType.STRING })
  status!: string;

  @CreatedAt
  @Column({ type: DataType.DATE })
  createdAt!: Date;

  @UpdatedAt
  @Column({ type: DataType.DATE })
  updatedAt!: Date;

  @BeforeCreate
  static addUUID(instance: Payment) {
    instance.paymentId = uuidv4().replace(/-/g, '');
  }
}
