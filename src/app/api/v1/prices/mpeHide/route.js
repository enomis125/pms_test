import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import prisma from "@/app/lib/prisma";

export async function GET(request) {

    const mpeHideRecords = await prisma.mpeHide.findMany()

    const response = mpeHideRecords

    prisma.$disconnect()

    return new NextResponse(JSON.stringify({ response, status: 200 }));
}

export async function PUT(request) {

    try {
        const { data } = await request.json();
        const newRecord = await prisma.mpeHide.create({
            data: {
                type: parseInt(data.type),
                ref: parseInt(data.ref),
                mpehotel: parseInt(data.mpehotel),
            }
        });

        return new NextResponse(JSON.stringify({newRecord, status: 200 }));

    } catch (error) {
        return new NextResponse(JSON.stringify({ error: error.message }), { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
