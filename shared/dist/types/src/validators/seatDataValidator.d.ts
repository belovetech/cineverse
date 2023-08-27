import { SeatDto } from '@dtos/seat.dto';
import Validator from '@cineverse/libs';
export declare class SeatDataValidator<T extends SeatDto> extends Validator<T> {
    validate(): void;
    private validateSeatNumber;
    private validateRowNumber;
    private validateEnum;
}
