import Validator from '../src/validator';

export interface Theater {
  theaterId?: string;
  name: string;
  location: string;
  seatingCapacity: number;
}

export class TheaterDataValidator<T extends Theater> extends Validator<T> {
  public validate(): void {
    this.validateString('name', this.payload.name);
    this.validateString('location', this.payload.location);
    this.validateNumber('seatingCapacity', this.payload.seatingCapacity);

    if (this.errorCounter > 0) {
      this.printErrors();
    }
  }
}
