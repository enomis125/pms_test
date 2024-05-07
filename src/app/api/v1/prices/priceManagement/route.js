import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import prisma from "@/app/lib/prisma";

export async function GET(request) {

    const ratecodesRecords = await prisma.ratecodes.findMany()

    const response = ratecodesRecords

    prisma.$disconnect()

    return new NextResponse(JSON.stringify({ response, status: 200 }));
}

export async function PUT(request) {

    try {
        const { data } = await request.json();
        const newRecord = await prisma.ratecodes.create({
            data: {
                rateGroup: data.raterName,
                rateCode: parseInt(data.ratergrpExID),
                specialRate: parseInt(data.raterSpecial),
                hotels: data.gdsCode
            }
        });

        return new NextResponse(JSON.stringify({newRecord, status: 200 }));

    } catch (error) {
        return new NextResponse(JSON.stringify({ error: error.message }), { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
