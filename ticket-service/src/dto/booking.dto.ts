import {
  IsOptional,
  IsString,
  IsEnum,
  IsDecimal,
  IsDateString,
  IsUUID,
} from 'class-validator';
import { BookingStatus } from '@models/booking';

export class CreateBookingDto {
  @IsString()
  @IsOptional()
  readonly bookingId: string;

  @IsString()
  readonly customerId: string;

  @IsUUID()
  readonly movieId: string;

  @IsUUID()
  readonly showtimeId: string;

  @IsString()
  readonly seatNumber: string;

  @IsDateString()
  readonly bookingDate: Date;

  @IsUUID()
  @IsOptional()
  readonly paymentId: string;

  @IsEnum(BookingStatus)
  readonly bookingStatus: BookingStatus;

  @IsDecimal()
  readonly totalAmount: number;
}
