import { ShowTimeDto } from '@dtos/showtime.dto';
import { Metadata } from '@interfaces/pagination.interface';
import ShowTime from '@models/showtime';
export default class ShowtimeService {
    createShowtime(showtime: ShowTimeDto): Promise<ShowTime>;
    getShowtimes(reqQuery: Record<string, unknown>): Promise<{
        showtimes: ShowTime[];
        metadata: Metadata;
    }>;
    getShowtime(showTimeId: string): Promise<ShowTime | null>;
}
