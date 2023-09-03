import { describe, expect, it, beforeAll, afterAll } from 'vitest';
import { RedisClient } from '../src/index';

describe.sequential('#redisClient', () => {
  let cache: RedisClient;
  beforeAll(async () => {
    cache = new RedisClient({
      host: 'localhost',
      port: 6379,
    });

    await cache.connect();
  });

  describe('#redisClientInstance', () => {
    it('redisClient should be defined', () => {
      expect(cache).toBeDefined();
    });
  });

  describe('#redisAlive', () => {
    it('should return true', () => {
      expect(cache.isAlive()).toBe(true);
    });
  });

  describe('#redisSet', () => {
    it('should set key and value', async () => {
      await cache.set('name', 'Abeeb Raheem', 100);
      expect(await cache.get('name')).toBe('Abeeb Raheem');
    });
  });

  describe('#redisGet', () => {
    it('should get key and value', async () => {
      expect(await cache.get('name')).toBe('Abeeb Raheem');
    });
  });

  describe('#redisDel', () => {
    it('should delete key and value', async () => {
      await cache.del('name');
      expect(await cache.get('name')).toBe(null);
    });
  });

  afterAll(async () => {
    await cache.disconnect();
  });
});
