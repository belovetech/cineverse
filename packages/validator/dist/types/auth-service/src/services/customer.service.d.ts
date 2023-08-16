import { ICustomer } from "@interfaces/customers.interface";
import { CustomerDto } from "@dtos/customers.dto";
export default class CustomerService {
    static createCustomer(data: CustomerDto): Promise<ICustomer>;
    static findCustomerById(customerId: string): Promise<ICustomer>;
    static findAllCustomers(): Promise<ICustomer[]>;
    static updateCustomer(customerId: string, data: CustomerDto): Promise<ICustomer>;
    static deleteCustomer(customerId: string): Promise<boolean>;
}
