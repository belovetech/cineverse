import { ConflictException } from '@cineverse/exceptions';
import { IgetTheaters } from '@interfaces/theater.interface';
import { TheaterDto } from '@dtos/theater.dto';
import { TheaterDataValidator } from '@validators/theaterDataValidator';
import { theaterRepository } from '@respositories';
import Theater from '@models/theater';

export default class TheaterService {
  public async createTheater(theaterData: TheaterDto): Promise<TheaterDto> {
    new TheaterDataValidator<TheaterDto>(theaterData).validate();

    const isTheaterExist = await theaterRepository.getTheater({ where: { name: theaterData.name } });
    if (isTheaterExist) throw new ConflictException('Theater already exist');
    const newTheater: TheaterDto = await theaterRepository.createTheather(theaterData);
    return newTheater;
  }

  public async getTheaters(reqQuery: Record<string, unknown>): Promise<IgetTheaters> {
    return await theaterRepository.getTheaters(reqQuery);
  }

  public async getTheater(theaterId: string): Promise<Theater | null> {
    return await theaterRepository.getTheaterById(theaterId);
  }
}
