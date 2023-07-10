import 'dotenv/config';
import CustomerDto from '@dtos/customers.dto';
import { BadRequestException } from '@exceptions';

export default function filterCustomer(data: CustomerDto) {
  const { firstName, lastName, email } = data;
  const message = 'Kindly use appropriate route to update your password';
  if (email) throw new BadRequestException(400, message);
  return { firstName, lastName };
}
