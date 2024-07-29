import { NextRequest, NextResponse } from "next/server";
import { generatePrismaClient, getPropertyIDFromToken, getUserIDFromToken } from '@/app/lib/utils';
import { cookies } from 'next/headers';

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
    console.log("Received data:", requestData);

    const data = requestData.data;
    
    if (!Array.isArray(data) || data.length === 0) {
      throw new Error("Invalid input data: Expected an array of objects");
    }

    console.log(data);

    const newRecords = await prisma.priceDescriptionPricesRooms.createMany({
      data: data.filter(price => 
        price !== undefined &&
        (price.PrecoQuarto1 || price.PrecoQuarto2 || price.PrecoQuarto3 || 
         price.PrecoQuarto4 || price.PrecoQuarto5 || price.PrecoQuarto6)
      ).map(price => ({
        priceDescriptionHeaderID: parseInt(price.priceDescriptionID),
        roomID: parseInt(price.Room),
        p1: removeComma(price.PrecoQuarto1),
        p2: removeComma(price.PrecoQuarto2),
        p3: removeComma(price.PrecoQuarto3),
        p4: removeComma(price.PrecoQuarto4),
        p5: removeComma(price.PrecoQuarto5),
        p6: removeComma(price.PrecoQuarto6),
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
