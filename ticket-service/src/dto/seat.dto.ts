import {
  IsOptional,
  IsString,
  IsNumber,
  IsUUID,
  IsNotEmpty,
  IsEnum,
} from 'class-validator';

export enum Status {
  AVAILABLE = 'available',
  BOOKED = 'booked',
  CANCELLED = 'cancelled',
}

export enum SeatType {
  REGULAR = 'regular',
  STANDARD = 'standard',
  RECLINER = 'recliner',
}

export class SeatDto {
  @IsString()
  @IsOptional()
  readonly seatId: string;

  @IsNumber()
  readonly seatNumber: string;

  @IsNotEmpty()
  @IsEnum(SeatType)
  readonly seatType: SeatType = SeatType.REGULAR;

  @IsNumber()
  public price: number;

  @IsNotEmpty()
  @IsEnum(Status)
  readonly status: Status = Status.AVAILABLE;

  @IsUUID()
  readonly theaterId: string;
}
