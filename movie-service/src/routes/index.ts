import HealthCheckRoute from './healthcheck.route';
import MovieRoute from './movie.route';
import TheaterRoute from './theater.route';

export const healthcheckRoute = new HealthCheckRoute();
export const theaterRoute = new TheaterRoute();
export const movieRoute = new MovieRoute();
