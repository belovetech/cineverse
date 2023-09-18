import * as Amqp from 'amqp-ts';
import { logger } from './logger';

/**
 * Amqp utility class
 *
 * Usage
 * const amqpUtil = new AmqpUtil('amqp://localhost');
 * await amqpUtil.bindExchangeWithQueue('Booking-Ticket', 'Booking');
 * amqpUtil.sendMessage({data: "hello world"})
 * const message = await amqpUtil.getMessage();
 * console.log('Received Message:', message);
 */

export default class MessageQueue {
  private url: string;
  public readonly connection: Amqp.Connection;
  private queue: Amqp.Queue;
  private exchange: Amqp.Exchange;
  private MAX_RETRIES = 5;

  constructor(url: string) {
    this.url = url;
    this.connection = new Amqp.Connection(url);
  }

  private declareExchange(exchangeName: string) {
    return this.connection.declareExchange(exchangeName);
  }

  private declareQueue(queueName: string) {
    return this.connection.declareQueue(queueName, { durable: true });
  }

  public async bindExchangeWithQueue(exchangeName: string, queueName: string) {
    try {
      this.queue = this.declareQueue(queueName);
      this.exchange = this.declareExchange(exchangeName);
      await this.queue.bind(this.exchange);
    } catch (error) {
      logger.error('Error binding exchange and queue:', error);
    }
  }

  public async sendMessage(message: unknown): Promise<boolean> {
    try {
      await this.connection.completeConfiguration().then(async () => {
        const msg = new Amqp.Message(message, { deliveryMode: 2 });
        await this.exchange.send(msg);
        logger.info('[x]: message sent');
      });
      return true;
    } catch (error) {
      logger.error('Error sending message:', error);
      return false;
    }
  }

  async sendMessageWithRetry(
    message: unknown,
    maxRetries?: number
  ): Promise<string> {
    let retryCount = 0;

    async function trySending(): Promise<boolean | undefined> {
      try {
        const msg = new Amqp.Message(message, { deliveryMode: 2 });
        await this.exchange.send(msg);
        logger.info('[x]: message sent');
        return true;
      } catch (error) {
        if (retryCount < (maxRetries ?? this.MAX_RETRIES)) {
          logger.error(
            `Message sending failed. Retrying... [${retryCount + 1}]`
          );
          retryCount++;
          setTimeout(trySending, 1000);
        } else {
          logger.error('Max retries reached. Message could not be sent.');
          return false;
        }
      } finally {
        logger.info('send Message With Retry completed.');
      }
    }

    trySending();
    return 'DONE';
  }

  public async getMessage(): Promise<unknown> {
    return new Promise(async (resolve, reject) => {
      try {
        await this.queue.activateConsumer((message) => {
          const content = message.getContent();
          message.ack();
          logger.info('[x]: message received', content);
          resolve(content);
        });
      } catch (error) {
        logger.error('Error getting message:', error);
        reject(error);
      }
    });
  }

  public closeConnection() {
    setTimeout(() => {
      this.connection.close();
    }, 500);
  }
}
