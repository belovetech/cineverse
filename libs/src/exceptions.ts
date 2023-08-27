export class Exception extends Error {
  public message: string;
  public name: string;
  public statusCode: number;

  constructor(message?: string) {
    super(message);
    this.message = message ?? 'ServerError:: Something went wrong';
    this.statusCode = 500;
    this.name = this.constructor.name;
  }
}

export class AuthenticationException extends Exception {
  constructor(message?: string) {
    super(message);
    this.statusCode = 401;
    this.message = message ?? 'Unauthorized:: Authentication failed';
  }
}

export class BadRequestException extends Exception {
  constructor(message?: string | object) {
    if (typeof message === 'object') message = JSON.stringify(message);
    super(message);
    this.statusCode = 400;
    this.message = message ?? 'BadRequest:: Invalid request payload';
  }
}

export class ConflictException extends Exception {
  constructor(message?: string) {
    super(message);
    this.statusCode = 409;
    this.message = message ?? 'Conflict:: Customer already exists.';
  }
}

export class ForbiddenException extends Exception {
  constructor(message?: string) {
    super(message);
    this.statusCode = 403;
    this.message = message ?? 'Forbidden:: Unauthorized';
  }
}

export class NotFoundException extends Exception {
  constructor(message?: string) {
    super(message);
    this.statusCode = 404;
    this.message = message ?? 'NotFound:: User not found';
  }
}
