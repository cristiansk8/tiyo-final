import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

export async function POST(req: NextRequest) {
    try {
        const { qrId } = await req.json();

        if (!qrId) {
            return NextResponse.json({ error: "Faltan datos (qrId)" }, { status: 400 });
        }

        // Obtener la IP desde los headers
        const forwarded = req.headers.get("x-forwarded-for");
        const ip = forwarded ? forwarded.split(",")[0].trim() : "Desconocida";

        // Registrar el escaneo en la base de datos
        const scan = await prisma.scan.create({
            data: {
                qrId,
                ip,
            },
        });

        return NextResponse.json({ message: "Escaneo registrado", scan });
    } catch (error) {
        console.error("Error registrando escaneo:", error);
        return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
    }
}
