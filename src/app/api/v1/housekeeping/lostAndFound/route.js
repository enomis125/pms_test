import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { generatePrismaClient, getPropertyIDFromToken, getUserIDFromToken } from '@/app/lib/utils'
import { cookies } from 'next/headers';

export async function GET(request) {

    const prisma = generatePrismaClient()

    const lostAndFoundRecords = await prisma.lostAndFound.findMany()

    const response = lostAndFoundRecords

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
        const newRecord = await prisma.lostAndFound.create({
            data: {
                hotelCode: parseInt(data.hotelCode),
                roomNumber: parseInt(data.roomNumber),
                customerID: parseInt(data.customerID),
                referenceNumber: parseInt(data.referenceNumber),
                date: data.date,
                userName: data.userName,
                isFound: parseInt(data.isFound),
                foundDate: data.foundDate,
                foundByUser: data.foundByUser,
                foundText: data.foundText,
                reportReference: parseInt(data.reportReference),
                location: data.location,
                document: data.document,
                submissionDate: data.submissionDate,
                submittedByUser: data.submittedByUser,
                foundLocation: data.foundLocation,
                localText: data.localText,
                foundText: data.foundText,
                foundText: data.foundText,
                createdBy: userID
            }
        });

        return new NextResponse(JSON.stringify({ newRecord, status: 200 }));

    } catch (error) {
        return new NextResponse(JSON.stringify({ error: error.message }), { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
