import { ShowTimeDto } from '@dtos/showtime.dto';
import Validator from '@cineverse/libs';
export declare class ShowtimeDataValidator<T extends ShowTimeDto> extends Validator<T> {
    validate(): void;
    private validateTime;
    private validateDate;
}
