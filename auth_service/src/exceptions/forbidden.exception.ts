import { Exception } from './exceptions';

export class ForbiddenException extends Exception {
  constructor(statusCode?: number, message?: string) {
    super(statusCode, message);
    this.statusCode = 403;
    this.message = 'Forbidden:: Unauthorized';
  }
}
