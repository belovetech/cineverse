import { expect, describe, it, beforeAll } from 'vitest';
import { MessageQueue } from '../src';

describe('#MessageQueue', () => {
  let messageQueue;
  beforeAll(() => {
    messageQueue = new MessageQueue('amqp://localhost');
    messageQueue.bindExchangeWithQueue('Booking-Ticket', 'Booking');
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

  describe('get message', async () => {
    it('should get message', async () => {
      const message = await messageQueue.getMessage();
      expect(message).toEqual({ bookingId: '123', payment: 123.1 });
    });
  });
});
