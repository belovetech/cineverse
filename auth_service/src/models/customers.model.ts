import { Schema, model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { ICustomer } from '@/interfaces/customers.interface';

const customerSchema: Schema<ICustomer> = new Schema<ICustomer>(
  {
    customerId: {
      type: String,
      default: () => uuidv4().replace(/-/g, ''),
      unique: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    passwordConfirm: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      required: true,
    },
  },
  {
    _id: false,
    id: false,
    timestamps: true,
    versionKey: false,
    collection: 'customers',
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    // alias: { _id: 'customerId' },
  },
);

const Customer = model<ICustomer>('Customer', customerSchema);
export default Customer;
