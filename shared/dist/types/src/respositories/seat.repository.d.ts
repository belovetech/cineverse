import { FindOptions } from 'sequelize';
import { Metadata } from '@interfaces/pagination.interface';
import { SeatDto } from '@dtos/seat.dto';
import Seat from '@models/seat';
export default class SeatRepository {
    create(data: SeatDto): Promise<Seat>;
    findByPk(seatId: string, options?: FindOptions): Promise<Seat | null>;
    findOne(options: FindOptions): Promise<Seat | null>;
    findAll(reqQuery: Record<string, string>): Promise<{
        seats: Seat[];
        metadata: Metadata;
    }>;
    update(seatId: string, options: Partial<Seat>): Promise<Seat>;
    delete(seatId: string): Promise<Seat | number>;
}
