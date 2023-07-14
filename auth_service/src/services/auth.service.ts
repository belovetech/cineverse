// import bcrypt from 'bcrypt';
import Customer from '@models/customers.model';
import { ConflictException } from '@exceptions';
import { CustomerDataValidator } from '@validators/customerPayloadValidator';
import { IPayload } from '@interfaces/customers.interface';

export default class AuthService {
  public static async signup(payload: IPayload) {
    const validator: CustomerDataValidator<IPayload> = new CustomerDataValidator<IPayload>(payload);
    validator.validate();
    const customerExist = await Customer.findOne({ email: payload.email }).exec();
    if (customerExist) throw new ConflictException();
    // const hashPassword: string = await bcrypt.hash(payload.password, 12);
    const customer = await Customer.create({ ...payload });
    return customer;
  }
}
