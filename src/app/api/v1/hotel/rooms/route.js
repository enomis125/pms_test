import { NextRequest, NextResponse } from "next/server";
import { generatePrismaClient, getUserIDFromToken, getPropertyIDFromToken } from '@/app/lib/utils'
import { cookies } from 'next/headers';

export async function GET(request) {
    try {

        const tokenCookie = cookies().get("jwt");

        const prisma = generatePrismaClient()

        const propertyID = getPropertyIDFromToken(tokenCookie.value)

        const roomsRecords = await prisma.rooms.findMany({
            where: {
                propertyID: propertyID
            },
            include: {
                roomtypes: {
                    select: {
                        desc: true
                    }
                }
            }
        })

        const response = roomsRecords

        prisma.$disconnect()

        return new NextResponse(JSON.stringify({ response, status: 200 }));
    } catch (error) {
        console.error("Database query failed:", error);
        return new NextResponse(JSON.stringify({ status: 500, message: "Internal Server Error" }), { status: 500 });
    }
}

export async function PUT(request) {

    const tokenCookie = cookies().get("jwt");

    const prisma = generatePrismaClient()

    const userID = getUserIDFromToken(tokenCookie.value)

    const propertyID = getPropertyIDFromToken(tokenCookie.value)

    try {
        const { data } = await request.json();

        const newRecord = await prisma.rooms.create({
            data: {
                label: data.Label,
                roomType: parseInt(data.RoomType),
                description: data.Description,
                createdBy: userID,
                propertyID: propertyID
            }
        });

        return new NextResponse(JSON.stringify({ newRecord, status: 200 }));

    } catch (error) {
        return new NextResponse(JSON.stringify({ error: error.message }), { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
