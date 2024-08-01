import { NextRequest, NextResponse } from "next/server";
import { generatePrismaClient, getPropertyIDFromToken, getUserIDFromToken } from '@/app/lib/utils'
import { cookies } from 'next/headers';


export async function GET(request) {
    try {
        const tokenCookie = cookies().get("jwt");
        const prisma = generatePrismaClient();
        const propertyID = getPropertyIDFromToken(tokenCookie.value);

        const response = await prisma.maintenanceRooms.findMany({
            where: {
                propertyID: propertyID
            }
        });

        
        return NextResponse.json({ response, status: 200 });
    } catch (error) {
        console.error("Database query failed:", error);
        return NextResponse.json({ status: 500, message: "Internal Server Error" }, { status: 500 });
    }
}
export async function PUT(request) {

    const tokenCookie = cookies().get("jwt");

    const prisma = generatePrismaClient()

    const userID = getUserIDFromToken(tokenCookie.value)

    try {
        const { data } = await request.json();

        const newRoom = await prisma.maintenanceRooms.create({
            data: {
                roomStatus: data.roomStatus,
                reason: data.reason,
                text: data.text,
                date: data.date,
                user1: data.user1,
                change: data.change,
                user2: data.user2,
                RefNumber: parseInt(data.refNumber),
                text2: data.text2,
                document: data.document,
                priority: data.priority,
                roomNumber: parseInt(data.roomNumber)
            }
        });

        return new NextResponse(JSON.stringify({ status: 200 }));

    } catch (error) {
        return new NextResponse(JSON.stringify({ error: error.message }), { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
