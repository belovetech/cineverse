export interface CustomerDto {
  customerId: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirm: string;
  isVerified?: boolean;
}
