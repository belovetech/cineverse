import { Exception } from './exceptions';

export class NotFoundException extends Exception {
  constructor(statusCode: number, message: string) {
    super(statusCode, message);
  }
}
