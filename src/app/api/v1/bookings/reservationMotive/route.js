import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import prisma from "@/app/lib/prisma";

export async function GET(request) {

    const reservMotiveRecords = await prisma.hear.findMany()

    const response = reservMotiveRecords

    prisma.$disconnect()

    return new NextResponse(JSON.stringify({ response, status: 200 }));
}

export async function PUT(request) {

    try {
        const { data } = await request.json();
        const newRecord = await prisma.hear.create({
            data: {
                shortName: data.shortName,
                name: data.name,
                className: parseInt(data.className),
            }
        });

        return new NextResponse(JSON.stringify({newRecord, status: 200 }));

    } catch (error) {
        return new NextResponse(JSON.stringify({ error: error.message }), { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
