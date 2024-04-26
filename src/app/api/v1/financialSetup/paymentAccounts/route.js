import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import prisma from "@/app/lib/prisma";

export async function GET(request) {

    const response = await prisma.paymentmethods.findMany()


    prisma.$disconnect()

    return new NextResponse(JSON.stringify({ response, status: 200 }));
}

export async function PUT(request) {

    try {
        const { data } = await request.json();
        console.log(data)
        const newRecord = await prisma.paymentmethods.create({
            data: {
                name: data.description,
                mainGroup: parseInt(data.abreviature),
                externalNumberShort: data.cod,
                accountsGroupID: data.AccountGroup.toString(),
                departmentID: data.DepartmentID
            }
        });

        return new NextResponse(JSON.stringify({newRecord, status: 200 }));

    } catch (error) {
        return new NextResponse(JSON.stringify({ error: error.message }), { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
