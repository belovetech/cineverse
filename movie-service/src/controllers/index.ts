import HealthCheckController from './healthcheck.controller';
import MovieController from './movie.controller';
import TheaterController from './theater.controller';
import ShowtimeController from './showtime.controller';
import UnknownEndpoint from './unknownendpoint';

export const movieController = new MovieController();
export const theaterController = new TheaterController();
export const showtimeController = new ShowtimeController();
export const healthcheckController = new HealthCheckController();
export const unknownendpoint = new UnknownEndpoint();
