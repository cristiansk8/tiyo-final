"use server";

import prisma from "@/app/lib/prisma";

export async function updateQR(idQR: number, cont: string, qrCode?: string) {
  try {
    if (!idQR || !cont || !qrCode) {
      throw new Error("El nombre y el email son obligatorios");
    }

    const updateQR = await prisma.qr.update({
      where: {
        id: idQR,
      },
      data: {
        cont,
        qrCode,
      },
    });

    return { success: true, qr: updateQR };
  } catch (error) {
    console.error("Error al crear el QR:", error);
    return { success: false, error: "Error interno del servidor" };
  }
}
