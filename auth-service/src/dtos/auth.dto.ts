export interface VerifyOtpDto {
  readonly email: string;
  readonly otp: string;
}

export interface SignDto {
  readonly email: string;
  readonly password: string;
}

export interface TokenDto {
  customerId: string;
}

export interface SignupDto {
  customerId: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirm: string;
  isVerified?: boolean;
}
