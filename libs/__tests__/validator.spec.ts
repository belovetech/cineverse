import { assert, expect } from 'vitest';
import { BadRequestException } from '../src/index';
import { TheaterDataValidator, Theater } from './index';
import Validator from '../src/validator';
import exp from 'constants';

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

  describe('#printErrors', () => {
    it('should throw BadRequestException with correct message', () => {
      const validatorInstance = new Validator({});
      expect(() => validatorInstance['printErrors']()).toThrow(
        BadRequestException
      );
    });
  });

  describe('#ValidateString', () => {
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
    it('should add error for invalid number', () => {
      const payload = { key: 123 };
      const validatorInstance = new Validator(payload);
      validatorInstance['validateNumber']('key', '123');
      expect(Object.keys(validatorInstance.errors).length).toEqual(1);
    });
  });
  describe('#addError', () => {
    it('addError should add an error', () => {
      const payload = { key: 'value' };
      const validatorInstance = new Validator(payload);
      validatorInstance['addError']({ customError: 'custom error' });
      expect(Object.keys(validatorInstance.errors).length).toEqual(1);
    });
  });

  describe('#TheaterDataValidator', () => {
    const theaterData: Theater = {
      name: 'Theater 1',
      location: 'Location 1',
      seatingCapacity: 100,
    };

    it('should return no errors', () => {
      const validator = new TheaterDataValidator(theaterData);
      validator.validate();
      expect(validator.errorCounter).toBe(0);
      expect(validator.payload).toEqual(theaterData);
      expect(validator.errors).toEqual({});
    });

    it('should return 3 errors', () => {
      let validator = new TheaterDataValidator({} as any);
      try {
        validator.validate();
      } catch (error) {
        const { message, errors } = JSON.parse(error.message);
        expect(message).toBe('You have (3) errors to fix');
        expect(Object.keys(errors).length).toBe(3);
      }
    });

    it('should throw BadRequestException', () => {
      const validator = new TheaterDataValidator({} as any);
      expect(() => validator.validate()).toThrow(BadRequestException);
    });
  });
});
