import { Document } from 'mongoose';

export interface ICustomer extends Document {
  customerId: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirm: string;
  isVerified?: boolean;
}

export interface IPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirm: string;
}
