import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import prisma from "@/app/lib/prisma";
 
export async function GET(request) {
 
    const response = await prisma.reservationstatus.findMany()
 
    prisma.$disconnect()
 
    return new NextResponse(JSON.stringify({ response, status: 200 }));
}
 
export async function PUT(request) {
 
    try {
        const { data } = await request.json();
        //console.log(data)

        const newRecord = await prisma.reservationstatus.create({
            data: {
                status: parseInt(data.nightCount),
                reschar: parseInt(data.adultCount),
                guestNumber: parseInt(data.guestNumber),
                languageID: parseInt(data.languageID),
                roomTypeNumber: parseInt(data.roomTypeNumber),
                roomNumber: parseInt(data.roomNumber),
            }
        });
 
        const id = newRecord.id;

        return new NextResponse(JSON.stringify({id, newRecord, status: 200 }));
 
    } catch (error) {
        return new NextResponse(JSON.stringify({ error: error.message }), { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}