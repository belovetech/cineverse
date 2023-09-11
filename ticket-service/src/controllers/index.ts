import HealthcheckController from './healthcheck';
import { BookingController } from './booking.contoller';
import { UnknownEndpoint } from './unknown.endpoint';

export const healthcheckController = new HealthcheckController();
export const bookingController = new BookingController();
export const unknownEndpoint = new UnknownEndpoint();
