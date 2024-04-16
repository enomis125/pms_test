import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import prisma from "@/app/lib/prisma";
 
export async function GET(request) {
 
    const response = await prisma.guestProfile.findMany()
 
 
    prisma.$disconnect()
 
    return new NextResponse(JSON.stringify({ response, status: 200 }));
}
 
export async function PUT(request) {
 
    try {
        const { data } = await request.json();
        console.log(data.Label)

        const newRecord = await prisma.guestProfile.create({
            data: {
                name: data.name,
                shortName: data.shortName,
                websiteURL: data.websiteURL,
                //geral
                country: parseInt(data.country),
                zipCode: data.zipCode,
                town: data.town,
                region: data.region,
                //dados faturação
                nif: parseInt(data.nif),
                profileType: 2
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