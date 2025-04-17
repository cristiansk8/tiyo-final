import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export interface ScanChartData {
  date: string;
  [qrName: string]: number | string;
}

export async function getScansByUser(email: string) {
  try {
    // Obtener todos los datos en 1 sola query
    const userWithQrs = await prisma.user.findUnique({
      where: { email },
      include: {
        qr: {
          include: {
            scans: {
              select: {
                scannedAt: true
              }
            }
          }
        }
      }
    });

    if (!userWithQrs) throw new Error("User not found");
    return userWithQrs
  } catch (error) {
    console.error("Error in getScansByUser:", error);
    throw new Error("Error fetching all scans");
  }
}