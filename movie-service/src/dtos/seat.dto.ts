import { IsOptional, IsString, IsNumber, IsEnum, IsNotEmpty, IsUUID } from 'class-validator';
import { Status, SeatType } from '@models/seat';

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
