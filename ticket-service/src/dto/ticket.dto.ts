import { IsOptional, IsString, IsNumber, IsUUID } from 'class-validator';

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
}
