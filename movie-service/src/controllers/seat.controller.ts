import { Request, Response, NextFunction } from 'express';
import ApiResponseFormatter from '@utils/formatter';
import { logger } from '@cineverse/libs';
import { seatService } from '@services';
import { seatLinks } from '@utils/links';
import { SeatDto } from '@dtos/seat.dto';

export default class SeatController {
  public async createSeat(req: Request, res: Response, next: NextFunction) {
    try {
      const seatData: SeatDto = req.body;
      const seat = await seatService.createSeat(seatData);

      const response = new ApiResponseFormatter<SeatDto>(seat as SeatDto, seatLinks.post);

      return res.status(201).json(response.format());
    } catch (error) {
      logger.error('CreateSeat', error);
      return next(error);
    }
  }

  public async getSeat(req: Request, res: Response, next: NextFunction) {
    try {
      const seat = await seatService.getSeat(req.params?.id);
      const response = new ApiResponseFormatter<SeatDto>(seat as SeatDto, seatLinks.get);
      return res.status(200).json(response.format());
    } catch (error) {
      logger.error('GetSeat', error);
      return next(error);
    }
  }

  public async getSeats(req: Request, res: Response, next: NextFunction) {
    try {
      const { seats, metadata } = await seatService.getSeats(req.query);
      const response = seats.map(seat => new ApiResponseFormatter<SeatDto>(seat as SeatDto).format());
      return res.status(200).json({ metadata, data: response });
    } catch (error) {
      logger.error('GetSeats', error);
      return next(error);
    }
  }
}
