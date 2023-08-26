import { ConflictException } from '@cineverse/exceptions';
import { seatRepository } from '@respositories';
import { SeatDataValidator } from '@validators/seatDataValidator';
import { SeatDto } from '@dtos/seat.dto';
import Seat from '@models/seat';

export default class SeatService {
  public async createSeat(seat: SeatDto): Promise<Seat> {
    new SeatDataValidator<SeatDto>(seat).validate();
    const { seatNumber, rowNumber, theaterId } = seat;
    const seatExist = await seatRepository.findOne({ where: { seatNumber, rowNumber, theaterId } });
    if (seatExist) throw new ConflictException('seat already exist');

    const newSeat = await seatRepository.create(seat);
    return newSeat;
  }

  public async getSeats(reqQuery: Record<string, unknown>): Promise<{ seats: Seat[]; metadata: object }> {
    return seatRepository.findAll(reqQuery as Record<string, string>);
  }

  public async getSeat(showtimeId: string): Promise<Seat> {
    return seatRepository.findByPk(showtimeId);
  }
}
