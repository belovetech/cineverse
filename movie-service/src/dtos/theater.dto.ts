import { IsOptional, IsString, IsNumber } from 'class-validator';

export class TheaterDto {
  @IsString()
  @IsOptional()
  public theaterId: string;

  @IsString()
  public name: string;

  @IsString()
  public location: string;

  @IsNumber()
  public seatingCapacity: number;
}
