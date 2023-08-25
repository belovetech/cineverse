import { IsOptional, IsString, IsDateString } from 'class-validator';

export class ShowTimeDto {
  @IsString()
  @IsOptional()
  public showTimeId: string;

  @IsString()
  public startTime: string;

  @IsString()
  public endTime: string;

  @IsDateString()
  public date: string;

  @IsString()
  public movieId: string;

  @IsString()
  public theaterId: string;
}
