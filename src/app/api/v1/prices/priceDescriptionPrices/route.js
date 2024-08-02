import { NextRequest, NextResponse } from "next/server";
import { generatePrismaClient, getPropertyIDFromToken, getUserIDFromToken } from '@/app/lib/utils';
import { cookies } from 'next/headers';

export async function GET(request) {

  const tokenCookie = cookies().get("jwt");

  const prisma = generatePrismaClient()

  const priceDescriptionPricesTypologyRecords = await prisma.priceDescriptionPricesTypology.findMany()

  const response = priceDescriptionPricesTypologyRecords

  prisma.$disconnect()

  return new NextResponse(JSON.stringify({ response, status: 200 }));
}

export async function PUT(request) {
  const tokenCookie = cookies().get("jwt");

  if (!tokenCookie) {
    return new NextResponse(JSON.stringify({ error: "Unauthorized: No token provided" }), { status: 401 });
  }

  const prisma = generatePrismaClient();

  let userID, propertyID;
  try {
    userID = getUserIDFromToken(tokenCookie.value);
    propertyID = getPropertyIDFromToken(tokenCookie.value);
  } catch (error) {
    console.error("Error extracting userID or propertyID from token:", error.message);
    return new NextResponse(JSON.stringify({ error: "Invalid token" }), { status: 400 });
  }

  function removeComma(value) {
    if (typeof value === 'string') {
      return parseFloat(value.replace(',', '.'));
    }
    return value;
  }

  try {
    const requestData = await request.json();
    console.log("Received data3333:", requestData);

    const data = requestData.data;

    if (!Array.isArray(data) || data.length === 0) {
      throw new Error("Invalid input data: Expected an array of objects");
    }

    const newRecords = await prisma.priceDescriptionPricesTypology.createMany({
      data: data.map(priceData => ({
        priceDescriptionHeaderID: parseInt(priceData.priceDescriptionID),
        typologyID: priceData.Typology,
        p1: removeComma(priceData.Preco1),
        p2: removeComma(priceData.Preco2),
        p3: removeComma(priceData.Preco3),
        p4: removeComma(priceData.Preco4),
        p5: removeComma(priceData.Preco5),
        p6: removeComma(priceData.Preco6),
        createdBy: userID
      })),
    });

    await prisma.$disconnect();
    return new NextResponse(JSON.stringify({ newRecords, status: 200 }));
  } catch (error) {
    console.error("Error during PUT request:", error.message, error.stack);
    await prisma.$disconnect();
    return new NextResponse(JSON.stringify({ error: error.message }), { status: 500 });
  }
}