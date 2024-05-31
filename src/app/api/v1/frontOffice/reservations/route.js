import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { generatePrismaClient, getPropertyIDFromToken, getUserIDFromToken } from '@/app/lib/utils'
import { cookies } from 'next/headers';

export async function GET(request) {

    const tokenCookie = cookies().get("jwt");

    const prisma = generatePrismaClient()

    const propertyID = getPropertyIDFromToken(tokenCookie.value)

    const response = await prisma.reservations.findMany({
        where: {
            propertyID: propertyID
        }
    })

    prisma.$disconnect()

    return new NextResponse(JSON.stringify({ response, status: 200 }));
}

export async function PUT(request) {

    const tokenCookie = cookies().get("jwt");

    const prisma = generatePrismaClient()

    const userID = getUserIDFromToken(tokenCookie.value)

    const propertyID = getPropertyIDFromToken(tokenCookie.value)

    try {
        const { data } = await request.json();

        const checkInDate = new Date(data.checkInDate);
        const checkOutDate = new Date(data.checkOutDate);

        const newRecord = await prisma.reservations.create({
            data: {
                checkInDate: checkInDate,
                checkOutDate: checkOutDate,
                nightCount: parseInt(data.nightCount),
                adultCount: parseInt(data.adultCount),
                guestNumber: parseInt(data.guestNumber),
                propertyID: propertyID,
                createdBy: userID,
                languageID: parseInt(data.languageID),
                roomTypeNumber: parseInt(data.roomTypeNumber),
                roomNumber: parseInt(data.roomNumber),
             
            }
        });

        const id = newRecord.id;

        return new NextResponse(JSON.stringify({ id, newRecord, status: 200 }));

    } catch (error) {
        return new NextResponse(JSON.stringify({ error: error.message }), { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
