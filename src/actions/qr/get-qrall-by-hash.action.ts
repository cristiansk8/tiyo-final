'use server'
import prisma from "@/app/lib/prisma"

export const getQrAllByHash = async (hash: string) => {
    try {
        const qr = await prisma.qr.findFirst({
            where: { hash },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        phone: true,
                        photo: true,
                        plan: true
                    }
                },
                scans: {
                    orderBy: {
                        scannedAt: 'desc'
                    },
                    take: 100 // Limitar a 100 scans recientes
                }
            }
        });
        
        if (!qr) return null;
        
        // Formatear fechas si es necesario
        return {
            ...qr,
            createdAt: qr.createdAt.toISOString(),
            updatedAt: qr.updatedAt.toISOString(),
            scans: qr.scans.map(scan => ({
                ...scan,
                scannedAt: scan.scannedAt.toISOString()
            }))
        };
    } catch (error) {
        console.error('Error fetching QR:', error);
        return null;
    }
}