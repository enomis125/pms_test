import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { PrismaClient } from "@prisma/client";

export async function GET(request) {

    const prisma = new PrismaClient()

    const salutationRecords = await prisma.salutions.findMany()

    const response = salutationRecords

    prisma.$disconnect()

    return new NextResponse(JSON.stringify({ response, status: 200 }));
}

export async function PUT(request) {
    const prisma = new PrismaClient();

    try {
        const { data } = await request.json();
        const newRecord = await prisma.salutions.create({
            data: {
                suffix: data.abreviature,
                salutationCode: data.description,
                salutation: data.title,
                type: parseInt(data.ordenation),
                inet: parseInt(data.gender),
            }
        });

        return new NextResponse(JSON.stringify({newRecord, status: 200 }));

    } catch (error) {
        return new NextResponse(JSON.stringify({ error: error.message }), { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
