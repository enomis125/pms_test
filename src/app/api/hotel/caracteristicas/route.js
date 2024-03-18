
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { PrismaClient } from "@prisma/client";

export async function GET(request) {

    const prisma = new PrismaClient()

    const characteristicsRecords = await prisma.carateristics.findMany()

    const response = characteristicsRecords

    prisma.$disconnect()

    return new NextResponse(JSON.stringify({ response, status: 200 }));
}

export async function PUT(request) {
    const prisma = new PrismaClient();

    try {
        const { Description, Abreviature, Details } = await request.json();
        const newRecord = await prisma.carateristics.create({
            data: {
                Description,
                Abreviature,
                Details
            }
        });

        return new NextResponse(JSON.stringify({newRecord, status: 200 }));

    } catch (error) {
        return new NextResponse(JSON.stringify({ error: error.message }), { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}




