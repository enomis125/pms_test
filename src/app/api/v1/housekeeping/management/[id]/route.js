import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { generatePrismaClient, getUserIDFromToken } from '@/app/lib/utils';
import { cookies } from 'next/headers';

export async function PATCH(request, context) {
    const tokenCookie = cookies().get("jwt");
    const prisma = generatePrismaClient();
    const userID = getUserIDFromToken(tokenCookie.value);

    try {
        const { id } = context.params; // Supondo que id seja o referenceNumber ou outro campo único
        const { data } = await request.json();

        const record  = await prisma.housekeeping.findMany({
            where: {
                roomNumber: parseInt(id)
            }
        })

        console.log(record)

        const updateRecord = await prisma.housekeeping.update({
            where: {
                referenceNumber: record[0].referenceNumber
            },
            data: {
                roomStatus: parseInt(data.roomStatus),
                createdBy: userID
            }
        });

        return new NextResponse(JSON.stringify({ status: 200 }));

    } catch (error) {
        return new NextResponse(JSON.stringify({ error: error.message }), { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}


