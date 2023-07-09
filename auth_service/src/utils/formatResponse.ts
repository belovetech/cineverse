import { ICustomer } from '@interfaces/customers.interface';

export default function formatResponse(customer: ICustomer & { createAt?: string; updatedAt?: string }) {
  return {
    customerId: customer._id,
    firstName: customer.firstName,
    lastName: customer.lastName,
    email: customer.email,
    createdAt: customer.createAt,
    updatedAt: customer.updatedAt,
  };
}
