import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { generatePrismaClient } from '@/app/lib/utils'

export async function GET(request, context) {

    const prisma = generatePrismaClient()

    const { id } = context.params;

    const response = await prisma.market.findUnique({
        where: {
            marketNR: parseInt(id)
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

        const updateRecord = await prisma.market.update({
            where: {
                marketNR: parseInt(id),
            },
            data: {
                name: data.name,
                anzahi: parseInt(data.anzahi),
                group: data.group,
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

        const deleteRecord = await prisma.market.delete({
            where: {
                marketNR: parseInt(id),
            }
        })
        return new NextResponse(JSON.stringify({ status: 200 }));

    } catch (error) {
        return new NextResponse(JSON.stringify({ error: error.message }), { status: 500 });
    } finally {
        await prisma.$disconnect();
    }

}




