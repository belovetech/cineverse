import { FindOptions } from 'sequelize';
import { Metadata } from '@interfaces/pagination.interface';
import { ShowTimeDto } from '@dtos/showtime.dto';
import ShowTime from '@models/showtime';
export default class ShowtimeRepository {
    create(data: ShowTimeDto): Promise<ShowTime>;
    findByPk(showtimeId: string, options?: FindOptions): Promise<ShowTime | null>;
    findOne(options: FindOptions): Promise<ShowTime | null>;
    findAll(reqQuery: Record<string, string>): Promise<{
        showtimes: ShowTime[];
        metadata: Metadata;
    }>;
    update(showTimeId: string, options: Partial<ShowTime>): Promise<ShowTime>;
    delete(showTimeId: string): Promise<ShowTime | number>;
}
