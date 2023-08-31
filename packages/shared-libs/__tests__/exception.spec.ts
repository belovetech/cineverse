import { expect, describe, it } from 'vitest';
import {
  Exception,
  NotFoundException,
  AuthenticationException,
  BadRequestException,
  ConflictException,
  ForbiddenException,
} from '../src/index';

describe('#Exception', () => {
  describe('#BaseException', () => {
    it('should return default message if no message is passed', () => {
      const exception = new Exception();
      expect(exception.message).toBe('ServerError:: Something went wrong');
      expect(exception.statusCode).toBe(500);
      expect(exception.name).toBe('Exception');
    });

    it('should return the correct message if message is passed', () => {
      const exception = new Exception('Internal Server Error');
      expect(exception.message).toBe('Internal Server Error');
      expect(exception.statusCode).toBe(500);
      expect(exception.name).toBe('Exception');
    });
  });

  describe('#NotFoundException', () => {
    it('should return default message if no message is passed', () => {
      const exception = new NotFoundException();
      expect(exception.message).toBe('NotFound:: User not found');
      expect(exception.statusCode).toBe(404);
      expect(exception.name).toBe('NotFoundException');
    });

    it('should return the correct message if message is passed', () => {
      const exception = new NotFoundException('Customer not found');
      expect(exception.message).toBe('Customer not found');
      expect(exception.statusCode).toBe(404);
      expect(exception.name).toBe('NotFoundException');
    });
  });

  describe('#AuthenticationException', () => {
    it('should return default message if no message is passed', () => {
      const exception = new AuthenticationException();
      expect(exception.message).toBe('Unauthorized:: Authentication failed');
      expect(exception.statusCode).toBe(401);
      expect(exception.name).toBe('AuthenticationException');
    });

    it('should return the correct message if message is passed', () => {
      const exception = new AuthenticationException('Invalid credentials');
      expect(exception.message).toBe('Invalid credentials');
      expect(exception.statusCode).toBe(401);
      expect(exception.name).toBe('AuthenticationException');
    });
  });

  describe('#BadRequestException', () => {
    it('should return default message if no message is passed', () => {
      const exception = new BadRequestException();
      expect(exception.message).toBe('BadRequest:: Invalid request payload');
      expect(exception.statusCode).toBe(400);
      expect(exception.name).toBe('BadRequestException');
    });

    it('should return the correct message if message is passed', () => {
      const exception = new BadRequestException({
        error: 'Invalid request payload',
      });
      expect(exception.message).toBe('{"error":"Invalid request payload"}');
      expect(exception.statusCode).toBe(400);
      expect(exception.name).toBe('BadRequestException');
    });
  });

  describe('#ConflictException', () => {
    it('should return default message if no message is passed', () => {
      const exception = new ConflictException();
      expect(exception.message).toBe('Conflict:: Customer already exists.');
      expect(exception.statusCode).toBe(409);
      expect(exception.name).toBe('ConflictException');
    });

    it('should return the correct message if message is passed', () => {
      const exception = new ConflictException('Customer already exists.');
      expect(exception.message).toBe('Customer already exists.');
      expect(exception.statusCode).toBe(409);
      expect(exception.name).toBe('ConflictException');
    });
  });

  describe('#ForbiddenException', () => {
    it('should return default message if no message is passed', () => {
      const exception = new ForbiddenException();
      expect(exception.message).toBe('Forbidden:: Unauthorized');
      expect(exception.statusCode).toBe(403);
      expect(exception.name).toBe('ForbiddenException');
    });
    it('should return the correct message if message is passed', () => {
      const exception = new ForbiddenException('Unauthorized');
      expect(exception.message).toBe('Unauthorized');
      expect(exception.statusCode).toBe(403);
      expect(exception.name).toBe('ForbiddenException');
    });
  });
});
