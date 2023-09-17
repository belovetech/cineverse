import { BadRequestException, MessageQueue } from '@cineverse/libs';
import { Payment } from '../models/payment';

export default class PaymentService {
  constructor(
    private readonly model = Payment,
    private messageQueue = new MessageQueue('amqp://localhost'),
  ) {}

  async createPayment(): Promise<Payment> {
    try {
      const payment = (await this.messageQueue.getMessage()) as Payment;
      //   todo: validate payment payload
      return this.model.create(payment);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
