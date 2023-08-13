import { ConflictException } from '@cineverse/exceptions';
import { IgetTheaters } from '@interfaces/theater.interface';
import { TheaterDto } from '@dtos/theater.dto';
import { TheaterDataValidator } from '@validators/theaterDataValidator';
import TheaterRepository from '@respositories/theater.repository';
import Theater from '@models/theater';

export default class TheaterService {
  private static theaterRepository = new TheaterRepository();

  public static async createTheater(theaterData: TheaterDto): Promise<TheaterDto> {
    new TheaterDataValidator<TheaterDto>(theaterData).validate();

    const isTheaterExist = await this.theaterRepository.getTheater({ where: { name: theaterData.name } });
    if (isTheaterExist) throw new ConflictException('Theater already exist');
    const newTheater: TheaterDto = await this.theaterRepository.createTheather(theaterData);
    return newTheater;
  }

  public static async getTheaters(reqQuery: Record<string, unknown>): Promise<IgetTheaters> {
    return await this.theaterRepository.getTheaters(reqQuery);
  }

  public static async getTheater(theaterId: string): Promise<Theater | null> {
    return await this.theaterRepository.getTheaterById(theaterId);
  }
}
