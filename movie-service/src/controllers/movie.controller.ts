import { Request, Response, NextFunction } from 'express';
import ApiResponseFormatter from '@utils/formatter';
import logger from '@cineverse/libs';
import { movieLinks } from '@utils/links';
import { movieService } from '@services';
import { MovieDto } from '@dtos/movie.dto';

export default class MovieController {
  public async createMovie(req: Request, res: Response, next: NextFunction) {
    try {
      const movieData: MovieDto = req.body;
      const movie = await movieService.createMovie(movieData);
      const response = new ApiResponseFormatter<MovieDto>(movie, movieLinks.post);
      return res.status(201).json(response.format());
    } catch (error) {
      logger.error(`Create Movie Error: ${error}`);
      return next(error);
    }
  }

  public async getMovies(req: Request, res: Response, next: NextFunction) {
    try {
      const { movies, metadata } = await movieService.getMovies(req.query);
      const moviesData = movies.map(movie => new ApiResponseFormatter<MovieDto>(movie as MovieDto).format());
      return res.status(200).json({ metadata, data: moviesData });
    } catch (error) {
      logger.error(`Get Movies Error: ${error}`);
      return next(error);
    }
  }

  public async getMovie(req: Request, res: Response, next: NextFunction) {
    try {
      const movie = await movieService.getMovie(req.params?.id);
      const response = new ApiResponseFormatter<MovieDto>(movie, movieLinks.get);
      return res.status(200).json(response.format());
    } catch (error) {
      logger.error(`Get Movie Error: ${error}`);
      return next(error);
    }
  }
}
