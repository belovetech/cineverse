import { ShowTimeDto } from '@dtos/showtime.dto';
import Validator from '@validators/validator';

export class ShowtimeDataValidator<T extends ShowTimeDto> extends Validator<T> {
  public validate(): void {
    this.validateTime(this.payload.startTime, this.payload.endTime);
    this.validateDate(this.payload.date);
    this.validateUUIDv4('movieId', this.payload.movieId);
    this.validateUUIDv4('theaterId', this.payload.theaterId);

    if (this.errorCounter > 0) {
      this.printErrors();
    }
  }

  private validateTime(startTime: string, endTime: string): void {
    const timeRegex = /^(0\d|1\d|2[0-3]):[0-5]\d$/;

    if (!timeRegex.test(startTime)) {
      this.addError({ startTime: 'Please provide a valid start Time' });
    }

    if (!timeRegex.test(endTime)) {
      this.addError({ endTime: 'Please provide a valid end Time' });
    }

    const startParts = startTime?.split(':') ?? [];
    const endParts = endTime?.split(':') ?? [];

    if (startParts?.length !== 2 || endParts?.length !== 2) {
      this.addError({ time: 'Invalid start and end Time' });
    }

    const [startHour, startMinute] = startParts.map(part => parseInt(part, 10));
    const [endHour, endMinute] = endParts.map(part => parseInt(part, 10));

    if (startHour > endHour || (startHour === endHour && startMinute >= endMinute)) {
      this.addError({ time: 'Start time must be before end time' });
    }
  }

  private validateDate(date: string): void {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

    if (!dateRegex.test(date)) {
      this.addError({ date: 'Please provide a valid date' });
    }

    const [year, month, day] = date.split('-').map(part => parseInt(part, 10));
    console.log(year, month, day);
    const currentDate = new Date();
    const inputDate = new Date(year, month - 1, day); // month is 0-indexed

    if (month < 1 || month > 12 || day < 1 || day > 31) {
      this.addError({ date: 'Month or day out of range' }); //
    }

    if (inputDate < currentDate) {
      this.addError({ date: 'Date is in the past' });
    }
  }
}
