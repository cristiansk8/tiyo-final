'use server'

import prisma from "@/app/lib/prisma"
import { Scan } from "@/types/scan.interface"

export const scanQr = async ({ qrId, ip }: Scan) => {
    try {
        return await prisma.scan.create({
            data: {
                qrId,
                scannedAt: new Date(),
                ip

            }
        })
    } catch (error) {
        console.log(error)
    }
}