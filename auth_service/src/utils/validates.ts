import { ValidationError } from '@/exceptions/exception';

const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

export function validateCustomerInput(requestBody) {
  const { firstName, lastName, email, password, passwordConfirm } = requestBody;
  const errorMessages = [];

  if (!firstName || typeof firstName != 'string' || firstName.length < 3) {
    errorMessages.push({ firstName: 'FirstName cannot be less than three characters' });
  }
  if (!lastName || typeof lastName != 'string' || lastName.length < 3) {
    errorMessages.push({ lastName: 'LastName cannot be less than three characters' });
  }
  if (!emailRegex.test(email)) {
    errorMessages.push({ email: 'Invalid email address or not in right format' });
  }
  if (!password || typeof password != 'string' || password.length < 6) {
    errorMessages.push({ password: 'Password must be greater than six characters' });
  }
  if (passwordConfirm !== password) {
    errorMessages.push({ password: 'Passwords are not the same' });
  }

  if (errorMessages.length > 0) {
    throw new ValidationError(400, JSON.stringify(errorMessages));
  }
}
