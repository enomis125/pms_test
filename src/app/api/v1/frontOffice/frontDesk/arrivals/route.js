import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { generatePrismaClient, getPropertyIDFromToken, getUserIDFromToken } from '@/app/lib/utils'
import { cookies } from 'next/headers';

export async function GET(request) {

    const tokenCookie = cookies().get("jwt");

    const prisma = generatePrismaClient()

    const propertyID = getPropertyIDFromToken(tokenCookie.value)

    const today = new Date();
    const startOfToday = new Date(today.setHours(0, 0, 0, 0));

    const endOfPeriod = new Date(startOfToday);
    endOfPeriod.setDate(startOfToday.getDate() + 10);

    const response = await prisma.reservations.findMany({
        where: {
            checkInDate: {
                gte: startOfToday,
                lt: endOfPeriod,
            },
            propertyID: propertyID
        },
    });

    prisma.$disconnect()

    return new NextResponse(JSON.stringify({ response, status: 200 }));
}

export async function PUT(request) {

    try {
        const { data } = await request.json();
        //console.log(data.Label)
        const checkInDate = new Date(data.checkInDate);
        const checkOutDate = new Date(data.checkOutDate);

        const newRecord = await prisma.reservations.create({
            data: {
                checkInDate: checkInDate,
                checkOutDate: checkOutDate,
                nightCount: parseInt(data.nightCount),
                adultCount: parseInt(data.adultCount),
                guestNumber: parseInt(data.guestNumber),
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