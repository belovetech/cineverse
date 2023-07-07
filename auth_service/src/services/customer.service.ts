import bcrypt from 'bcrypt';
import Customer from '@/models/customers.model';
import { CustomerDto } from '@/dtos/customers.dto';
import { ICustomer } from '@/interfaces/customers.interface';
import { validateCustomerInput } from '@/utils/validates';
import { Exception, NotFoundError } from '@/exceptions/exceptions';

export class CustomerService {
  public async createCustomer(data: CustomerDto): Promise<ICustomer> {
    validateCustomerInput(data);

    const customerExist = await this.findCustomer(data.email);
    if (customerExist) throw new Exception(409, 'Customer already exists!');

    const hashPassword: string = bcrypt.hash(data.email, 12);
    data.password = hashPassword;
    const customer = await Customer.create(data);

    return customer;
  }

  public async findCustomer(email: string): Promise<ICustomer> {
    const customerExist = await Customer.findOne({ email });
    if (!customerExist) throw new NotFoundError(404, 'Customer not found');
    return customerExist;
  }

  public async findCustomerById(customerId: string): Promise<ICustomer> {
    const customerExist = await Customer.findById(customerId);
    if (!customerExist) throw new NotFoundError(404, 'Customer not found');
    return customerExist;
  }

  public async findAllCustomers(): Promise<ICustomer[]> {
    const customers = Customer.find();
    return customers;
  }

  public async updateCustomer(customerId: string, data: object): Promise<ICustomer> {
    const customerExist = await this.findCustomerById(customerId);
    if (!customerExist) throw new NotFoundError(404, 'Customer not found');
    const updatedCustomer = await Customer.findByIdAndUpdate(customerId, data);
    return updatedCustomer;
  }

  public async deleteCustomer(customerId: string): Promise<boolean> {
    const customerExist = await this.findCustomerById(customerId);
    if (!customerExist) throw new NotFoundError(404, 'Customer not found');
    await Customer.deleteOne({ customerId });
    return true;
  }
}
