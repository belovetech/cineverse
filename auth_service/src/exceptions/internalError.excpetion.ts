import { Exception } from './exceptions';

export class InternalServerException extends Exception {
  constructor(message?: string, statusCode?: number) {
    super(statusCode, message);
    this.statusCode = 500;
    this.message = message ?? 'Server Error:: Internal Server Error';
  }
}
