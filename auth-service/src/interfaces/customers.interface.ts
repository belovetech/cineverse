import { Document } from "mongoose";

export interface ICustomer {
  customerId: string;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  passwordConfirm?: string;
  isVerified?: boolean;
  // token?: string;
}

export interface CustomerModel extends Document {
  customerId: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirm: string;
  isVerified?: boolean;
}
