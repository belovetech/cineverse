import { Request, Response, NextFunction } from 'express';
import ApiResponseFormatter from '@utils/formatter';
import logger from '@cineverse/libs';
import { theaterService } from '@services';
import { theaterLinks } from '@utils/links';
import { TheaterDto } from '@dtos/theater.dto';

export default class TheaterController {
  public async createTheater(req: Request, res: Response, next: NextFunction) {
    try {
      const theaterData: TheaterDto = req.body;
      const theater = await theaterService.createTheater(theaterData);
      const response = new ApiResponseFormatter<TheaterDto>(theater, theaterLinks.post);
      return res.status(201).json(response.format());
    } catch (error) {
      logger.error('CreateTheater', error);
      return next(error);
    }
  }

  public async getTheater(req: Request, res: Response, next: NextFunction) {
    try {
      const theater = await theaterService.getTheater(req.params?.id);
      const response = new ApiResponseFormatter<TheaterDto>(theater, theaterLinks.get);
      return res.status(200).json(response.format());
    } catch (error) {
      logger.error('GetTheater', error);
      return next(error);
    }
  }

  public async getTheaters(req: Request, res: Response, next: NextFunction) {
    try {
      const { theaters, metadata } = await theaterService.getTheaters(req.query);
      const theatersData = theaters.map(theater => new ApiResponseFormatter<TheaterDto>(theater).format());
      return res.status(200).json({ metadata, data: theatersData });
    } catch (error) {
      logger.error('GetTheaters', error);
      return next(error);
    }
  }
}
