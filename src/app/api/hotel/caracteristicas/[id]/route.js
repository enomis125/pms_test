
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { PrismaClient } from "@prisma/client";

export async function GET(request) {

    const prisma = new PrismaClient()

    console.log("1")

    const pathname = new URL(request.url).pathname;

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

export async function PATCH(request) {

    const prisma = new PrismaClient()

    try {
        const { idCarateristics, Description, Abreviature, Details } = await request.json();
        const updateRecord = await prisma.carateristics.update({
            where: {
                idCarateristics: idCarateristics,
            },
            data: {
                Description: Description,
                Abreviature: Abreviature,
                Details: Details
            }
        })
        return new NextResponse(JSON.stringify({status: 200 }));

    } catch (error) {
        return new NextResponse(JSON.stringify({ error: error.message }), { status: 500 });
    } finally {
        await prisma.$disconnect();
    }

}




