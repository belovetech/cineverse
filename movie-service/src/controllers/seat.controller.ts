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

  public async updateSeat(req: Request, res: Response, next: NextFunction) {
    try {
      const seatData: SeatDto = req.body;
      const seat = await seatService.updateSeat(req.params?.id, seatData);
      if (Array.isArray(seat)) {
        const response = seat.map(seat => new ApiResponseFormatter<SeatDto>(seat).format());
        return res.status(200).json({ data: response });
      }
      const response = new ApiResponseFormatter<SeatDto>(seat, seatLinks.update);
      return res.status(200).json(response.format());
    } catch (error) {
      logger.error('UpdateSeat', error);
      return next(error);
    }
  }

  // public async putSeats(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     const seatData: SeatDto = req.body;
  //     const seat = await seatService.putSeats(seatData.seatType, seatData);
  //     if (Array.isArray(seat)) {
  //       const response = seat.map(seat => new ApiResponseFormatter<SeatDto>(seat).format());
  //       return res.status(200).json({ data: response, affectecdRows: seat.length });
  //     }
  //     return res.status(200).json({});
  //   } catch (error) {
  //     logger.error('UpdateSeat', error);
  //     return next(error);
  //   }
  // }
}
