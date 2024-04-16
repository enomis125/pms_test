import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import prisma from "@/app/lib/prisma";
 
export async function GET(request, context) {
 
    // console.log("1")
 
    // const pathname = new URL(request.url).pathname;
 
    // const parts = pathname.split('/');
 
    // const id = parts[parts.length - 1];
 
    const { id } = context.params;
 
    console.log(id)
 
    const response = await prisma.guestProfile.findUnique({
        where: {
            guestProfileID: parseInt(id)
        }
    })
 
    if (!response) {
        return new NextResponse(JSON.stringify({status: 404 }));
    }
 
    prisma.$disconnect()
 
    return new NextResponse(JSON.stringify({response, status: 200 }));
}
 
export async function PATCH(request, context) {
 
    try {
        const { id } = context.params;
        const { data } = await request.json();
        const birthday = new Date(data.birthday);
        const updateRecord = await prisma.guestProfile.update({
            where: {
                guestProfileID: parseInt(id),
            },
            data: {
                companyName: data.companyName,
                companyName2: data.companyName2,
                profileType: parseInt(data.profileType),
                country: parseInt(data.country),
                zipCodePostBox: data.zipCodePostBox,
                //countryAddress: parseInt(data.countryAddress)
                town: data.town,
                region: data.region,
                websiteURL: data.websiteURL,
            }
        })
        return new NextResponse(JSON.stringify({status: 200 }));
 
    } catch (error) {
        return new NextResponse(JSON.stringify({ error: error.message }), { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
 
}
 
export async function DELETE(request, context) {
 
    try {
        const { id } = context.params;
 
        console.log(id)
 
        const deleteRecord = await prisma.guestProfile.delete({
            where: {
                guestProfileID: parseInt(id),
            }
        })
        return new NextResponse(JSON.stringify({status: 200 }));
 
    } catch (error) {
        return new NextResponse(JSON.stringify({ error: error.message }), { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
 
}