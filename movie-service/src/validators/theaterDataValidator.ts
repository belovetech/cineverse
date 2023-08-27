import { TheaterDto } from '@dtos/theater.dto';
import Validator from '@cineverse/libs';

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
