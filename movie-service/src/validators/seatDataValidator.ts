import { SeatDto, Status } from '@dtos/seat.dto';
import Validator from '@validators/validator';

export class SeatDataValidator<T extends SeatDto> extends Validator<T> {
  public validate(): void {
    this.validateSeatNumber(this.payload.seatNumber);
    this.validateRowNumber(this.payload.rowNumber);
    this.validateEnum(this.payload.status);
    this.validateUUIDv4('theaterId', this.payload.theaterId);

    if (this.errorCounter > 0) {
      this.printErrors();
    }
  }

  private validateSeatNumber(seatNumber: string): void {
    const seatNumberREgex = /^\d+$/;

    if (!seatNumber || !seatNumberREgex.test(seatNumber)) {
      this.addError({ seatNumber: 'Please provide a valid seat Number' });
    }
  }

  private validateRowNumber(rowNumber: string): void {
    const rowNumberREgex = /^\[A-Z]+$/;

    if (!rowNumber || !rowNumberREgex.test(rowNumber)) {
      this.addError({ rowNumber: 'Please provide a valid row Number' });
    }
  }

  private validateEnum(status: string): void {
    if (!status || !Object.values(Status).includes(status as Status)) {
      this.addError({ status: 'Please provide a valid seat status' });
    }
  }
}
