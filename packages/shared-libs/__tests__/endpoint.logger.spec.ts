import express, { Application } from 'express';
import { describe, expect, vi, it } from 'vitest';
import { logger } from '../src/index';
import {
  getEndPoints,
  concatMethods,
  longestLength,
  getlongestPath,
  EndpointAttributes,
  printEndpoints,
} from '../src/print.endpoints';

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

  app.listen(8888, () => console.log('Server is running... 8888'));
  const endpoints = getEndPoints(app);

  describe('#getEndPoints', () => {
    it('should return an array of endpoints', () => {
      expect(endpoints).toEqual([
        {
          path: '/test',
          methods: ['GET', 'POST'],
          middlewares: ['anonymous'],
        },
        {
          path: '/test/id',
          methods: ['POST'],
          middlewares: ['anonymous'],
        },
      ]);
    });
  });

  describe('#concatMethods', () => {
    it('should return a 2d array of methods', () => {
      const methods = concatMethods(endpoints as EndpointAttributes[]);
      expect(methods).toStrictEqual([['GET', 'POST'], ['POST']]);
    });
  });

  describe('#longestLength', () => {
    it('should return the longest length of methods', () => {
      const methods = concatMethods(endpoints as EndpointAttributes[]);
      const [longestmethodString, itemNumber] = longestLength(methods);
      expect(longestmethodString).toEqual(7);
      expect(itemNumber).toEqual(2);
    });
  });

  describe('#getlongestPath', () => {
    it('should return the longest length of path', () => {
      const longestPath = getlongestPath(endpoints);
      expect(longestPath).toEqual(8);
    });
  });

  describe('#printEndpoints', () => {
    const infoSpy = vi.spyOn(logger, 'info');
    const warnSpy = vi.spyOn(logger, 'warn');

    it('should print the endpoints', () => {
      printEndpoints(app);
      expect(infoSpy).toHaveBeenCalledTimes(5);
      expect(warnSpy).toHaveBeenCalledTimes(1);
    });
  });
});
