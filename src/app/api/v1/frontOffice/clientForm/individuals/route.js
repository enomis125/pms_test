import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { PrismaClient } from "@prisma/client";
 
export async function GET(request) {
 
    const prisma = new PrismaClient()
 
    const response = await prisma.guestProfile.findMany()
 
 
    prisma.$disconnect()
 
    return new NextResponse(JSON.stringify({ response, status: 200 }));
}
 
export async function PUT(request) {
    const prisma = new PrismaClient();
 
    try {
        const { data } = await request.json();
        console.log(data.Label)

        const birthday = new Date(data.birthday);
        const issuedate = new Date(data.issuedate);
        const expiryDateDoc = new Date(data.expiryDateDoc);

        const newRecord = await prisma.guestProfile.create({
            data: {
                firstName: data.firstName,
                secondName: data.secondName,
                zipCode: data.zipCode,
                region: data.region,
                country: data.country,
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
                profileType: 0
            }
        });
 
        const id = newRecord.id;

        return new NextResponse(JSON.stringify({id, newRecord, status: 200 }));
 
    } catch (error) {
        return new NextResponse(JSON.stringify({ error: error.message }), { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}