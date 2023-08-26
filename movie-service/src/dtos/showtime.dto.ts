import { IsOptional, IsString, IsUUID, IsDateString } from 'class-validator';

export class ShowTimeDto {
  @IsString()
  @IsOptional()
  readonly showTimeId: string;

  @IsString()
  readonly startTime: string;

  @IsString()
  readonly endTime: string;

  @IsDateString()
  readonly date: string;

  @IsUUID()
  readonly movieId: string;

  @IsUUID()
  readonly theaterId: string;
}
