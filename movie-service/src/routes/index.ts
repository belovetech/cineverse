import HealthCheckRoute from './healthcheck.route';
import MovieRoute from './movie.route';
import TheaterRoute from './theater.route';
import ShowtimeRoute from './showtime.route';

export const healthcheckRoute = new HealthCheckRoute();
export const movieRoute = new MovieRoute();
export const theaterRoute = new TheaterRoute();
export const showtimeRoute = new ShowtimeRoute();
