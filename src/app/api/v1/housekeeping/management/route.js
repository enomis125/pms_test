import { NextRequest, NextResponse } from "next/server";
import { generatePrismaClient, getPropertyIDFromToken, getUserIDFromToken } from '@/app/lib/utils'
import { cookies } from 'next/headers';


export async function GET(request, context) {
    const prisma = generatePrismaClient();

    try {

        const housekeepingRecord = await prisma.housekeeping.findMany();

        if (!housekeepingRecord) {
            return new NextResponse(JSON.stringify({ error: "Room not found" }), { status: 404 });
        }

        return new NextResponse(JSON.stringify(housekeepingRecord), { status: 200 });

    } catch (error) {
        return new NextResponse(JSON.stringify({ error: error.message }), { status: 500 });
    } finally {

        await prisma.$disconnect();
    }
}

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
