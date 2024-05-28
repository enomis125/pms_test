
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { generatePrismaClient } from '@/app/lib/utils'


export async function GET(request) {

    const users = await prisma.response.findMany();

    prisma.$disconnect()

    return new NextResponse(JSON.stringify({ response, status: 200 }));
}

export async function PUT(request) {

    const { data } = await request.json();

    const prisma = generatePrismaClient(data.connectionString)

    try {

        const response = await prisma.users.createMany({
            data: data.users
        });

        return new NextResponse(JSON.stringify({ status: 200 }));

    } catch (error) {
        return new NextResponse(JSON.stringify({ error: error.message }), { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}




