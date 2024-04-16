
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { PrismaClient } from "@prisma/client";

export async function GET(request) {

    const prisma = new PrismaClient()

    const response = await prisma.cashiers.findMany()


    prisma.$disconnect()

    return new NextResponse(JSON.stringify({ response, status: 200 }));
}

export async function PUT(request) {
    const prisma = new PrismaClient();

    try {
        const { data } = await request.json();
        //console.log(data.Label)
        const newRecord = await prisma.cashiers.create({
            data: {
                extCashierId: parseInt(data.cod),
                password: data.password,
                cashierName: data.abreviature,
            }
        });

        return new NextResponse(JSON.stringify({newRecord, status: 200 }));

    } catch (error) {
        return new NextResponse(JSON.stringify({ error: error.message }), { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
