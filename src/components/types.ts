export interface QRWithScans {
  id: number; // o string, dependiendo de tu caso
  name: string;
  description: string;
  priority: string;
  createdAt: string;
  updatedAt: string;
  scanCount: number;
  cont: number;
  qrCode: string;
  userEmail: string;
}