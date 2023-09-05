import express, { Application } from 'express';
import { describe, expect } from 'vitest';
import { EndpointLogger } from '../src/index';

describe('EndpointLogger', () => {
  const app: Application = express();

  app.get('/test', (req, res) => {
    res.send('test');
  });

  app.post('/test', (req, res) => {
    res.send('test');
  });

  app.post('/test/id', (req, res) => {
    res.send('test');
  });

  app.listen(8888, () => console.log('Server is running...'));

  
  const endpointLogger = new EndpointLogger(app);
  const endpoints = endpointLogger.endpoints;

  const methods2dArray = endpointLogger.concatMethods(endpoints);
  const stringLengthAndItemLength =
    endpointLogger.longestMethodStringLengthAndItemLength(methods2dArray);

  describe('EndpointLogger methods', () => {
    it('#concatMethods', () => {
      expect(methods2dArray).toStrictEqual([['GET', 'POST'], ['POST']]);
    });

    it('#longestMethodStringLengthAndItemLength', () => {
      expect(stringLengthAndItemLength).toStrictEqual([7, 2]);
    });

    it('#longPath', () => {
      expect(endpointLogger.getlongestPath()).toBe(8);
    });
  });

  describe('EndpointLogger log', () => {
    it('should log the endpoints', () => {
      expect(endpoints[0].path).toBe('/test');
      expect(endpoints[0].methods[0]).toBe('GET');
    });
  });
});
