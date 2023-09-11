import { BookingStatus } from '@models/booking';
import {
  IsOptional,
  IsString,
  IsEnum,
  IsDecimal,
  IsUUID,
} from 'class-validator';

export class CreateBookingDto {
  @IsString()
  @IsOptional()
  bookingId: string;

  @IsString()
  customerId: string;

  @IsUUID()
  movieId: string;

  @IsUUID()
  showtimeId: string;

  @IsString()
  seatNumber: string;

  @IsUUID()
  @IsOptional()
  paymentId: string;

  @IsEnum(BookingStatus)
  @IsOptional()
  bookingStatus: BookingStatus;

  @IsDecimal()
  totalAmount: number;
}
