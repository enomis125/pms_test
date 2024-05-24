
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import prisma from "@/lib/prisma"


export async function GET(request) {

    const users = await prisma.response.findMany();

    prisma.$disconnect()

    return new NextResponse(JSON.stringify({ response, status: 200 }));
}

export async function PUT(request) {

    try {
        const { data } = await request.json();
        const response = await prisma.users.create({
            data: {
                name: data.Name,
                lastName: data.LastName,
                email: data.Email,
                fiscalNumber: parseInt(data.FiscalNumber),
                phoneNumber: parseInt(data.PhoneNumber),
                address1: data.Address1,
                address2: data.Address2,
                country: data.Country,
                district: data.District,
                zipCode: data.ZipCode,
                password: data.Password,
                roleID: parseInt(data.RoleID),
                organizationID: parseInt(data.OrganizationID)
            }
        });

        return new NextResponse(JSON.stringify({ response, status: 200 }));

    } catch (error) {
        return new NextResponse(JSON.stringify({ error: error.message }), { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}




