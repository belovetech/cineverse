import { ICustomer } from "@interfaces/customers.interface";
import { LoginDto, VerifyOtpDto } from "@dtos/auth.dto";
import { CustomerDto } from "@dtos/customers.dto";
export default class AuthService {
    static signup(payload: CustomerDto): Promise<ICustomer>;
    static signin(payload: LoginDto): Promise<{
        cookie: string;
        customer: ICustomer;
    }>;
    static signout(payload: CustomerDto): Promise<ICustomer>;
    static verifyOtp(payload: VerifyOtpDto): Promise<ICustomer>;
    static sendOtp(email: string): Promise<number>;
    private static generateOTP;
    private static generateToken;
    private static setCookies;
}
