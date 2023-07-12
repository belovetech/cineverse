import 'dotenv/config';
import { BadRequestException } from '@exceptions';
import { ICustomer } from '@interfaces/customers.interface';

export default function filterCustomerData(data: ICustomer) {
  const { firstName, lastName, email, password } = data;
  const message = 'Kindly use appropriate route to update your email or password';
  if (email || password) throw new BadRequestException(message);
  return { firstName, lastName };
}
