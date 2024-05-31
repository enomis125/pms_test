import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { generatePrismaClient } from '@/app/lib/utils'

export async function GET(request, context) {

    const prisma = generatePrismaClient()

    const { id } = context.params;

    const response = await prisma.guestProfile.findUnique({
        where: {
            guestProfileID: parseInt(id)
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
        const birthday = new Date(data.birthday);
        const updateRecord = await prisma.guestProfile.update({
            where: {
                guestProfileID: parseInt(id),
            },
            data: {
                companyName: data.companyName,
                companyName2: data.companyName2,
                country: parseInt(data.country),
                zipCodePostBox: data.zipCodePostBox,
                //countryAddress: parseInt(data.countryAddress)
                town: data.town,
                region: data.region,
                websiteURL: data.websiteURL,
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

        const deleteRecord = await prisma.guestProfile.delete({
            where: {
                guestProfileID: parseInt(id),
            }
        })
        return new NextResponse(JSON.stringify({ status: 200 }));

    } catch (error) {
        return new NextResponse(JSON.stringify({ error: error.message }), { status: 500 });
    } finally {
        await prisma.$disconnect();
    }

}