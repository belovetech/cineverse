import { IsOptional, IsString, IsNumber } from 'class-validator';

export class TheaterDto {
  @IsString()
  @IsOptional()
  readonly theaterId: string;

  @IsString()
  readonly name: string;

  @IsString()
  readonly location: string;

  @IsNumber()
  readonly seatingCapacity: number;
}
