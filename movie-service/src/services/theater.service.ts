import { ConflictException } from '@cineverse/exceptions';
import { TheaterDto } from '@dtos/theater.dto';
import { TheaterDataValidator } from '@validators/theaterDataValidator';
import { theaterRepository } from '@respositories';
import { Metadata } from '@interfaces/pagination.interface';
import Theater from '@models/theater';

export default class TheaterService {
  public async createTheater(theaterData: TheaterDto): Promise<Theater> {
    new TheaterDataValidator<TheaterDto>(theaterData).validate();

    const isTheaterExist = await theaterRepository.findOne({ where: { name: theaterData.name } });
    if (isTheaterExist) throw new ConflictException('Theater already exist');
    const newTheater = await theaterRepository.create(theaterData);
    return newTheater;
  }

  public async getTheaters(reqQuery: Record<string, unknown>): Promise<{ theaters: Theater[]; metadata: Metadata }> {
    return await theaterRepository.findAll(reqQuery as Record<string, string>);
  }

  public async getTheater(theaterId: string): Promise<Theater | null> {
    let theater: Theater | null = null;
    try {
      theater = await theaterRepository.findByPk(theaterId, {
        include: [Theater.associations.seat, Theater.associations.showTimes],
        rejectOnEmpty: true,
      });
      console.log(theater);
    } catch (error) {
      throw new ConflictException('Theater not found ', error);
    }
    return theater;
  }
}
