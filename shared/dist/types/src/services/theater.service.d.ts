import { TheaterDto } from '@dtos/theater.dto';
import { Metadata } from '@interfaces/pagination.interface';
import Theater from '@models/theater';
export default class TheaterService {
    createTheater(theaterData: TheaterDto): Promise<Theater>;
    getTheaters(reqQuery: Record<string, unknown>): Promise<{
        theaters: Theater[];
        metadata: Metadata;
    }>;
    getTheater(theaterId: string): Promise<Theater | null>;
}
