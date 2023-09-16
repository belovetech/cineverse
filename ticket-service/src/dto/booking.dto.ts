import { BookingStatus } from '@models/booking';
import { Seat } from '@services/seat.utils';
import {
  IsOptional,
  IsString,
  IsEnum,
  IsUUID,
  IsAlphanumeric,
  IsArray,
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

  @IsAlphanumeric()
  seatNumber: string;

  @IsUUID()
  @IsOptional()
  paymentId: string;

  @IsEnum(BookingStatus)
  @IsOptional()
  bookingStatus: BookingStatus;

  @IsArray()
  seats: Seat[];
}
