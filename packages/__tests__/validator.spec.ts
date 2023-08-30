import { expect, describe, it } from 'vitest';
import { v4 as uuidv4 } from 'uuid';
import { BadRequestException } from '../src/index';
import Validator from '../src/validator';

describe('#Validator', () => {
  describe('#isValidKey', () => {
    it('should return true for valid key', () => {
      const payload = { key1: 'value1', key2: 'value2' };
      const validatorInstance = new Validator(payload);
      const result = validatorInstance['isValidKey']('key1');
      expect(result).toBe(true);
    });

    it('should return false for invalid key', () => {
      const payload = { key1: 'value1', key2: 'value2' };
      const validatorInstance = new Validator(payload);
      const result = validatorInstance['isValidKey']('key3');
      expect(result).toBe(false);
    });
  });

  describe('#ValidateString', () => {
    it('should not add error for valid string', () => {
      const payload = { name: 'name' };
      const validatorInstance = new Validator(payload);
      validatorInstance['validateString']('name', 'string');
      expect(validatorInstance.errorCounter).toBe(0);
    });

    it('should add error for invalid string', () => {
      const payload = { key: 'a' };
      const validatorInstance = new Validator(payload);
      validatorInstance['validateString']('key', 'a');
      expect(validatorInstance.errors).toEqual({
        key: 'Please provide a valid key',
      });
      expect(validatorInstance.errorCounter).toBe(1);
    });
  });

  describe('#ValidateNumber', () => {
    it('should not add error for valid number', () => {
      const payload = { age: 25 };
      const validatorInstance = new Validator(payload);
      validatorInstance['validateNumber']('age', 25);
      expect(validatorInstance.errorCounter).toBe(0);
    });

    it('should add error for invalid number', () => {
      const payload = { age: 25 };
      const validatorInstance = new Validator(payload);
      validatorInstance['validateNumber']('age', '25');
      expect(validatorInstance.errorCounter).toBe(1);
    });
  });

  describe('#ValidateEmail', () => {
    it('should not add error for valid email', () => {
      const payload = { email: 'test@gmail.com' };
      const validatorInstance = new Validator(payload);
      validatorInstance['validateEmail']('email', 'test@gmail.com');
      expect(validatorInstance.errorCounter).toBe(0);
    });

    it('should add error for invalid email', () => {
      const payload = { key: 'test.com' };
      const validatorInstance = new Validator(payload);
      validatorInstance['validateEmail']('key', 'test.com');
      expect(validatorInstance.errorCounter).toBe(1);
    });
  });

  describe('#ValidateUUIDv4', () => {
    it('should not add error for valid uuid', () => {
      const payload = { uuid: uuidv4() };
      const validatorInstance = new Validator(payload);
      validatorInstance['validateUUIDv4']('uuid', uuidv4());
      expect(validatorInstance.errorCounter).toBe(0);
    });

    it('should add error for invalid uuid', () => {
      const payload = { uuid: 'e89b-12d3-a456-426614174000' };
      const validatorInstance = new Validator(payload);
      validatorInstance['validateUUIDv4'](
        'uuid',
        'e89b-12d3-a456-426614174000'
      );
      expect(validatorInstance.errorCounter).toBe(1);
    });
  });

  describe('#addError', () => {
    it('addError should add an error', () => {
      const payload = { key: 'value' };
      const validatorInstance = new Validator(payload);
      validatorInstance['addError']({ customError: 'custom error' });
      expect(validatorInstance.errorCounter).toBe(1);
    });
  });

  describe('#printErrors', () => {
    it('should throw BadRequestException with correct message', () => {
      const validatorInstance = new Validator({});
      expect(() => validatorInstance['printErrors']()).toThrow(
        BadRequestException
      );
    });
  });
});
