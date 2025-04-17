import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// Función para manejar solicitudes GET
export async function GET() {
  try {
    // Obtener los datos de la base de datos
    const qrCodes = await prisma.qr.findMany({
      
      include: {
        scans: true, // Incluir los escaneos relacionados
      },
    });

    // Procesar los datos para el gráfico
    const chartData = qrCodes.map((qr) => ({
      name: qr.description, // Nombre del QR
      scans: qr.scans.length, // Número de escaneos
    }));

    // Devolver los datos como respuesta JSON
    return NextResponse.json(chartData, { status: 200 });
  } catch (error) {
    console.error("Error al obtener las estadísticas:", error);
    return NextResponse.json(
      { error: "Error al obtener las estadísticas" },
      { status: 500 }
    );
  }
}