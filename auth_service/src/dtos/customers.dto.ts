export default interface CustomerDto {
  readonly customerId: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly isVerified?: boolean;
}
