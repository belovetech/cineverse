import { Ticket } from '@models';
import { CreateTicketDto } from '@dto';
import { validateDto } from '@utils/validator';
import { ticketRepository } from '@repositories';
import { BadRequestException } from '@cineverse/libs';

export class TicketService {
  async create(ticket: CreateTicketDto): Promise<Ticket> {
    const validationErrors = await validateDto(ticket, CreateTicketDto);
    if (validationErrors.length > 0) {
      throw new BadRequestException({ errors: validationErrors });
    }
    return await ticketRepository.create(ticket);
  }

  //   TODO: make decision based on the ticket type
}
