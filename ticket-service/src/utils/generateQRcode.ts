import * as QRCode from 'qrcode';
import * as fs from 'fs';
import * as path from 'path';
import { logger } from '@cineverse/libs';

export interface QRCodeData {
  bookingId: string;
  seatNumber: string;
  customerId?: string;
  ticketId?: number;
  price: number;
}

let qrCodeImagePath: string;

export async function generateQRCode(ticketData: QRCodeData): Promise<string> {
  try {
    const qrDataUrl = await QRCode.toDataURL(JSON.stringify(ticketData));

    const relativePath = '../ticket-qrcode';
    const absolutePath = path.resolve(relativePath);
    if (!fs.existsSync(absolutePath)) {
      fs.mkdirSync(absolutePath);
    }

    const fileName = `${ticketData.bookingId.slice(0, 3)}-${
      ticketData.seatNumber
    }`;
    const filePath = `${absolutePath}/${fileName}-ticket-qrcode.png`;
    qrCodeImagePath = `${filePath}`;

    await QRCode.toFile(qrCodeImagePath, JSON.stringify(ticketData));

    return qrDataUrl;
  } catch (error) {
    logger.error('Error generating QR code:', error);
    throw error;
  }
}
