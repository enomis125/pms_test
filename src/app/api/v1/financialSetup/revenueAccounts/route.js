import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { generatePrismaClient } from '@/app/lib/utils'

export async function GET(request) {

    const prisma = generatePrismaClient()

    const response = await prisma.revenueAccounts.findMany()

    prisma.$disconnect()

    return new NextResponse(JSON.stringify({ response, status: 200 }));
}

export async function PUT(request) {

    const prisma = generatePrismaClient()

    try {
        const { data } = await request.json();
        console.log(data)
        const newRecord = await prisma.revenueAccounts.create({
            data: {
                name: data.Cod,
                abreviature: data.Abreviature,
                details: data.Details,

                accountsGroupsID: data.AccountGroup,
                taxesID: parseInt(data.Taxes),
                extaxRevenueAccount: parseInt(data.extaxRevenueAccount),

            }
        });

        return new NextResponse(JSON.stringify({ newRecord, status: 200 }));

    } catch (error) {
        return new NextResponse(JSON.stringify({ error: error.message }), { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
