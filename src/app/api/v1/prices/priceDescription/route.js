import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import prisma from "@/app/lib/prisma";

export async function GET(request) {

    const ratecodedetailsRecords = await prisma.ratecodedetails.findMany()

    const response = ratecodedetailsRecords

    prisma.$disconnect()

    return new NextResponse(JSON.stringify({ response, status: 200 }));
}

export async function PUT(request) {

    try {
        const { data } = await request.json();
        console.log(data)
        const newRecord = await prisma.ratecodedetails.create({
            data: {
                rateCodeID: parseInt(data.rateCodeName),
                rateCodeDetName: data.nome,
            }
            
        });

        return new NextResponse(JSON.stringify({ newRecord, status: 200 }));

    } catch (error) {
        return new NextResponse(JSON.stringify({ error: error.message }), { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
