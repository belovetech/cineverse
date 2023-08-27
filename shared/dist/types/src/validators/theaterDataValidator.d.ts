import { TheaterDto } from '@dtos/theater.dto';
import Validator from '@cineverse/libs';
export declare class TheaterDataValidator<T extends TheaterDto> extends Validator<T> {
    validate(): void;
}
