import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import prisma from "@/app/lib/prisma";

export async function GET(request) {

    const roomsRecords = await prisma.rooms_characteristics.findMany()

    const response = roomsRecords

    prisma.$disconnect()

    return new NextResponse(JSON.stringify({ response, status: 200 }));
}

export async function PUT(request) {

    try {
        const { data } = await request.json();
        //console.log(data.Label)
        const newRecord = await prisma.rooms_characteristics.create({
            data: {
                roomID: parseInt(data.roomID),
                characteristicID: (parseInt(data.characteristicID)),
            }
        });

        return new NextResponse(JSON.stringify({newRecord, status: 200 }));

    } catch (error) {
        return new NextResponse(JSON.stringify({ error: error.message }), { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
