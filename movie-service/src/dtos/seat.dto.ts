import { IsOptional, IsString, IsNumber, IsEnum, IsNotEmpty, IsUUID } from 'class-validator';

export enum Status {
  AVAILABLE = 'available',
  BOOKED = 'booked',
  CANCELLED = 'cancelled',
}

export class SeatDto {
  @IsString()
  @IsOptional()
  readonly seatId: string;

  @IsNumber()
  readonly seatNumber: string;

  @IsNumber()
  readonly rowNumber: string;

  @IsNotEmpty()
  @IsEnum(Status)
  readonly status: Status = Status.AVAILABLE;

  @IsUUID()
  readonly theaterId: string;
}
