import * as QRCode from 'qrcode';
import * as fs from 'fs';
import * as path from 'path';
import { logger } from '@cineverse/libs';

export interface QRCodeData {
  seatId: string;
  seatNumber: string;
  customerId?: string;
  qrcodeId: string;
  price: number;
}

let qrCodeImagePath: string;

export async function generateQRCode(
  ticketData: QRCodeData,
): Promise<[string, string]> {
  try {
    const qrDataUrl = await QRCode.toDataURL(JSON.stringify(ticketData));

    const relativePath = './src/ticket-qrcode';
    const absolutePath = path.resolve(relativePath);
    if (!fs.existsSync(absolutePath)) {
      fs.mkdirSync(absolutePath);
    }

    const fileName = `${ticketData.qrcodeId.slice(0, 3)}-${
      ticketData.seatNumber
    }`;
    const filePath = `${absolutePath}/${fileName}-ticket-qrcode.png`;
    qrCodeImagePath = `${filePath}`;

    await QRCode.toFile(qrCodeImagePath, JSON.stringify(ticketData));

    return [qrDataUrl, qrCodeImagePath];
  } catch (error) {
    logger.error('Error generating QR code:', error);
    throw error;
  }
}
