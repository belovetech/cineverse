import { Exception } from './exceptions';

export class AuthenticationException extends Exception {
  constructor(statusCode: number, message?: string) {
    super(statusCode, message);
    this.statusCode = 401;
    this.message = 'Unauthorized:: Authentication failed';
  }
}
