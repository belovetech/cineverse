import { IsOptional, IsString, IsNotEmpty, IsUUID } from 'class-validator';

export class CreatePaymentDto {
  @IsString()
  @IsOptional()
  paymentId: string;

  @IsUUID()
  readonly bookingId: string;

  @IsNotEmpty()
  readonly totalAmount: string;

  // @IsString()
  // status: string;
}
