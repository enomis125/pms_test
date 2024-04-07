import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import prisma from "@/lib/prisma"

export async function GET(request) {



    const marketRecords = await prisma.market.findMany()

    const response = marketRecords

    prisma.$disconnect()

    return new NextResponse(JSON.stringify({ response, status: 200 }));
}

export async function PUT(request) {


    try {
        const { data } = await request.json();
        const newRecord = await prisma.market.create({
            data: {
                name: data.abreviature,
                anzahi: parseInt(data.description),
                group: data.ordenation,
            }
        });

        return new NextResponse(JSON.stringify({ newRecord, status: 200 }));

    } catch (error) {
        return new NextResponse(JSON.stringify({ error: error.message }), { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
