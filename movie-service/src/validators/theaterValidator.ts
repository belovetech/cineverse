import Validator from '@cineverse/libs/src/validator';
import { TheaterDto } from '@dtos';

export class TheaterDataValidator<T extends TheaterDto> extends Validator<T> {
  public validate(): void {
    this.validateString('name', this.payload.name);
    this.validateString('location', this.payload.location);
    this.validateNumber('seatingCapacity', this.payload.seatingCapacity);

    if (this.errorCounter > 0) {
      this.printErrors();
    }
  }
}
