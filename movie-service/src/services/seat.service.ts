import { ConflictException, NotFoundException } from '@cineverse/libs';
import { Metadata } from '@interfaces';
import { SeatValidator } from '@validators';
import { SeatDto } from '@dtos';
import { seatRepository } from '@respositories';
import { Seat } from '@models';

export default class SeatService {
  public async createSeat(seat: SeatDto): Promise<Seat> {
    new SeatValidator(seat).validate();

    const seatExist = await seatRepository.findOne({ where: { ...seat } });
    if (seatExist) throw new ConflictException('seat already exist');

    const newSeat = await seatRepository.create(seat);
    return newSeat;
  }

  public async getSeats(reqQuery: Record<string, unknown>): Promise<{ seats: Seat[]; metadata: Metadata }> {
    return await seatRepository.findAll(reqQuery as Record<string, string>);
  }

  public async getSeat(seatId: string): Promise<Seat | null> {
    const seat = await seatRepository.findByPk(seatId);
    if (seat === null) throw new NotFoundException('Seat not found');
    return seat;
  }
}
