import { Ticket } from '@models';
import { CreateTicketDto } from '@dto';

export class TicketRepository {
  public async create(payment: CreateTicketDto): Promise<Ticket> {
    return await Ticket.create(payment);
  }

  public async findByPk(ticketId: string): Promise<Ticket | null> {
    return await Ticket.findByPk(ticketId);
  }

  public async update(
    ticketId: string,
    options: Partial<Ticket>,
  ): Promise<Ticket> {
    Ticket.update({ ...options }, { where: { ticketId } });
    return await this.findByPk(ticketId);
  }

  public async delete(ticketId: string): Promise<void> {
    await Ticket.destroy({ where: { ticketId } });
  }

  public async deleteMany(bookingId: string) {
    await Ticket.destroy({ where: { bookingId } });
  }
}
