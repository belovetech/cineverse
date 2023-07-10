export default interface CustomerDto {
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  password: string;
  readonly passwordConfirm: string;
  readonly isVerified?: string;
}
