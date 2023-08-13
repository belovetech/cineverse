import Validator from '@validators/validator';
import { MovieDto } from '@dtos/movie.dto';

export class MovieDataValidator<T extends MovieDto> extends Validator<T> {
  public validate(): void {
    this.validateString('title', this.payload.title);
    this.validateString('genre', this.payload.genre);
    this.validateString('description', this.payload.description);
    this.validateString('duration', this.payload.duration);

    for (const key in this.payload) {
      if (Object.prototype.hasOwnProperty.call(this.payload, key) && !this.isValidKey(key as keyof T)) {
        this.validateUnknownType(key as keyof T);
      }
    }

    if (this.errorCounter > 0) {
      this.printErrors();
    }
  }
}
