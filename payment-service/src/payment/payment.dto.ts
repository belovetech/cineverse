import { IsOptional, IsString, IsUUID, IsDecimal } from 'class-validator';

export class CreatePaymentDto {
  @IsString()
  @IsOptional()
  paymentId: string;

  @IsUUID()
  readonly bookingId: string;

  @IsDecimal()
  readonly totalAmount: number;

  @IsString()
  readonly status: string;
}
