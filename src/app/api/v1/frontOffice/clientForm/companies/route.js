import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { generatePrismaClient, getPropertyIDFromToken, getUserIDFromToken } from '@/app/lib/utils'
import { cookies } from 'next/headers';

export async function GET(request) {

    const prisma = generatePrismaClient()

    const response = await prisma.guestProfile.findMany()

    prisma.$disconnect()

    return new NextResponse(JSON.stringify({ response, status: 200 }));
}

export async function PUT(request) {

    const tokenCookie = cookies().get("jwt");

    const prisma = generatePrismaClient()

    const userID = getUserIDFromToken(tokenCookie.value)


    try {
        const { data } = await request.json();

        const newRecord = await prisma.guestProfile.create({
            data: {
                companyName: data.companyName,
                companyName2: data.companyName2,
                profileType: 1,
                address: parseInt(data.country),
                zipCodePostBox: data.zipCodePostBox,
                //countryAddress: parseInt(data.countryAddress)
                town: data.town,
                region: data.region,
                websiteURL: data.websiteURL,
                email: parseInt(data.email),
                phoneNumber: data.phoneNumber,
                createdBy: userID
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