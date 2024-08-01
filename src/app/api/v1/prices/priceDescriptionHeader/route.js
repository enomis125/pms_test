import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { generatePrismaClient, getPropertyIDFromToken, getUserIDFromToken } from '@/app/lib/utils'
import { cookies } from 'next/headers';

export async function GET(request) {

    const tokenCookie = cookies().get("jwt");

    const prisma = generatePrismaClient()

    const priceDescriptionHeaderRecords = await prisma.priceDescriptionHeader.findMany()

    const response = priceDescriptionHeaderRecords

    prisma.$disconnect()

    return new NextResponse(JSON.stringify({ response, status: 200 }));
}

export async function PUT(request) {

    const tokenCookie = cookies().get("jwt");

    const prisma = generatePrismaClient()

    const userID = getUserIDFromToken(tokenCookie.value)
    
    try {
        const { data } = await request.json();

        const validFrom = new Date(data.validFrom);
        const validUntil = new Date(data.validUntil);

        const newRecord = await prisma.priceDescriptionHeader.create({
            data: {
                ref: data.ref,
                descriptionName: data.descriptionName,
                priceCode: parseInt(data.priceCode),

                valid: parseInt(data.valid),
                validFrom: validFrom,
                validUntil: validUntil,

                property: parseInt(data.property),
                //ventilation: parseInt(data.ventilation),
                billText: data.billText,
                billingAccountID: parseInt(data.revenueAccount),
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