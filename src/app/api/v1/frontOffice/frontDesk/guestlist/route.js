import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { generatePrismaClient, getPropertyIDFromToken, getUserIDFromToken } from '@/app/lib/utils'
import { cookies } from 'next/headers';

export async function GET(request) {

    const tokenCookie = cookies().get("jwt");

    const prisma = generatePrismaClient()

    const propertyID = getPropertyIDFromToken(tokenCookie.value)

    const rangeDays = 31; // Number of days to consider for active reservations
    const today = new Date();
    const startDate = new Date(today); // Start date for range (today)
    const endDate = new Date(today); // End date for range (today + rangeDays days)
    endDate.setDate(endDate.getDate() + rangeDays); // Add rangeDays days to today's date

    const reservations = await prisma.reservations.findMany({
        where: {
            OR: [
                {
                    AND: [
                        { checkInDate: { gte: startDate } },
                        { checkInDate: { lte: endDate } },
                    ],
                },
                {
                    AND: [
                        { checkOutDate: { gte: startDate } },
                        { checkOutDate: { lte: endDate } },
                    ],
                },
                {
                    AND: [
                        { checkInDate: { lte: startDate } },
                        { checkOutDate: { gte: endDate } },
                    ],
                },
            ],
            propertyID: propertyID
        },
    });

    const response = reservations.filter(reservation => {
        const reservationStartDate = new Date(reservation.checkInDate);
        const reservationEndDate = new Date(reservation.checkOutDate);
        const overlapStartDate = new Date(Math.max(startDate, reservationStartDate));
        const overlapEndDate = new Date(Math.min(endDate, reservationEndDate));
        const overlapDays = (overlapEndDate - overlapStartDate) / (1000 * 60 * 60 * 24);

        return overlapDays > 0 && overlapDays <= rangeDays;
    });

    await prisma.$disconnect();

    return new NextResponse(JSON.stringify({ response, status: 200 }));
}