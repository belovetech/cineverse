import bcrypt from 'bcrypt';
import Customer from '@models/customers.model';
import { AuthenticationException, ConflictException, NotFoundException } from '@exceptions';
import { CustomerDataValidator } from '@validators/customerPayloadValidator';
import { ICustomer, IPayload } from '@interfaces/customers.interface';
import redisClient from '@datasource/redis';

export default class AuthService {
  public static async signup(payload: IPayload): Promise<ICustomer> {
    const validator: CustomerDataValidator<IPayload> = new CustomerDataValidator<IPayload>(payload);
    validator.validate();
    const customerExist = await Customer.findOne({ email: payload.email }).exec();
    if (customerExist) throw new ConflictException();
    const customer = await Customer.create({ ...payload });

    const otp = this.generateOTP();
    const key = `otp_${customer.customerId}`;
    await redisClient.del(key);
    redisClient.set(key, otp, 60 * 10); // 10mins
    // send otp to the customer's email
    console.log(otp);
    return customer;
  }

  public static async signin(loginCredentials: { email: string; password: string }) {
    const customerExist = await Customer.findOne({ email: loginCredentials.email }).select('password').exec();
    if (!customerExist) throw new NotFoundException();
    const isCorrectPassword = await bcrypt.compare(loginCredentials.password, customerExist.password);
    if (!isCorrectPassword) throw new AuthenticationException();
    // generate auth token
    // store token in the redis server
  }

  private static generateOTP(): number {
    const min = 100000;
    const max = 999999;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
