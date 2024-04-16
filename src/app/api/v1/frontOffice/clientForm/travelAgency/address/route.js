import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import prisma from "@/app/lib/prisma";
 
export async function GET(request) {
 
    const response = await prisma.guestAddress.findMany()
 
 
    prisma.$disconnect()
 
    return new NextResponse(JSON.stringify({ response, status: 200 }));
}
 
export async function PUT(request) {
 
    try {
        const { data } = await request.json();
        //console.log(data.Label)
        const newRecord = await prisma.guestAddress.create({
            data: {
                mainAddress: data.mainAddress,
                billingAddress: data.billingAddress,
            }
        });
 
        return new NextResponse(JSON.stringify({newRecord, status: 200 }));
 
    } catch (error) {
        return new NextResponse(JSON.stringify({ error: error.message }), { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}