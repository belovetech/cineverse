import { BadRequestException } from "packages";
import { CustomerDto } from "@dtos/customers.dto";

export default function filterCustomerData(data: CustomerDto) {
  const { firstName, lastName, email, password } = data;
  const message = "Kindly use appropriate route to update your email or password";
  if (email || password) throw new BadRequestException(message);
  return { firstName, lastName };
}
