import MovieController from '@controllers/movie.controller';
import IRoute from '@interfaces/route.interface';
import { Router } from 'express';

export default class MovieRoute implements IRoute {
  public path? = '/movies';
  public router = Router();
  public movieController = new MovieController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(this.path, this.movieController.createMovie);
  }
}
