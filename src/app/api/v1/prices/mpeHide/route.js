import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { generatePrismaClient, getPropertyIDFromToken, getUserIDFromToken } from '@/app/lib/utils'
import { cookies } from 'next/headers';

export async function GET(request) {

    const tokenCookie = cookies().get("jwt");

    const prisma = generatePrismaClient()

    const propertyID = getPropertyIDFromToken(tokenCookie.value)

    const mpeHideRecords = await prisma.mpeHide.findMany({
        where: {
            propertyID: propertyID
        }
    })

    const response = mpeHideRecords

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
        const newRecord = await prisma.mpeHide.create({
            data: {
                type: parseInt(data.type),
                ref: parseInt(data.ref),
                mpehotel: parseInt(data.mpehotel),
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
