import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { PrismaClient } from "@prisma/client";

export async function GET(request) {

    const prisma = new PrismaClient()

    const gendersRecords = await prisma.genders.findMany()

    const response = gendersRecords

    prisma.$disconnect()

    return new NextResponse(JSON.stringify({ response, status: 200 }));
}