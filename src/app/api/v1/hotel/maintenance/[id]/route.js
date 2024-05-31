
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { generatePrismaClient, getUserIDFromToken } from '@/app/lib/utils'
import { cookies } from 'next/headers';


export async function GET(request, context) {

    const prisma = generatePrismaClient()

    const { id } = context.params;

    const response = await prisma.maintenance.findUnique({
        where: {
            maintenanceID: parseInt(id)
        }
    })

    if (!response) {
        return new NextResponse(JSON.stringify({ status: 404 }));
    }

    prisma.$disconnect()

    return new NextResponse(JSON.stringify({ response, status: 200 }));
}

export async function PATCH(request, context) {

    const tokenCookie = cookies().get("jwt");

    const prisma = generatePrismaClient()

    const userID = getUserIDFromToken(tokenCookie.value)

    try {
        const { id } = context.params;
        const { data } = await request.json();

        const updateRecord = await prisma.maintenance.update({
            where: {
                maintenanceID: parseInt(id),
            },
            data: {
                abreviature: data.abreviature,
                details: data.details,
                description: data.description,
                updatedBy: userID
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

        const deleteRecord = await prisma.maintenance.delete({
            where: {
                maintenanceID: parseInt(id),
            }
        })
        return new NextResponse(JSON.stringify({ status: 200 }));

    } catch (error) {
        return new NextResponse(JSON.stringify({ error: error.message }), { status: 500 });
    } finally {
        await prisma.$disconnect();
    }

}




