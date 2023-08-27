import Validator from '@cineverse/libs';
import { MovieDto } from '@dtos/movie.dto';
export declare class MovieDataValidator<T extends MovieDto> extends Validator<T> {
    validate(): void;
}
