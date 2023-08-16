import { IgetTheaters } from '@interfaces/theater.interface';
import { TheaterDto } from '@dtos/theater.dto';
import Theater from '@models/theater';
export default class TheaterService {
    createTheater(theaterData: TheaterDto): Promise<TheaterDto>;
    getTheaters(reqQuery: Record<string, unknown>): Promise<IgetTheaters>;
    getTheater(theaterId: string): Promise<Theater | null>;
}
