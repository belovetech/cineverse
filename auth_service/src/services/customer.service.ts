import bcrypt from 'bcrypt';
import Customer from '@models/customers.model';
import CustomerDto from '@dtos/customers.dto';
import filteredCustomerData from '@utils/filterCustomerData';
import { ICustomer } from '@interfaces/customers.interface';
import { NotFoundException, ConflictException } from '@exceptions';
import { validateCustomerInput } from '@utils/validateCustomerInput';

export default class CustomerService {
  public static async createCustomer(data: CustomerDto): Promise<ICustomer> {
    validateCustomerInput(data);
    const customerExist = await Customer.findOne({ email: data.email }).exec();
    if (customerExist) throw new ConflictException();
    const hashPassword: string = await bcrypt.hash(data.email, 12);
    const customer = await Customer.create({ ...data, password: hashPassword });
    return customer;
  }

  public static async findCustomerById(customerId: string): Promise<ICustomer> {
    const customerExist = await Customer.findById(customerId).exec();
    if (!customerExist) throw new NotFoundException();
    return customerExist;
  }

  public static async findAllCustomers(): Promise<ICustomer[]> {
    const customers = Customer.find().exec();
    return customers;
  }

  public static async updateCustomer(customerId: string, data: CustomerDto): Promise<ICustomer> {
    const filteredData = filteredCustomerData(data);
    const customerExist = await this.findCustomerById(customerId);
    if (!customerExist) throw new NotFoundException();
    const updatedCustomer = await Customer.findByIdAndUpdate(customerId, filteredData).exec();
    updatedCustomer.save();
    return updatedCustomer;
  }

  public static async deleteCustomer(customerId: string): Promise<boolean> {
    const customerExist = await this.findCustomerById(customerId);
    if (!customerExist) throw new NotFoundException();
    await Customer.findByIdAndDelete(customerId);
    return true;
  }
}
