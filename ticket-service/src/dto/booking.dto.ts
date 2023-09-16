import { BookingStatus } from '@models/booking';
import { SeatDto } from './seat.dto';
import {
  IsOptional,
  IsString,
  IsEnum,
  IsUUID,
  IsArray,
  ValidateNested,
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
  theaterId: string;

  @IsUUID()
  showtimeId: string;

  @IsUUID()
  @IsOptional()
  paymentId: string;

  @IsEnum(BookingStatus)
  @IsOptional()
  bookingStatus: BookingStatus;

  @IsArray()
  @ValidateNested()
  seats: SeatDto[];
}
