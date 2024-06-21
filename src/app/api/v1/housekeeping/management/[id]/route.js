import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { generatePrismaClient, getUserIDFromToken } from '@/app/lib/utils'
import { cookies } from 'next/headers';


export async function PATCH(request, context) {

    const tokenCookie = cookies().get("jwt");

    const prisma = generatePrismaClient()

    const userID = getUserIDFromToken(tokenCookie.value)

    try {
        const { id } = context.params;
        const { data } = await request.json();

        const updateRecord = await prisma.housekeeping.update({
            where: {
                referenceNumber: parseInt(id),
            },
            data: {
                roomNumber: parseInt(data.roomNumber),
                hotelCode: parseInt(propertyID),
                roomStatus: parseInt(data.roomStatus),
                createdBy: userID
            }
        })
        return new NextResponse(JSON.stringify({ status: 200 }));

    } catch (error) {
        return new NextResponse(JSON.stringify({ error: error.message }), { status: 500 });
    } finally {
        await prisma.$disconnect();
    }

}