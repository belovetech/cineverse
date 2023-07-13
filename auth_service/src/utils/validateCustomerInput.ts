import { ValidationException } from '@exceptions';

const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

interface IType {
  string?: string;
  number?: number;
  email?: string;
  phone?: number;
}

interface IData {
  data: any;
  type: IType;
}

export interface I {
  firstName: IData;
  lastName: IData;
  email: IData;
  password: IData;
  passwordConfirm: IData;
}

export class Validator<T> {
  private payload: T;
  private validates: Array<Object>;
  private errorCounter = 0;

  constructor(payload: T) {
    this.payload = payload;
    this.validates = [];
  }

  private isValidKey(key: any) {
    return Object.keys(this.payload).includes(key);
  }

  private printErrors(validates: object) {
    const message = { message: `You have (${this.errorCounter}) fix`, errors: validates };
    throw new ValidationException(JSON.stringify(message));
  }

  private validateString(key: string, value: string) {
    if (!value || value.trim().length < 3 || typeof value !== 'string') {
      this.validates.push({ [key]: `Please provide a valid string` });
      this.errorCounter += 1;
    }
  }

  private validateNumber(key: string, value: number) {
    if (!value || typeof value !== 'number' || isNaN(value)) {
      this.validates.push({ [key]: `Please provide a valid number [0-9]` });
      this.errorCounter += 1;
    }
  }

  private validateEmail(key: string, value: string) {
    if (!value || !emailRegex.test(value)) {
      this.validates.push({ [key]: `Please provide a valid email` });
      this.errorCounter += 1;
    }
  }

  private validateUnknownType(key: string) {
    this.validates.push({ [key]: `Please provide a required data` });
    this.errorCounter += 1;
  }

  public validate(data: object) {
    for (let key in data) {
      if (data[key] === 'string' && this.isValidKey(key)) {
        this.validateString(key, this.payload[key]);
      } else if (data[key] === 'number' && this.isValidKey(key)) {
        this.validateNumber(key, this.payload[key]);
      } else if (data[key] === 'email' && this.isValidKey(key)) {
        this.validateEmail(key, this.payload[key]);
      } else {
        this.validateUnknownType(this.payload[key]);
      }
    }
    this.printErrors(this.validates);
  }
}

export function validatePayload(requestBody) {
  const { firstName, lastName, email, password, passwordConfirm } = requestBody;
  const errorMessages = [];

  if (!firstName || typeof firstName != 'string' || firstName.length < 3) {
    errorMessages.push({ firstName: 'FirstName should be at least three characters' });
  }
  if (!lastName || typeof lastName != 'string' || lastName.length < 3) {
    errorMessages.push({ lastName: 'LastName should be at least three characters' });
  }
  if (!emailRegex.test(email)) {
    errorMessages.push({ email: 'Invalid email address or not in right format' });
  }
  if (!password || typeof password != 'string' || password.length < 6) {
    errorMessages.push({ password: 'Password should be at least six characters' });
  }
  if (passwordConfirm !== password) {
    errorMessages.push({ password: 'Passwords are not the same' });
  }

  if (errorMessages.length > 0) {
    throw new ValidationException(JSON.stringify(errorMessages));
  }
}
