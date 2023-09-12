import { describe, expect, it } from 'vitest';
import { generateToken, verifyToken } from '../src/';

describe('#Authentication', () => {
  let token: string;

  describe('generateToken', () => {
    it('should return a token', () => {
      token = generateToken({ username: 'test' }, 'secret');
      expect(token).toBeDefined();
    });
  });

  describe('verifyToken', () => {
    it('should return a payload', async () => {
      const payload = await verifyToken(token, 'secret');
      expect(payload.exp).toBeDefined();
      expect(payload.iat).toBeDefined();
      expect(payload.username).toEqual('test');
    });
  });
});
