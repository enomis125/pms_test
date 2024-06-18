import { NextRequest, NextResponse } from "next/server";
import { generatePrismaClient, getPropertyIDFromToken, getUserIDFromToken } from '@/app/lib/utils'
import { cookies } from 'next/headers';

export async function PUT(request) {

    const tokenCookie = cookies().get("jwt");

    const prisma = generatePrismaClient()

    const userID = getUserIDFromToken(tokenCookie.value)

    const propertyID = getPropertyIDFromToken(tokenCookie.value)

    try {
        const { data } = await request.json();
        
        const updatedRecord = await prisma.housekeeping.create({
            data: {
                roomNumber: parseInt(data.roomNumber),
                hotelCode: parseInt(propertyID),
                roomStatus: parseInt(data.roomStatus),
                createdBy: userID
            }
        });

        return new NextResponse(JSON.stringify({ updatedRecord, status: 200 }));

    } catch (error) {
        return new NextResponse(JSON.stringify({ error: error.message }), { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
