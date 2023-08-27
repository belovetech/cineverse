import "dotenv/config";
import { CustomerDto } from "@dtos/customers.dto";
export default function filterCustomerData(data: CustomerDto): {
    firstName: string;
    lastName: string;
};
