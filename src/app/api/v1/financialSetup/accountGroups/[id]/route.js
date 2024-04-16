import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import prisma from "@/app/lib/prisma";
 
export async function GET(request, context) {
 
    // console.log("1")
 
    // const pathname = new URL(request.url).pathname;
 
    // const parts = pathname.split('/');
 
    // const id = parts[parts.length - 1];
 
    const { id } = context.params;
 
    //console.log(id)
 
    const response = await prisma.accountsGroups.findUnique({
        where: {
            accountsGroupsID: parseInt(id)
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
 
        const updateRecord = await prisma.accountsGroups.update({
            where: {
                accountsGroupsID: parseInt(id),
            },
            data: {
                ord1: data.Cod,
                name: data.Abreviature,
                ord2: data.Description,
                dontShow: parseInt(data.Order)
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
 
        //console.log(id)
 
        const deleteRecord = await prisma.accountsGroups.delete({
            where: {
                accountsGroupsID: parseInt(id),
            }
        })
        return new NextResponse(JSON.stringify({status: 200 }));
 
    } catch (error) {
        return new NextResponse(JSON.stringify({ error: error.message }), { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
 
}