export class Exception extends Error {
  public statusCode: number;
  public message: string;
  public name: string;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends Exception {
  constructor(statusCode: number, message: string) {
    super(statusCode, message);
  }
}

export class NotFoundError extends Exception {
  constructor(statusCode: number, message: string) {
    super(statusCode, message);
  }
}

export class InvalidCredentialsError extends Exception {
  constructor(statusCode: number, message: string) {
    super(statusCode, message);
  }
}

export class BadRequestError extends Exception {
  constructor(statusCode: number, message: string) {
    super(statusCode, message);
  }
}

export class AuthenticationError extends Exception {
  constructor(statusCode: number, message?: string) {
    super(statusCode, message);
    this.statusCode = 401;
    this.message = 'Unauthorized:: Authentication failed';
  }
}

export class ForbiddenError extends Exception {
  constructor(statusCode?: number, message?: string) {
    super(statusCode, message);
    this.statusCode = 403;
    this.message = 'Forbidden:: Unauthorized';
  }
}

export class InternalServerError extends Exception {
  constructor(statusCode?: number, message?: string) {
    super(statusCode, message);
    this.statusCode = 500;
    this.message = 'Internal Server Error';
  }
}
