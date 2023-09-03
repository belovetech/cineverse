import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Customer from "@models/customers.model";
import redisClient from "@datasource/redis";
import config from "@config";
import { AuthenticationException, BadRequestException, ConflictException, NotFoundException } from "@cineverse/libs";
import { CustomerDataValidator, SignValidator } from "@utils/validator";
import { ICustomer } from "@interfaces";
import { SignupDto, SignDto, TokenDto, VerifyOtpDto, CustomerDto } from "@dtos";

export default class AuthService {
  public static async signup(payload: SignupDto): Promise<ICustomer> {
    new CustomerDataValidator(payload).validate();
    const customerExist = await Customer.findOne({ email: payload.email }).exec();
    if (customerExist) throw new ConflictException();
    const customer = await Customer.create({ ...payload });

    //TODO send otp to the customer's email
    const otp: number = await this.sendOtp(customer.email);
    console.log(otp);
    return customer;
  }

  public static async signin(payload: SignDto): Promise<{ cookie: string; customer: ICustomer }> {
    new SignValidator(payload).validate();
    const customer: ICustomer = await Customer.findOne({ email: payload.email }).select("+password");
    if (!customer) throw new NotFoundException();
    if (!customer.isVerified) throw new AuthenticationException("Verify your account before signing in.");
    const isCorrectPassword = await bcrypt.compare(payload.password, customer.password);
    if (!isCorrectPassword) throw new AuthenticationException("Please check your email and password");

    const token = await this.generateToken(customer);
    const cookie = this.setCookies(token);
    const key = `x-token_${customer.customerId}`;
    await redisClient.del(key);
    await redisClient.set(key, token, 60 * 60); // 1hr
    return { cookie, customer };
  }

  public static async signout(payload: CustomerDto): Promise<ICustomer> {
    if (!payload) throw new NotFoundException();
    const key = `x-token_${payload.customerId}`;
    await redisClient.del(key);
    return payload;
  }

  public static async verifyOtp(payload: VerifyOtpDto): Promise<ICustomer> {
    if (!payload?.otp || !payload?.email) throw new BadRequestException("Invalid OTP credentials");
    const customer = await Customer.findOne({ email: payload.email }).exec();
    if (!customer) throw new NotFoundException("No user found with that email");
    if (customer.isVerified) throw new ConflictException("You are already being verified");

    const storedOtp = await redisClient.get(`x-otp_${payload.email}`);
    if (!storedOtp) throw new AuthenticationException("OTP token has expired");
    const validOtp = await bcrypt.compare(payload.otp, storedOtp);
    if (!validOtp) throw new AuthenticationException("Invalid OTP token");
    await redisClient.del(`x-otp_${payload.email}`);

    customer.isVerified = true;
    await customer.save();
    return customer;
  }

  public static async sendOtp(email: string): Promise<number> {
    const customer = await Customer.findOne({ email }).exec();
    if (!customer) throw new NotFoundException();
    const otp = this.generateOTP();
    const hashedOtp = await bcrypt.hash(JSON.stringify(otp), 2);
    const key = `x-otp_${email}`;
    await redisClient.del(key);
    redisClient.set(key, hashedOtp, 60 * 10); // 10mins
    return otp;
  }

  private static generateOTP(): number {
    const min = 100000;
    const max = 999999;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  private static async generateToken(payload: ICustomer): Promise<string> {
    const payloadStoredInToken: TokenDto = { customerId: payload.customerId };
    const token = await jwt.sign(payloadStoredInToken, config.secret, { expiresIn: "1h" });
    return token;
  }

  private static setCookies(token: string): string {
    return `Authorization=${token}; Secure; HttpOnly; SameSite=strict; Max-Age=${60 * 60}`;
  }
}
