import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { generatePrismaClient } from '@/app/lib/utils'

export async function GET(request, context) {

    const prisma = generatePrismaClient()

    const { id } = context.params;

    const response = await prisma.marketsegments.findUnique({
        where: {
            marketsegmentsID: parseInt(id)
        }
    })

    if (!response) {
        return new NextResponse(JSON.stringify({ status: 404 }));
    }

    prisma.$disconnect()

    return new NextResponse(JSON.stringify({ response, status: 200 }));
}

export async function PATCH(request, context) {

    const prisma = generatePrismaClient()

    try {
        const { id } = context.params;
        const { data } = await request.json();

        const updateRecord = await prisma.marketsegments.update({
            where: {
                marketsegmentsID: parseInt(id),
            },
            data: {
                abreviature: data.abreviature,
                description: data.description,
                ordenation: data.ordenation,
            }
        })
        return new NextResponse(JSON.stringify({ status: 200 }));

    } catch (error) {
        return new NextResponse(JSON.stringify({ error: error.message }), { status: 500 });
    } finally {
        await prisma.$disconnect();
    }

}

export async function DELETE(request, context) {

    const prisma = generatePrismaClient()

    try {
        const { id } = context.params;

        const deleteRecord = await prisma.marketsegments.delete({
            where: {
                marketsegmentsID: parseInt(id),
            }
        })
        return new NextResponse(JSON.stringify({ status: 200 }));

    } catch (error) {
        return new NextResponse(JSON.stringify({ error: error.message }), { status: 500 });
    } finally {
        await prisma.$disconnect();
    }

}




