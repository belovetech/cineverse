import {
  IsOptional,
  IsString,
  IsNumber,
  IsUUID,
  IsEnum,
} from 'class-validator';
import { TicketType } from '@models/ticket';

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

  @IsEnum(TicketType)
  @IsOptional()
  readonly ticketType: TicketType;
}
