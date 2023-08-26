import HealthCheckRoute from './healthcheck.route';
import MovieRoute from './movie.route';
import SeatRoute from './seat.route';
import ShowtimeRoute from './showtime.route';
import TheaterRoute from './theater.route';

export const healthcheckRoute = new HealthCheckRoute();
export const movieRoute = new MovieRoute();
export const seatRoute = new SeatRoute();
export const showtimeRoute = new ShowtimeRoute();
export const theaterRoute = new TheaterRoute();
