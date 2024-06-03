import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { generatePrismaClient, getPropertyIDFromToken, getUserIDFromToken } from '@/app/lib/utils'
import { cookies } from 'next/headers';

export async function GET(request) {

    const prisma = generatePrismaClient()

    const nationRecords = await prisma.nationalities.findMany()

    const response = nationRecords

    prisma.$disconnect()

    return new NextResponse(JSON.stringify({ response, status: 200 }));
}

export async function PUT(request) {

    const tokenCookie = cookies().get("jwt");

    const prisma = generatePrismaClient()

    const userID = getUserIDFromToken(tokenCookie.value)

    try {
        const { data } = await request.json();
        const newRecord = await prisma.nationalities.create({
            data: {
                land: data.nation,
                statNr: parseInt(data.statnr),
                brkopftyp: parseInt(data.ordenation),
                gruppe: parseInt(data.group),
                isocode: data.isocode,
                showFO: parseInt(data.fo),
                nation: data.nationality,
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
