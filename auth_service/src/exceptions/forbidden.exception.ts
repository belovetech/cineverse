import { Exception } from './exceptions';

export class ForbiddenException extends Exception {
  constructor(message?: string, statusCode?: number) {
    super(statusCode, message);
    this.statusCode = 403;
    this.message = message || 'Forbidden:: Unauthorized';
  }
}
