import bcrypt from 'bcrypt';
import Customer from '@models/customers.model';
import CustomerDto from '@dtos/customers.dto';
import filteredCustomer from '@utils/filteredCustomer';
import { ICustomer } from '@interfaces/customers.interface';
import { NotFoundException, BadRequestException } from '@exceptions';
import { validateCustomerInput } from '@utils/validates';

export default class CustomerService {
  public static async createCustomer(data: CustomerDto): Promise<ICustomer> {
    validateCustomerInput(data);
    const customerExist = await Customer.findOne({ email: data.email }).exec();
    if (customerExist) throw new BadRequestException(409, 'Customer already exists!');
    const hashPassword: string = await bcrypt.hash(data.email, 12);
    const customer = await Customer.create({ ...data, password: hashPassword });
    return customer;
  }

  public static async findCustomerById(customerId: string): Promise<ICustomer> {
    const customerExist = await Customer.findById(customerId).exec();
    if (!customerExist) throw new NotFoundException(404, 'Customer not found');
    return customerExist;
  }

  public static async findAllCustomers(): Promise<ICustomer[]> {
    const customers = Customer.find().exec();
    return customers;
  }

  public static async updateCustomer(customerId: string, data: CustomerDto): Promise<ICustomer> {
    const filteredData = filteredCustomer(data);
    const customerExist = await this.findCustomerById(customerId);
    if (!customerExist) throw new NotFoundException(404, 'Customer not found');
    const updatedCustomer = await Customer.findByIdAndUpdate(customerId, filteredData).exec();
    updatedCustomer.save();
    return updatedCustomer;
  }

  public static async deleteCustomer(customerId: string): Promise<boolean> {
    const customerExist = await this.findCustomerById(customerId);
    if (!customerExist) throw new NotFoundException(404, 'Customer not found');
    await Customer.findByIdAndDelete(customerId);
    return true;
  }
}
