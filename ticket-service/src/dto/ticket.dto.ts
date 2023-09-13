import { IsOptional, IsString, IsEnum, IsUUID } from 'class-validator';
import { TicketType } from '@models/ticket';

export class CreateTicketDto {
  @IsUUID()
  @IsOptional()
  readonly tickeId: string;

  @IsUUID()
  readonly bookingId: string;

  @IsUUID()
  readonly movieId: string;

  @IsUUID()
  readonly showtimeId: string;

  @IsString()
  readonly seatNumber: string;

  @IsString()
  @IsOptional()
  readonly QRCode: string;

  @IsEnum(TicketType)
  readonly ticketType: TicketType;

  @IsString()
  readonly price: number;
}
