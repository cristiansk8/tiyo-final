// src/app/api/graphics/scans-by-qr-and-day/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Obtener todos los escaneos con la información del QR relacionado
    const scans = await prisma.scan.findMany({
      include: {
        qr: true, // Incluir la información del QR relacionado
      },
    });

    // Agrupar escaneos por día y por código QR
    const scansByDayAndQr: { [key: string]: { [key: string]: number } } = {};

    scans.forEach((scan) => {
      const date = new Date(scan.scannedAt).toISOString().split("T")[0]; // Formato YYYY-MM-DD
      const qrName = scan.qr.name; // Nombre del código QR

      if (!scansByDayAndQr[date]) {
        scansByDayAndQr[date] = {};
      }

      if (!scansByDayAndQr[date][qrName]) {
        scansByDayAndQr[date][qrName] = 0;
      }

      scansByDayAndQr[date][qrName]++;
    });

    // Convertir el objeto a un array para el gráfico
    const chartData = Object.keys(scansByDayAndQr).map((date) => ({
      date, // Fecha
      ...scansByDayAndQr[date], // Número de escaneos por código QR
    }));

    // Ordenar los datos por fecha
    chartData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

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