import { v4 as uuidv4 } from 'uuid';
import {
  Table,
  Model,
  Column,
  CreatedAt,
  UpdatedAt,
  BeforeCreate,
  PrimaryKey,
} from 'sequelize-typescript';

@Table
export class Payment extends Model<Payment> {
  @Column
  @PrimaryKey
  paymentId!: string;

  @Column
  bookingId!: string;

  @Column
  amount!: number;

  @Column
  status!: string;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;

  @BeforeCreate
  static addUUID(instance: Payment) {
    instance.paymentId = uuidv4().replace(/-/g, '');
  }
}
