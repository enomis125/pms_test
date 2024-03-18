
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { PrismaClient } from "@prisma/client";

export async function GET(req) {

    const prisma = new PrismaClient()

    console.log("1")

    const pathname = new URL(req.url).pathname;

    const parts = pathname.split('/');

    const id = parts[parts.length - 1];

    const characteristicsRecords = await prisma.carateristics.findUnique({
        where: {
            idCarateristics: parseInt(id)
        }
    })

    const response = characteristicsRecords

    if (!response) {
        return new NextResponse(JSON.stringify({status: 404 }));
    }

    prisma.$disconnect()

    return new NextResponse(JSON.stringify({response, status: 200 }));
}




