import { Exception } from './exceptions';

export class InternalServerException extends Exception {
  constructor(statusCode?: number, message?: string) {
    super(statusCode, message);
    this.statusCode = 500;
    this.message = 'Internal Server Error';
  }
}
