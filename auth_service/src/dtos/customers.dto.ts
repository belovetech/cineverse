export interface CustomerDto {
  readonly customerId: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly password: string;
  readonly passwordConfirm?: string;
  readonly isVerified?: boolean;
}
