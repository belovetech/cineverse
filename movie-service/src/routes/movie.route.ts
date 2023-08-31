import { movieController } from '@controllers';
import IRoute from '@interfaces/route.interface';
import { Router } from 'express';

export default class MovieRoute implements IRoute {
  public path? = '/movies';
  public router: Router = Router();
  private readonly movieController = movieController;

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(this.path, this.movieController.createMovie);
    this.router.get(this.path, this.movieController.getMovies);
    this.router.get(`${this.path}/:id`, this.movieController.getMovie);
  }
}
