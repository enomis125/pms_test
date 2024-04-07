import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import prisma from "@/lib/prisma"

export async function GET(request) {



    const response = await prisma.departments.findMany()


    prisma.$disconnect()

    return new NextResponse(JSON.stringify({ response, status: 200 }));
}

export async function PUT(request) {


    try {
        const { data } = await request.json();
        console.log(data.Label)
        const newRecord = await prisma.departments.create({
            data: {
                departmentName: data.Abreviature,
                description: data.Description,
                showFo: parseInt(data.Order)
            }
        });

        return new NextResponse(JSON.stringify({ newRecord, status: 200 }));

    } catch (error) {
        return new NextResponse(JSON.stringify({ error: error.message }), { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}