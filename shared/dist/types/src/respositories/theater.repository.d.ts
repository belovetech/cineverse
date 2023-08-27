import { Metadata } from '@interfaces/pagination.interface';
import { TheaterDto } from '@dtos/theater.dto';
import Theater from '@models/theater';
export default class TheaterRepository {
    create(theaterData: TheaterDto): Promise<Theater>;
    findByPk(theaterId: string, options?: unknown): Promise<Theater | null>;
    findOne(options: unknown): Promise<Theater | null>;
    findAll(reqQuery: Record<string, string>): Promise<{
        theaters: Theater[];
        metadata: Metadata;
    }>;
    update(theaterId: string, options: Partial<Theater>): Promise<Theater>;
    delete(theaterId: string, options?: Partial<Theater>): Promise<number>;
    findTheaterWithAssociates(theaterId: string): Promise<Theater | null>;
}
