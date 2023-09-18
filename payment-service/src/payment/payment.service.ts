import {
  BadRequestException,
  MessageQueue,
  validateDto,
  logger,
} from '@cineverse/libs';
import { Payment } from './payment.model';
import { CreatePaymentDto } from './payment.dto';

export default class PaymentService {
  constructor(private messageQueue = new MessageQueue('amqp://localhost')) {}

  async createPayment(): Promise<boolean> {
    try {
      this.messageQueue.bindExchangeWithQueue('booking-X', 'booking-queue');
      const message =
        (await this.messageQueue.getMessage()) as CreatePaymentDto;

      const payment = new Payment();
      if (message && message !== undefined) {
        payment.bookingId = message?.bookingId;
        payment.amount = Number(message.totalAmount);
        payment.status = 'COMPLETED';

        const validationErrors = await validateDto(message, CreatePaymentDto);
        if (validationErrors.length) {
          logger.error('PaymentValidationError', validationErrors);
          throw new BadRequestException(validationErrors);
        }

        const newPayament = await payment.save();

        await this.messageQueue.sendMessage({
          status: 'successful',
          data: newPayament.dataValues,
        });

        return true;
      }
      return false;
    } catch (error) {
      this.messageQueue.bindExchangeWithQueue('payment-X', 'payment-queue');
      await this.messageQueue.sendMessage({
        status: 'failed',
        data: {},
      });
      logger.error('MakePaymentFailed', error);
      throw new BadRequestException(error.message);
    }
  }
}
