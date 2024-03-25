import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import prisma from "@/lib/prisma"

export async function GET(request) {

    const response = await prisma.cancelationsreasons.findMany()

    prisma.$disconnect()

    return new NextResponse(JSON.stringify({ response, status: 200 }));
}

export async function PUT(request) {

    try {
        const { data } = await request.json();
        const response = await prisma.cancelationsreasons.create({
            data: {
                shortName: data.shortName,
                name: data.name,
                class: parseInt(data.class),
            }
        });

        return new NextResponse(JSON.stringify({ response, status: 200 }));

    } catch (error) {
        return new NextResponse(JSON.stringify({ error: error.message }), { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
