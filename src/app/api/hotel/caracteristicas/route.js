
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { PrismaClient } from "@prisma/client";

export async function GET(request) {

    const prisma = new PrismaClient()

    const characteristicsRecords = await prisma.carateristics.findMany()

    const response = characteristicsRecords

    return new NextResponse(JSON.stringify({ response, status: 200 }));
}

export async function PUT(request) {
    const prisma = new PrismaClient();

    const res = await request.json()

    const newRecord = await prisma.carateristics.create({
        data: {
            Description: res.description,
            Abreviature: res.abreviature,
            Details: res.details
        }
    })

    return new NextResponse(JSON.stringify({status: 200}));
}