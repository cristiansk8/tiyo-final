'use server'
import prisma from '@/app/lib/prisma';
import { ServerActionResponse } from '@/types/server-action';
import { User, UserPlan } from '@/types/user.interface';

export async function getUserByEmail(email: string): Promise<ServerActionResponse<User>> {
    try {
        if (!email || !email.includes('@')) {
            return {
                error: 'Invalid email',
                status: 400
            };
        }

        const user = await prisma.user.findUnique({
            where: { email },
            include: { qr: true }
        });

        if (!user) {
            return {
                error: 'User not found',
                status: 404
            };
        }

        const formattedQR = user.qr?.map(qr => ({
            ...qr,
            cont: qr.cont ? Number(qr.cont) : undefined,
            scanCount: qr.cont ? Number(qr.cont) : undefined,
            createdAt: qr.createdAt.toISOString(),
            updatedAt: qr.updatedAt.toISOString(),
            description: qr.description || undefined,
            qrCode: qr.qrCode || undefined,
            hash: qr.hash ?? "",
        }));

        const userData: User = {
            id: user.id,
            email: user.email,
            name: user.name || '',
            phone: user.phone || '',
            photo: user.photo || '',
            plan: user.plan as UserPlan || UserPlan.Basic,
            qr: formattedQR
        };

        return { data: userData, status: 200 };

    } catch (error) {
        console.error('Error in getUserByEmail:', error);
        return {
            error: error instanceof Error ? error.message : 'Unknown error',
            status: 500
        };
    }
}
