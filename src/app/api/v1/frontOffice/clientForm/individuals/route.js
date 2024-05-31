import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { generatePrismaClient } from '@/app/lib/utils'

export async function GET(request) {

    const prisma = generatePrismaClient()

    const response = await prisma.guestProfile.findMany()

    prisma.$disconnect()

    return new NextResponse(JSON.stringify({ response, status: 200 }));
}

export async function PUT(request) {

    const prisma = generatePrismaClient()

    try {
        const { data } = await request.json();

        const birthday = new Date(data.birthday);
        const issuedate = new Date(data.issuedate);
        const expiryDateDoc = new Date(data.expiryDateDoc);

        const newRecord = await prisma.guestProfile.create({
            data: {
                firstName: data.firstName,
                secondName: data.secondName,
                zipCode: data.zipCode,
                region: data.region,
                address: parseInt(data.country),
                //countryAddress: parseInt(data.countryAddress)
                email: parseInt(data.email),
                phoneNumber: data.phoneNumber,
                birthday: birthday,
                birthTown: data.birthTown,
                cc: data.cc,
                telephoneNumber: data.telephoneNumber,
                issuedate: issuedate,
                expiryDateDoc: expiryDateDoc,
                nif: parseInt(data.nif),
                name: data.name,
                town: data.town,
                profileType: 0
            }
        });

        const id = newRecord.id;

        return new NextResponse(JSON.stringify({ id, newRecord, status: 200 }));

    } catch (error) {
        return new NextResponse(JSON.stringify({ error: error.message }), { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}