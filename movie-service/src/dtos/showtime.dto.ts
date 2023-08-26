import { IsOptional, IsString, IsUUID, IsDateString } from 'class-validator';

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

  @IsUUID()
  public movieId: string;

  @IsUUID()
  public theaterId: string;
}
