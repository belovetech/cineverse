import Customer from "@models/customers.model";
import filteredCustomerData from "@utils/filterCustomerData";
import { ICustomer } from "@interfaces/customers.interface";
import { CustomerDto } from "@dtos/customers.dto";
import { NotFoundException, ConflictException } from "@cineverse/libs";
import { CustomerDataValidator } from "@utils/validator";

export default class CustomerService {
  public static async createCustomer(data: CustomerDto): Promise<ICustomer> {
    const validator: CustomerDataValidator<CustomerDto> = new CustomerDataValidator<CustomerDto>(data);
    validator.validate();
    const customerExist = await Customer.findOne({ email: data.email }).exec();
    if (customerExist) throw new ConflictException();
    const customer = await Customer.create({ ...data });
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
    const updatedCustomer = await Customer.findByIdAndUpdate(customerId, filteredData, { new: true }).exec();
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
