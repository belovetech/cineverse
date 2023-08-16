import { TheaterDto } from '@dtos/theater.dto';
import { PaginationMetadata } from './movie.interface';
interface ITheater {
    theaterId?: string;
    name: string;
    location: string;
    seatingCapacity: string;
}
export type IgetTheaters = {
    theaters: TheaterDto[];
    metadata: PaginationMetadata;
};
export default ITheater;
