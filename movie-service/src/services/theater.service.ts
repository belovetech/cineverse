import { ConflictException, NotFoundException } from '@cineverse/libs';
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

    return await theaterRepository.create(theaterData);
  }

  public async getTheaters(reqQuery: Record<string, unknown>): Promise<{ theaters: Theater[]; metadata: Metadata }> {
    return await theaterRepository.findAll(reqQuery as Record<string, string>);
  }

  public async getTheater(theaterId: string): Promise<Theater | null> {
    const theater = await theaterRepository.findTheaterWithAssociates(theaterId);
    if (theater === null) throw new NotFoundException('Theater not found');
    return theater;
  }
}
