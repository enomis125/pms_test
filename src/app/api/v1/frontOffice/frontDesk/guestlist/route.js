import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import prisma from "@/app/lib/prisma";
 
export async function GET(request) {
    
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
        },
    });

    const activeReservations = reservations.filter(reservation => {
        const reservationStartDate = new Date(reservation.checkInDate);
        const reservationEndDate = new Date(reservation.checkOutDate);
        const overlapStartDate = new Date(Math.max(startDate, reservationStartDate));
        const overlapEndDate = new Date(Math.min(endDate, reservationEndDate));
        const overlapDays = (overlapEndDate - overlapStartDate) / (1000 * 60 * 60 * 24);

        return overlapDays > 0 && overlapDays <= rangeDays;
    });

    await prisma.$disconnect();

    return new NextResponse(JSON.stringify({ activeReservations, status: 200 }));
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

        return new NextResponse(JSON.stringify({id, newRecord, status: 200 }));
 
    } catch (error) {
        return new NextResponse(JSON.stringify({ error: error.message }), { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}