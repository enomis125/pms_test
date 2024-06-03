import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { generatePrismaClient, getPropertyIDFromToken, getUserIDFromToken } from '@/app/lib/utils'
import { cookies } from 'next/headers';

export async function GET(request) {

    const prisma = generatePrismaClient()

    const professionRecords = await prisma.profession.findMany()

    const response = professionRecords

    prisma.$disconnect()

    return new NextResponse(JSON.stringify({ response, status: 200 }));
}

export async function PUT(request) {

    const tokenCookie = cookies().get("jwt");

    const prisma = generatePrismaClient()

    const userID = getUserIDFromToken(tokenCookie.value)

    try {
        const { data } = await request.json();
        const newRecord = await prisma.profession.create({
            data: {
                gruppe: parseInt(data.group),
                abreviature: data.abreviature,
                description: data.description,
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
