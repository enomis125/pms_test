import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { generatePrismaClient, getPropertyIDFromToken, getUserIDFromToken } from '@/app/lib/utils'
import { cookies } from 'next/headers';

export async function GET(request) {

    const tokenCookie = cookies().get("jwt");

    const prisma = generatePrismaClient()

    const priceDescriptionPricesRecords = await prisma.priceDescriptionPrices.findMany()

    const response = priceDescriptionPricesRecords

    prisma.$disconnect()

    return new NextResponse(JSON.stringify({ response, status: 200 }));
}

export async function PUT(request) {

    const tokenCookie = cookies().get("jwt");

    const prisma = generatePrismaClient()

    const userID = getUserIDFromToken(tokenCookie.value)

    const propertyID = getPropertyIDFromToken(tokenCookie.value)
    
    function removeComma(value) { //Preparação dos valores para o campo com tipo decimal (19,2)
        if (typeof value === 'string') {
            return parseFloat(value.replace(',', '.'));
        }
        return value;
    }
  
    function removeComma(value) { //Preparação dos valores para o campo com tipo decimal (19,2)
        if (typeof value === 'string') {
            return parseFloat(value.replace(',', '.'));
        }
        return value;
    }
    
    try {
        const { data } = await request.json();

        const newRecord = await prisma.priceDescriptionPrices.create({
            data: {
                priceDescriptionID: parseInt(data.priceDescriptionID),
                //roomID: parseInt(data.roomID),
                //typologyID: parseInt(data.rateCodeName),
                p1: removeComma(data.price1),
                p2: removeComma(data.price2),
                p3: removeComma(data.price3),
                p4: removeComma(data.price4),
                p5: removeComma(data.price5),
                p6: removeComma(data.price6),
            }
        });

        return new NextResponse(JSON.stringify({ newRecord, status: 200 }));

    } catch (error) {
        return new NextResponse(JSON.stringify({ error: error.message }), { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}