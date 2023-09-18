import {
  BadRequestException,
  MessageQueue,
  validateDto,
} from '@cineverse/libs';
import { Payment } from './payment.model';
import { CreatePaymentDto } from './payment.dto';

export default class PaymentService {
  constructor(private messageQueue = new MessageQueue('amqp://localhost')) {}

  async createPayment(): Promise<Payment | false> {
    try {
      // this.messageQueue.bindExchangeWithQueue('Booking-Ticket', 'Booking');
      // const message =
      //   (await this.messageQueue.getMessage()) as CreatePaymentDto;

      const message = {
        bookingId: 'assd',
        totalAmount: 1234.5,
        status: 'COMPLETED',
      };

      const payment = new Payment();

      if (message || message !== undefined) {
        payment.bookingId = message.bookingId;
        payment.amount = Number(message.totalAmount);
        payment.status = 'COMPLETED';

        const validationErrors = await validateDto(
          payment.dataValues,
          CreatePaymentDto,
        );
        if (validationErrors.length) {
          throw new BadRequestException(validationErrors);
        }
        const newPayament = await payment.save();
        await this.messageQueue.sendMessage(newPayament);
        return newPayament;
      }
      return false;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
