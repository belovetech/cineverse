import { MovieDto } from '@dtos/movie.dto';

export default interface IMovie {
  movieId?: string;
  title: string;
  genre: string;
  description: string;
  duration: string;
  photo?: string;
}

export interface PaginationMetadata {
  total_items: number;
  item_per_page: number;
  total_page: number;
  previous_page: number;
  current_page: number;
  next_page: number;
}

export interface IGetMovie {
  movies: MovieDto[];
  metadata: PaginationMetadata;
}
