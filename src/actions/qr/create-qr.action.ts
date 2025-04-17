"use server";

import prisma from "@/app/lib/prisma";

export async function createQR(name: string, description: string | null, userEmail: string, hash: string, cont: string, qrCode: string) {
  try {
    if (!name || !userEmail) {
      throw new Error("Name and email are required");
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: userEmail },
    });

    if (!existingUser) {
      throw new Error("User does not exist");
    }

    const existingQR = await prisma.qr.findUnique({
      where: { hash },
    });

    if (existingQR) {
      throw new Error("QR with this hash already exists");
    }

    const descriptionValue = description || "No description provided";

    // Crear el QR en la base de datos
    const newQR = await prisma.qr.create({
      data: {
        name,
        description: descriptionValue, // Evitar valores null
        userEmail,
        hash,
        cont,
        qrCode
      },
    });

    return { success: true, qr: newQR };
  } catch (error) {
    console.error("❌ Error creating QR:", error || error);
    return {
      success: false,
      error: error || "Internal server error"
    };
  }
}
