export interface VerifyOtpDto {
  readonly email: string;
  readonly otp: string;
}

export interface LoginDto {
  readonly email: string;
  readonly password: string;
}

export interface TokenDto {
  customerId: string;
}
