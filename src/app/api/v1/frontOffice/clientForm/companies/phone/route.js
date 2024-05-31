import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { generatePrismaClient } from '@/app/lib/utils'

export async function GET(request) {

    const prisma = generatePrismaClient()

    const response = await prisma.guestPhone.findMany()

    prisma.$disconnect()

    return new NextResponse(JSON.stringify({ response, status: 200 }));
}

export async function PUT(request) {

    const prisma = generatePrismaClient()

    try {
        const { data } = await request.json();

        const newRecord = await prisma.guestPhone.create({
            data: {
                generalPhone: data.generalPhone,
                departmentPhone: data.departmentPhone,
            }
        });

        return new NextResponse(JSON.stringify({ newRecord, status: 200 }));

    } catch (error) {
        return new NextResponse(JSON.stringify({ error: error.message }), { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}