import { IsOptional, IsString } from 'class-validator';

export class MovieDto {
  @IsString()
  @IsOptional()
  readonly movieId: string;

  @IsString()
  readonly title: string;

  @IsString()
  readonly description: string;

  @IsString()
  readonly genre: string;

  @IsString()
  readonly duration: string;

  @IsString()
  @IsOptional()
  readonly photo: string;
}
