
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { generatePrismaClient } from '@/app/lib/utils'

// function runMiddleware(req, res, fn) {
//     return new Promise((resolve, reject) => {
//         fn(req, res, (result) => {
//             if (result instanceof Error) {
//                 return reject(result);
//             }
//             return resolve(result);
//         });
//     });
// }

export async function GET(request) {

    try {
        const response = await prisma.properties.findMany();

        return new NextResponse(JSON.stringify({ response, status: 200 }));
    } catch (error) {
        return new NextResponse(JSON.stringify({ error: error.message }), { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}

export async function PUT(request, response) {


    const { data } = await request.json();

    const prisma = generatePrismaClient(data.connectionString)

    try {

        const response = await prisma.properties.create({
            data: {
                propertyID: parseInt(data.property.propertyID),
                name: data.property.name,
                email: data.property.email,
                fiscalNumber: parseInt(data.property.fiscalNumber),
                address1: data.property.address1,
                country: data.property.country,
                district: data.property.district,
                zipCode: data.property.zipCode,
                phoneNumber: data.property.phoneNumber,
                description: data.property.description,
                abbreviation: data.property.abbreviation,
                designation: data.property.designation,
                organizationID: parseInt(data.property.organizationID)
            }
        });

        return new NextResponse(JSON.stringify({ response, status: 200 }));

    } catch (error) {
        return new NextResponse(JSON.stringify({ error: error.message }), { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}

