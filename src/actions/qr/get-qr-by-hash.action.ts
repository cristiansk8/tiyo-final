'use server'
import prisma from "@/app/lib/prisma"
export const getQrByHash = async (hash: string) => {
    try {
        const qr = await prisma.qr.findFirst({
            where: { hash },
        });
        if (!qr) return null;
        return qr
    } catch (error) {
        console.log(error)
    }
}