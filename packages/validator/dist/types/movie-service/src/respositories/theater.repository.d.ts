import { FindOptions } from 'sequelize';
import { IgetTheaters } from '@interfaces/theater.interface';
import { TheaterDto } from '@dtos/theater.dto';
import Theater from '@models/theater';
export default class TheaterRepository {
    createTheather(theaterData: TheaterDto): Promise<TheaterDto>;
    getTheaterById(theaterId: string): Promise<Theater | null>;
    getTheater(options: FindOptions): Promise<Theater | null>;
    getTheaters(reqQuery: Record<string, unknown>): Promise<IgetTheaters>;
    updateTheater(theaterId: string, options: Partial<Theater>): Promise<Theater>;
    deleteTheater(theaterId: string, options?: Partial<Theater>): Promise<number>;
}
