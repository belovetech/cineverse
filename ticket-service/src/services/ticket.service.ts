import { v4 as uuidv4 } from 'uuid';
import { Ticket } from '@models';
import { CreateTicketDto } from '@dtos';
import { ticketRepository } from '@repositories';
import { BadRequestException, validateDto } from '@cineverse/libs';
import { Seat } from './seat.utils';
import { generateQRCode } from '@utils/generateQRcode';

export class TicketService {
  async createTicket(ticket: CreateTicketDto): Promise<Ticket> {
    const validationErrors = await validateDto(ticket, CreateTicketDto);
    if (validationErrors.length > 0) {
      throw new BadRequestException({ errors: validationErrors });
    }
    return await ticketRepository.create(ticket);
  }

  async delete(ticketId: string): Promise<void> {
    await ticketRepository.delete(ticketId);
  }

  async getTicket(ticketId: string): Promise<Ticket> {
    return await ticketRepository.findByPk(ticketId);
  }

  async updateTicket(
    tickeId: string,
    ticket: Partial<Ticket>,
  ): Promise<Ticket> {
    return await ticketRepository.update(tickeId, ticket);
  }

  async generateTickets(bookingId: string, seats: Seat[]) {
    for (const seat of seats) {
      const priceToDecimal = (price) => Number(price?.toFixed(2));
      const ticket = await this.createTicket({
        bookingId: bookingId,
        seatNumber: seat.seatNumber,
        price: priceToDecimal(seat.price),
      } as CreateTicketDto);
      this.updateTicket(ticket.ticketId, {
        QRCode: await this.generateQRCode(seat),
      });
    }
  }

  async deleteGeneratedTickets(bookingId: string) {
    await ticketRepository.deleteMany(bookingId);
  }

  public async generateQRCode(seat: Seat): Promise<string> {
    const [QRCode, QRImagePath] = await generateQRCode({
      qrcodeId: uuidv4(),
      seatId: seat.seatId,
      seatNumber: seat.seatNumber,
      price: seat.price,
    });
    const QRText = `QRCode: ${QRCode} \n QRImagePath: ${QRImagePath}`;
    return QRText;
  }

  //   TODO: make decision based on the ticket type
}
