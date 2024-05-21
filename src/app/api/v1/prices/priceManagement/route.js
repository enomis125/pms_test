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
        console.log(data)
        const newRecord = await prisma.ratecodes.create({
            data: {
                raterName: data.rateGroup,
                ratergrpExID: parseInt(data.rateCode),
               // raterSpecial: parseInt(data.SpecialRate),
                gdsCode: data.hotels
            }
            
        });

        return new NextResponse(JSON.stringify({ newRecord, status: 200 }));

    } catch (error) {
        return new NextResponse(JSON.stringify({ error: error.message }), { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
