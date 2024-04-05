import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { PrismaClient } from "@prisma/client";

export async function GET(request, context) {

    const prisma = new PrismaClient()

    // console.log("1")

    // const pathname = new URL(request.url).pathname;

    // const parts = pathname.split('/');

    // const id = parts[parts.length - 1];

    const { id } = context.params;

    console.log(id)

    const response = await prisma.taxes.findUnique({
        where: {
            taxesID: parseInt(id)
        }
    })

    if (!response) {
        return new NextResponse(JSON.stringify({status: 404 }));
    }

    prisma.$disconnect()

    return new NextResponse(JSON.stringify({response, status: 200 }));
}

export async function PATCH(request, context) {

    const prisma = new PrismaClient()

    try {
        const { id } = context.params;
        const { data } = await request.json();

        const updateRecord = await prisma.taxes.update({
            where: {
                taxesID: parseInt(id),
            },
            data: {
                recordName: data.description,
                recordShortName: data.abreviature,
                mainGroup: data.cod,
            }
        })
        return new NextResponse(JSON.stringify({status: 200 }));

    } catch (error) {
        return new NextResponse(JSON.stringify({ error: error.message }), { status: 500 });
    } finally {
        await prisma.$disconnect();
    }

}

export async function DELETE(request, context) {

    const prisma = new PrismaClient()

    try {
        const { id } = context.params;

        console.log(id)

        const deleteRecord = await prisma.taxes.delete({
            where: {
                taxesID: parseInt(id),
            }
        })
        return new NextResponse(JSON.stringify({status: 200 }));

    } catch (error) {
        return new NextResponse(JSON.stringify({ error: error.message }), { status: 500 });
    } finally {
        await prisma.$disconnect();
    }

}
