import { TheaterDto } from '@dtos/theater.dto';
import { PaginationMetadata } from './movie.interface';

export default interface ITheater {
  theaterId?: string;
  name: string;
  location: string;
  seatingCapacity: string;
}

export type IgetTheaters = {
  theaters: TheaterDto[];
  metadata: PaginationMetadata;
};
