import { Exception } from './exceptions';

export class NotFoundException extends Exception {
  constructor(message?: string, statusCode?: number) {
    super(statusCode, message);
    this.statusCode = 404;
    this.message = message ?? 'Not found:: Customer not found';
  }
}
