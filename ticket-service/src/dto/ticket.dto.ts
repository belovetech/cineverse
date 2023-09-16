import {
  IsOptional,
  IsString,
  IsNumber,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { Seat } from '@services/seat.utils';
import { Type } from 'class-transformer';
import { SeatDto } from './seat.dto';

export class CreateTicketDto {
  @IsUUID()
  @IsOptional()
  readonly tickeId: string;

  @IsUUID()
  readonly bookingId: string;

  @IsString()
  readonly seatNumber: string;

  @IsString()
  @IsOptional()
  readonly QRCode: string;

  @IsNumber()
  readonly price: number;

  @ValidateNested({ each: true })
  @Type(() => SeatDto)
  seats: Seat[];
}
