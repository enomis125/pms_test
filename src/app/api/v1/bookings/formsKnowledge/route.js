import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import prisma from "@/lib/prisma"

export async function GET(request) {



    const knowledgeRecords = await prisma.formsofknowledge.findMany()

    const response = knowledgeRecords

    prisma.$disconnect()

    return new NextResponse(JSON.stringify({ response, status: 200 }));
}

export async function PUT(request) {


    try {
        const { data } = await request.json();
        const newRecord = await prisma.formsofknowledge.create({
            data: {
                abreviature: data.abreviature,
                description: data.description,
                ordenation: data.ordenation,
            }
        });

        return new NextResponse(JSON.stringify({ newRecord, status: 200 }));

    } catch (error) {
        return new NextResponse(JSON.stringify({ error: error.message }), { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
