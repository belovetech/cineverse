import { expect, describe } from 'vitest';
import Logger from '../src/logger';

describe.concurrent('#Logger', () => {
  describe('#loggerInstance', () => {
    it('logger should be defined', () => {
      const logger: Logger = new Logger();
      expect(logger).toBeDefined();
    });
  });

  describe('#createLogger', () => {
    it('should be defined', () => {
      const logger = new Logger().createLogger();
      expect(logger).toBeDefined();
    });
  });

  describe('#logFormat', () => {
    it('should return the correct log format', () => {
      const loggerInstance = new Logger();
      const logFormat = loggerInstance['logFormat']();
      expect(
        logFormat['_isFormatInstance'],
        'Expected logFormat to be a Format instance'
      );
    });
  });

  describe('#getTransports', () => {
    it('should return an array of transports', () => {
      const loggerInstance = new Logger();
      const transports = loggerInstance['getTransports']();
      expect(
        Array.isArray(transports),
        'Expected getTransports to return an array'
      );
      expect(
        transports.length > 0,
        'Expected at least one transport in the array'
      );
    });
  });
});
