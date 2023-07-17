import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Customer from '@models/customers.model';
import redisClient from '@datasource/redis';
import config from '@config';
import { AuthenticationException, BadRequestException, ConflictException, NotFoundException } from '@exceptions';
import { CustomerDataValidator } from '@validators/customerPayloadValidator';
import { ICustomer } from '@interfaces/customers.interface';
import { LoginDto, TokenDto, VerifyOtpDto } from '@dtos/auth.dto';
import { CustomerDto } from '@dtos/customers.dto';

export default class AuthService {
  public static async signup(payload: CustomerDto): Promise<ICustomer> {
    const validator: CustomerDataValidator<CustomerDto> = new CustomerDataValidator<CustomerDto>(payload);
    validator.validate();
    const customerExist = await Customer.findOne({ email: payload.email }).exec();
    if (customerExist) throw new ConflictException();
    const customer = await Customer.create({ ...payload });

    const otp = this.generateOTP();
    const hashedOtp = await bcrypt.hash(JSON.stringify(otp), 2);
    const key = `x-otp_${customer.email}`;
    await redisClient.del(key);
    redisClient.set(key, hashedOtp, 60 * 10); // 10mins
    // send otp to the customer's email
    console.log(otp);
    return customer;
  }

  public static async signin(payload: LoginDto): Promise<ICustomer> {
    const customer: ICustomer = await Customer.findOne({ email: payload.email }).select('+password');
    if (!customer) throw new NotFoundException();
    if (!customer.isVerified) throw new BadRequestException('Verify your account before signing in.');
    const isCorrectPassword = await bcrypt.compare(payload.password, customer.password);
    if (!isCorrectPassword) throw new AuthenticationException();

    const token = await this.generateToken(customer);
    const key = `x-token_${customer.customerId}`;
    await redisClient.del(key);
    await redisClient.set(key, token, 60 * 60); // 1hr
    // customer.token = token;
    customer.token = this.setCookies(token);
    return customer;
  }

  public static async verifyOtp(payload: VerifyOtpDto): Promise<ICustomer> {
    if (!payload?.otp || !payload?.email) throw new BadRequestException('Invalid OTP credentials');
    const customer = await Customer.findOne({ email: payload.email }).exec();
    if (!customer) throw new NotFoundException('Provided email was not found');
    if (customer.isVerified) throw new ConflictException('You are already being verified');

    const storedOtp = await redisClient.get(`x-otp_${payload.email}`);
    if (!storedOtp) throw new AuthenticationException('OTP token has expired');
    const validOtp = await bcrypt.compare(payload.otp, storedOtp);
    if (!validOtp) throw new AuthenticationException('Invalid OTP token');
    await redisClient.del(`x-otp_${payload.email}`);

    customer.isVerified = true;
    customer.save();
    return customer;
  }

  private static generateOTP(): number {
    const min = 100000;
    const max = 999999;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  private static async generateToken(payload: CustomerDto): Promise<string> {
    const payloadStoredInToken: TokenDto = { customerId: payload.customerId };
    const token = await jwt.sign(payloadStoredInToken, config.secret, { expiresIn: '1h' });
    return token;
  }

  private static setCookies(token: string): string {
    return `Authorization=${token}, httpOnly:${true};  x-cookies=${token}`;
  }
}
