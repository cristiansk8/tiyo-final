import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export interface QrScanData {
  date: string;
  count: number;
}

export async function getScansBySingleQr(
  userEmail: string,
  qrId: number
): Promise<QrScanData[]> {
  try {
    // Verificar ownership y obtener scans en 1 query
    const qrWithScans = await prisma.qr.findFirst({
      where: {
        id: qrId,
        userEmail: userEmail
      },
      include: {
        scans: {
          select: {
            scannedAt: true
          },
          orderBy: {
            scannedAt: 'asc'
          }
        }
      }
    });

    if (!qrWithScans) throw new Error("QR not found or unauthorized");

    // Procesar datos
    const scansByDay = qrWithScans.scans.reduce((acc, scan) => {
      const date = new Date(scan.scannedAt).toISOString().split('T')[0];
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(scansByDay)
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  } catch (error) {
    console.error("Error in getScansBySingleQr:", error);
    throw new Error("Error fetching QR scans");
  }
}