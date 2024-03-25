
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

    const response = await prisma.nationalities.findUnique({
        where: {
            codeNr: parseInt(id)
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

        const updateRecord = await prisma.nationalities.update({
            where: {
                codeNr: parseInt(id),
            },
            data: {
                land: data.nation,
                statNr: parseInt(data.statnr),
                brkopftyp: parseInt(data.ordenation),
                gruppe: parseInt(data.group),
                isocode: data.isocode,
                showFO: parseInt(data.fo),
                nation: data.nationality,
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

        const deleteRecord = await prisma.nationalities.delete({
            where: {
                codeNr: parseInt(id),
            }
        })
        return new NextResponse(JSON.stringify({status: 200 }));

    } catch (error) {
        return new NextResponse(JSON.stringify({ error: error.message }), { status: 500 });
    } finally {
        await prisma.$disconnect();
    }

}




