
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { generatePrismaClient } from '@/app/lib/utils'

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

export async function PUT(request) {

    try {
        const { data } = await request.json();

        const prisma = generatePrismaClient(data.connectionString)

        const response = await prisma.properties.create({
            data: {
                propertyID: parseInt(data.property.propertyID),
                name: data.property.Name,
                email: data.property.Email,
                fiscalNumber: parseInt(data.property.FiscalNumber),
                address1: data.property.Address1,
                country: data.property.Country,
                district: data.property.District,
                zipCode: data.property.ZipCode,
                phoneNumber: data.property.PhoneNumber,
                description: data.property.Description,
                abbreviation: data.property.Abbreviation,
                designation: data.property.Designation,
                organizationID: parseInt(data.property.OrganizationID)
            }
        });

        return new NextResponse(JSON.stringify({ response, status: 200 }));

        console.log("lado syspms")

    } catch (error) {
        return new NextResponse(JSON.stringify({ error: error.message }), { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}

