import { Exception } from './exceptions';

export class BadRequestException extends Exception {
  constructor(message?: string, statusCode?: number) {
    super(statusCode, message);
    this.statusCode = 400;
    this.message = message || 'Bad Request:: Invalid input';
  }
}
