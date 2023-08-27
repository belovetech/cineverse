import { expect, it } from 'vitest';
import Logger from '../src/logger';

describe('logger', () => {
  let logger: Logger;
  before(() => {
    logger = new Logger();
  });

  it('should be defined', () => {
    expect(logger).toBeDefined();
  });
});
