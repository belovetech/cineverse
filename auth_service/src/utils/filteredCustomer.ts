import { CustomerDto } from '@/dtos/customers.dto';

export function filteredCustomer(data: CustomerDto) {
  const { firstName, lastName } = data;
  return { firstName, lastName };
}
