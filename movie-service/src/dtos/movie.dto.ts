import { IsOptional, IsString } from 'class-validator';

export class MovieDto {
  @IsString()
  @IsOptional()
  public movieId: string;

  @IsString()
  public title: string;

  @IsString()
  public description: string;

  @IsString()
  public genre: string;

  @IsString()
  public duration: string;

  @IsString()
  @IsOptional()
  public photo: string;
}
