'use server';

import prisma from '@/app/lib/prisma';
import { ApiQR } from '@/types/QR.interface';
import { ServerActionResponse } from '@/types/server-action';


export async function getQRsByUser(
    email: string
): Promise<ServerActionResponse<ApiQR[]>> {
    try {
        // Validación mínima necesaria
        if (!email || !email.includes('@')) {
            return {
                error: 'Invalid email address',
                status: 400
            };
        }

        // Fetch desde DB
        const qrs = await prisma.qr.findMany({
            where: { userEmail: email },
            include: { scans: true }
        });

        // Transformación clara
        const formattedData: ApiQR[] = qrs.map(qr => ({
            id: Number(qr.id),
            name: qr.name || "",
            description: qr.description || "",
            createdAt: new Date(qr.createdAt).toISOString(),
            updatedAt: new Date(qr.updatedAt).toISOString(),
            scanCount: qr.scans.length,
            cont: Number(qr.cont) || 0,
            qrCode: qr.qrCode || "",
            userEmail: qr.userEmail,
            hash: qr.hash || ""
        }));

        return { data: formattedData as ApiQR[], status: 200 };

    } catch (error) {
        console.error('[SERVER] Error fetching QRs:', error);
        return {
            error: error instanceof Error ? error.message : 'Unknown error',
            status: 500
        };
    }
}