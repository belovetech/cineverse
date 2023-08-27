import { SeatDto } from '@dtos/seat.dto';
import { Metadata } from '@interfaces/pagination.interface';
import Seat from '@models/seat';
export default class SeatService {
    createSeat(seat: SeatDto): Promise<Seat>;
    getSeats(reqQuery: Record<string, unknown>): Promise<{
        seats: Seat[];
        metadata: Metadata;
    }>;
    getSeat(seatId: string): Promise<Seat | null>;
}
