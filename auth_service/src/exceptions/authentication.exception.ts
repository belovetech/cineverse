import { Exception } from './exceptions';

export class AuthenticationException extends Exception {
  constructor(message?: string, statusCode?: number) {
    super(statusCode, message);
    this.statusCode = 401;
    this.message = message ?? 'Unauthorized:: Authentication failed';
  }
}
