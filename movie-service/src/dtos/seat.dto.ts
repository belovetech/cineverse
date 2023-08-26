import { IsOptional, IsString, IsNumber, IsEnum } from 'class-validator';

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
  readonly seatNumber: number;

  @IsNumber()
  readonly rowNumber: string;

  @IsEnum(Status)
  readonly availableStatus: Status = Status.AVAILABLE;
}
