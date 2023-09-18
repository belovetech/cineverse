import { expect, describe, it, beforeAll } from 'vitest';
import { MessageQueue } from '../src';

describe('#MessageQueue', () => {
  let messageQueue;
  beforeAll(() => {
    messageQueue = new MessageQueue('amqp://localhost');
    messageQueue.bindExchangeWithQueue('Booking-Exchange', 'Booking-Queue');
  });

  describe('send message', async () => {
    it('should send message', async () => {
      const res = await messageQueue.sendMessage({
        bookingId: '123',
        payment: 123.1,
      });
      expect(res).toBe(true);
    });
  });

  describe('send message with 3 retries', async () => {
    it('should send message 3 times', async () => {
      const MAX_RETRIES = 3;
      const res = await messageQueue.sendMessageWithRetry(
        {
          bookingId: '123',
          payment: 123.1,
        },
        MAX_RETRIES
      );
      expect(res).toBe('DONE');
    });

    describe('get message', async () => {
      it('should get message', async () => {
        const message = await messageQueue.getMessage();
        expect(message).toEqual({ bookingId: '123', payment: 123.1 });
      });
    });
  });
});
