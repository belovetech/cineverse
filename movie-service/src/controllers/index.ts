import HealthCheckController from './healthcheck.controller';
import MovieController from './movie.controller';
import ShowtimeController from './showtime.controller';
import SeatController from './seat.controller';
import TheaterController from './theater.controller';
import UnknownEndpoint from './unknownendpoint';

export const healthcheckController = new HealthCheckController();
export const movieController = new MovieController();
export const showtimeController = new ShowtimeController();
export const seatController = new SeatController();
export const theaterController = new TheaterController();
export const unknownendpoint = new UnknownEndpoint();
