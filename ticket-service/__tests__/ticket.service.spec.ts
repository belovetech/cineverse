import { describe, it, expect, beforeAll } from 'vitest';
import { TicketService } from '../src/services/ticket.service';

describe('TicketService', () => {
  let ticketService: TicketService;
  beforeAll(() => {
    ticketService = new TicketService();
  });

  describe('createTicket', () => {
    it('should throw an error if ticket is not valid', async () => {
      try {
        await ticketService.createTicket({
          bookingId: 'bookingId',
          price: 10,
        } as unknown);
      } catch (error) {
        expect(error.message).toBe('seatNumber must be a string');
      }
    });

    it('should create a ticket', async () => {
      const ticket = await createTickect(ticketService);
      expect(ticket).toBeDefined();
      expect(ticket.bookingId).toBe('bookingId');
      expect(ticket.price).toBe(10);
      expect(ticket.seatNumber).toBe('A1');
    });
  });

  describe('delete', () => {
    it('should delete a ticket', async () => {
      const ticket = await createTickect(ticketService);
      await ticketService.delete(ticket.ticketId);
      const deletedTicket = await ticketService.getTicket(ticket.ticketId);
      expect(deletedTicket).toBeUndefined();
    });
  });

  describe('getTicket', () => {
    it('should get a ticket', async () => {
      const ticket = await createTickect(ticketService);
      const foundTicket = await ticketService.getTicket(ticket.ticketId);
      expect(foundTicket).toBeDefined();
      expect(foundTicket.bookingId).toBe('bookingId');
      expect(foundTicket.price).toBe(10);
      expect(foundTicket.seatNumber).toBe('A1');
    });
  });

  describe('updateTicket', () => {
    it('should update a ticket', async () => {
      const ticket = await createTickect(ticketService);
      const updatedTicket = await ticketService.updateTicket(ticket.ticketId, {
        price: 20,
      });
      expect(updatedTicket).toBeDefined();
      expect(updatedTicket.bookingId).toBe('bookingId');
      expect(updatedTicket.price).toBe(20);
      expect(updatedTicket.seatNumber).toBe('A1');
    });
  });

  describe('generateQRCode', () => {
    it('should generate a QRCode', async () => {
      const QRCodeText = await ticketService.generateQRCode({
        seatId: 'seatId',
        seatNumber: 'A1',
        price: 10,
        seatType: 'regular',
        status: 'available',
      });
      const QRCode = QRCodeText.split('\n')[0].split(':')[1].trim();
      const QRImagePath = QRCodeText.split('\n')[1].split(':')[1].trim();
      expect(QRCodeText).toBeDefined();
      expect(QRCode).toEqual('QRCode');
      expect(QRImagePath).toEqual('QRImagePath');
    });
  });
});

const createTickect = async (ticketService: TicketService) => {
  return await ticketService.createTicket({
    bookingId: 'bookingId',
    price: 10,
    seatNumber: 'A1',
  });
};
