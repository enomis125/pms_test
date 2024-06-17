
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { generatePrismaClient, getUserIDFromToken } from '@/app/lib/utils'
import { cookies } from 'next/headers';


export async function GET(request, context) {

    const prisma = generatePrismaClient()

    const { id } = context.params;

    const response = await prisma.lostAndFound.findUnique({
        where: {
            referenceNumber: parseInt(id)
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

        const updateRecord = await prisma.lostAndFound.update({
            where: {
                referenceNumber: parseInt(id),
            },
            data: {
                //hotelCode: parseInt(data.hotelCode),
                roomNumber: parseInt(data.roomNumber),
                //customerID: parseInt(data.customerID),
                description: data.description,
                //referenceNumber: parseInt(data.referenceNumber),
                date: data.date,
                userName: data.userName,
                isFound: parseInt(data.isFound),
                //foundDate: data.foundDate,
               foundByUser: data.foundByUser,
               // foundText: data.foundText,
                //reportReference: parseInt(data.reportReference),
                location: data.location,
                //document: data.document,
                //submissionDate: data.submissionDate,
                //submittedByUser: data.submittedByUser,
               // foundLocation: data.foundLocation,
                //localText: data.localText,
                //foundText: data.foundText,
                //foundText: data.foundText,
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

        const deleteRecord = await prisma.lostAndFound.delete({
            where: {
                referenceNumber: parseInt(id),
            }
        })
        return new NextResponse(JSON.stringify({ status: 200 }));

    } catch (error) {
        return new NextResponse(JSON.stringify({ error: error.message }), { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}

export async function PUT(request, context) {
    try {
        const { id } = context.params;
        const { data } = await request.json();

        const updateRecord = await prisma.lostAndFound.update({
            where: {
                referenceNumber: parseInt(id),
            },
            data: {
                isFound: parseInt(data.isFound),
            }
        });

        return new NextResponse(JSON.stringify({ status: 200 }));
    } catch (error) {
        return new NextResponse(JSON.stringify({ error: error.message }), { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}





