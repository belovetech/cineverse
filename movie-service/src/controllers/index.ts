import TheaterController from './theater.controller';
import MovieController from './movie.controller';
import HealthCheckController from './healthcheck.controller';
import UnknownEndpoint from './unknownendpoint';

export const theaterController = new TheaterController();
export const movieController = new MovieController();
export const healthcheckController = new HealthCheckController();
export const unknownendpoint = new UnknownEndpoint();
