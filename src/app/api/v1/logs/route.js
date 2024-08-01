import { NextRequest, NextResponse } from "next/server";
import { cookies } from 'next/headers';
import {
    generatePrismaClient,
    getPropertyIDFromToken,
    getUserIDFromToken,
  } from "@/app/lib/utils";


export async function PUT(request) {

    const prisma = generatePrismaClient();
    
    try {
        const { roomNumber, roomState, timestamp } = await request.json();

        const newLog = await prisma.housekeepingLogs.create({
            data: {
                roomNumber,
                roomState,
                timestamp: new Date(timestamp), // Converte o timestamp para o formato Date
            }
        });

        return new NextResponse(JSON.stringify({ newLog, status: 200 }), { status: 200 });
    } catch (error) {
        return new NextResponse(JSON.stringify({ error: error.message }), {
            status: 500,
        });
    } finally {
        await prisma.$disconnect();
    }
}