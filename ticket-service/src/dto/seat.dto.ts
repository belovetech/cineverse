import {
  IsString,
  IsNumber,
  IsAlphanumeric,
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
  readonly seatId: string;

  @IsAlphanumeric()
  readonly seatNumber: string;

  @IsNotEmpty({ message: 'seatType is required' })
  @IsEnum(SeatType)
  readonly seatType: SeatType;

  @IsNumber(
    { allowNaN: false },
    {
      message: 'price must be a number',
    },
  )
  public price: number;

  @IsNotEmpty({ message: 'status is required' })
  @IsEnum(Status, {
    message: 'status must be a valid enum value',
  })
  readonly status: Status;
}
