import Validator from '@cineverse/libs/src/validator';
import { Status, SeatType } from '@models/seat';
import { SeatDto } from '@dtos';

export class SeatDataValidator<T extends SeatDto> extends Validator<T> {
  public validate(): void {
    this.validateSeatNumber(this.payload.seatNumber);
    this.validateEnum('status', this.payload.status, Status);
    this.validateEnum('seatType', this.payload.seatType, SeatType);
    this.validateUUIDv4('theaterId', this.payload.theaterId);

    if (this.errorCounter > 0) {
      this.printErrors();
    }
  }

  private validateSeatNumber(seatNumber: string): void {
    const seatNumberREgex = /^[A-Z]\d+$/;

    if (!seatNumber || !seatNumberREgex.test(seatNumber)) {
      this.addError({ seatNumber: 'Please provide a valid seat Number' });
    }
  }

  private validateEnum<T>(enumName: string, value: string, enumType: T): void {
    if (!Object.values(enumType).includes(value)) {
      this.addError({ [enumName]: 'Please provide a valid seat status' });
    }
  }
}
