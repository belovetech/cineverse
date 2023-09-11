import { Ticket } from '@models';
import { CreateTicketDto } from '@dto';

export class TicketRepository {
  public async create(payment: CreateTicketDto): Promise<Ticket> {
    return await Ticket.create(payment);
  }
}
