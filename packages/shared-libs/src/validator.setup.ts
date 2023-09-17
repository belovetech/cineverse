import {
  IsOptional,
  IsString,
  IsDecimal,
  IsDateString,
  IsUUID,
} from 'class-validator';

export class TestDto {
  @IsUUID()
  bookingId: string;

  @IsString()
  customerId: string;

  @IsString()
  seatNumber: string;

  @IsDateString()
  @IsOptional()
  bookingDate: Date;

  @IsDecimal()
  totalAmount: number;
}
