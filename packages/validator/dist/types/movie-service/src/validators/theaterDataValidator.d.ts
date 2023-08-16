import { TheaterDto } from '@dtos/theater.dto';
import Validator from '@validators/validator';
export declare class TheaterDataValidator<T extends TheaterDto> extends Validator<T> {
    validate(): void;
}
