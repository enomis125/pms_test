import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import prisma from "@/app/lib/prisma";
 
export async function GET(request) {
 
    const response = await prisma.country.findMany()
 
 
    prisma.$disconnect()
 
    return new NextResponse(JSON.stringify({ response, status: 200 }));
}
 
export async function PUT(request) {
 
    try {
        const { data } = await request.json();
        //console.log(data.Label)
        const newRecord = await prisma.country.create({
            data: {
                countryAddress: data.countryAddress,
                countryNationality: data.countryNationality,
                countryEmission: data.countryEmission,
                countryBilling: data.countryBilling,
            }
        });
 
        return new NextResponse(JSON.stringify({newRecord, status: 200 }));
 
    } catch (error) {
        return new NextResponse(JSON.stringify({ error: error.message }), { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}