import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { generatePrismaClient, getPropertyIDFromToken, getUserIDFromToken } from '@/app/lib/utils'
import { cookies } from 'next/headers';

export async function GET(request) {

    const tokenCookie = cookies().get("jwt");

    const prisma = generatePrismaClient()

    const propertyID = getPropertyIDFromToken(tokenCookie.value)

    const ratecodedetailsRecords = await prisma.ratecodedetails.findMany({
        where: {
            propertyID: propertyID
        }
    })

    const response = ratecodedetailsRecords

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

    
    try {
        const { data } = await request.json();
        
        const validFrom = new Date(data.inicio);
        const validUntil = new Date(data.fim);

        const newRecord = await prisma.ratecodedetails.create({
            data: {
                //Linha 1
                rateCodeID: parseInt(data.rateCodeName),
                rateCodeDetName: data.nome,
                propertyID: propertyID,
                createdBy: userID,
                //Linha 2
                validFrom: validFrom,
                validUntil: validUntil,
                //Linha 3
                stayLen1: parseInt(data.minNoites),
                stayLen2: parseInt(data.maxNoites),
                minAdults: parseInt(data.minOcupação),
                maxAdults: parseInt(data.maxOcupação),
                //Linha 4

                //Linha 5
                roomType1: parseInt(data.tq1),
                roomType2: parseInt(data.tq2),
                roomType3: parseInt(data.tq3),
                roomType4: parseInt(data.tq4),
                roomType5: parseInt(data.tq5),
                //Linha 6
                roomID: parseInt(data.quarto),
                //Linha 7
                an1: data.an1,
                an2: data.an2,
                an3: data.an3,
                an4: data.an4,
                an5: data.an5,
                an6: data.an6,
                an7: data.an7,
                //Linha 8
                //currency: parseInt(data.cl),
                //Linha 9
                internalName: data.textoInt,
                //Linha 10
                packageNr: parseInt(data.numeroPackage),
                //Linha 11
                season: data.epoca,
                we1: data.we1,
                we2: data.we2,
                we3: data.we3,
                we4: data.we4,
                we5: data.we5,
                we6: data.we6,
                we7: data.we7,
                //Linha 12
                p1: removeComma(data.price1),
                p2: removeComma(data.price2),
                p3: removeComma(data.price3),
                p4: removeComma(data.price4),
                p5: removeComma(data.price5),
                p6: removeComma(data.price6),
                //Linha 13
                mp1: removeComma(data.minPrice1),
                mp2: removeComma(data.minPrice2),
                mp3: removeComma(data.minPrice3),
                mp4: removeComma(data.minPrice4),
                mp5: removeComma(data.minPrice5),
                mp6: removeComma(data.minPrice6),
                //Linha 14
                wep1: removeComma(data.wePrice1),
                wep2: removeComma(data.wePrice2),
                wep3: removeComma(data.wePrice3),
                wep4: removeComma(data.wePrice4),
                wep5: removeComma(data.wePrice5),
                wep6: removeComma(data.wePrice6),
                //Linha 15
                wemp1: removeComma(data.weMinPrice1),
                wemp2: removeComma(data.weMinPrice2),
                wemp3: removeComma(data.weMinPrice3),
                wemp4: removeComma(data.weMinPrice4),
                wemp5: removeComma(data.weMinPrice5),
                wemp6: removeComma(data.weMinPrice6),
            }
        });

        return new NextResponse(JSON.stringify({ newRecord, status: 200 }));

    } catch (error) {
        return new NextResponse(JSON.stringify({ error: error.message }), { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}