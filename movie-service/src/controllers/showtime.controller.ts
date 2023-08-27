import { Request, Response, NextFunction } from 'express';
import ApiResponseFormatter from '@utils/formatter';
import logger from '@cineverse/libs';
import { showtimeService } from '@services';
import { showtimeLinks } from '@utils/links';
import { ShowTimeDto } from '@dtos/showtime.dto';

export default class ShowtimeController {
  public async createshowtime(req: Request, res: Response, next: NextFunction) {
    try {
      const showtimeData: ShowTimeDto = req.body;
      const showtime = await showtimeService.createShowtime(showtimeData);

      const response = new ApiResponseFormatter<ShowTimeDto>(showtime, showtimeLinks.post);
      return res.status(201).json(response.format());
    } catch (error) {
      logger.error('Createshowtime', error);
      return next(error);
    }
  }

  public async getshowtime(req: Request, res: Response, next: NextFunction) {
    try {
      const showtime = await showtimeService.getShowtime(req.params?.id);
      const response = new ApiResponseFormatter<ShowTimeDto>(showtime, showtimeLinks.get);
      return res.status(200).json(response.format());
    } catch (error) {
      logger.error('Getshowtime', error);
      return next(error);
    }
  }

  public async getShowtimes(req: Request, res: Response, next: NextFunction) {
    try {
      const { showtimes, metadata } = await showtimeService.getShowtimes(req.query);
      const response = showtimes.map(showtime => new ApiResponseFormatter<ShowTimeDto>(showtime).format());
      return res.status(200).json({ metadata, data: response });
    } catch (error) {
      logger.error('GetShowtimes', error);
      return next(error);
    }
  }
}
