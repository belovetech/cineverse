import { expect, describe, it, beforeAll, afterAll } from 'vitest';
import { MessageQueue } from '../src';

describe(
  'MessageQueue',
  () => {
    let messageQueue: MessageQueue;

    beforeAll(async () => {
      messageQueue = new MessageQueue('amqp://localhost');
    });

    afterAll(() => {
      messageQueue.closeConnection();
    });

    it('should bind exchange with queue', async () => {
      await messageQueue.bindExchangeWithQueue('Booking-Ticket', 'Booking');
      expect(messageQueue.queue).toBeDefined();
      expect(messageQueue.exchange).toBeDefined();
    });

    it('should send and receive message', async () => {
      const message = { data: 'hello world' };
      await messageQueue.sendMessage(message);
      const receivedMessage = await messageQueue.getMessage();
      expect(receivedMessage).toEqual(message);
    });

    it('should send message with retry', async () => {
      const message = { data: 'hello world' };
      const result = await messageQueue.sendMessageWithRetry(message, 3);
      expect(result).toEqual('DONE');
    });
  },
  { timeout: 20000 }
);
