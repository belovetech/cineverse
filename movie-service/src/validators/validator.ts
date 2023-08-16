import { ValidationException } from '@cineverse/exceptions';

const KEYS = ['title', 'genre', 'description', 'duration'];

export default abstract class Validator<T> {
  protected payload: T;
  protected errors: object;
  protected errorCounter: number;

  constructor(payload: T) {
    this.payload = payload;
    this.errors = {};
  }

  protected isValidKey(key: keyof T): boolean {
    return Object.keys(this.payload).includes(key as string);
  }

  protected printErrors(): void {
    const message = { message: `You have (${this.errorCounter}) errors to fix`, errors: { ...this.errors } };
    throw new ValidationException(JSON.stringify(message));
  }

  protected validateString(key: keyof T, value: string): void {
    if (!value || typeof value !== 'string' || value.trim().length < 3) {
      this.addError({ [key]: `Please provide a valid ${[key]}` });
    }
  }

  protected validateNumber(key: keyof T, value: number): void {
    if (!value || typeof value !== 'number' || isNaN(value)) {
      this.addError({ [key]: `Please provide a valid ${[key]}` });
    }
  }

  protected validateEmail(key: keyof T, value: string): void {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (typeof value !== 'string' || !emailRegex.test(value)) {
      this.addError({ [key]: `Please provide a valid ${[key]}` });
    }
  }

  protected validateUnknownType(): void {
    for (const key in this.payload) {
      if (!KEYS.includes(key)) {
        this.addError({ [key]: `${[key]} is not part of the required data` });
      }
    }
  }

  protected addError(error: Record<string, string>): void {
    this.errors = { ...this.errors, ...error };
    this.errorCounter = Object.keys(this.errors).length;
  }

  abstract validate(data: T): void;
}
