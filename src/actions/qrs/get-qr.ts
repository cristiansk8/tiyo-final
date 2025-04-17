'use server'

import prisma from "@/app/lib/prisma"


export const getQrByName = async (name: string) => {
    //console.log(name)
    try {
        const qr = await prisma.qr.findFirst({

            where: { name },
        });
        //console.log("qr", qr)
        if (!qr) return null;

        return qr

    } catch (error) {
        console.log(error)
    }
}