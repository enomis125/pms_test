import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import {
  generatePrismaClient,
  getPropertyIDFromToken,
  getUserIDFromToken,
} from "@/app/lib/utils";
import { cookies } from "next/headers";

export async function GET(request) {
  const prisma = generatePrismaClient();

  try {
    const housekeepingRecords = await prisma.housekeeping.findMany();

    return new NextResponse(
      JSON.stringify({ housekeepingRecords, status: 200 })
    );
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  } finally {
    await prisma.$disconnect();
  }
}

export async function PUT(request) {
  const tokenCookie = cookies().get("jwt");
  const prisma = generatePrismaClient();
  const userID = getUserIDFromToken(tokenCookie.value);
  const propertyID = getPropertyIDFromToken(tokenCookie.value);

  try {
    const { data } = await request.json();

    // Função para converter strings em objetos Date
    const parseDate = (dateStr) => {
      if (dateStr) {
        return new Date(dateStr);
      }
      return null;
    };

    const newRecord = await prisma.housekeeping.create({
      data: {
        hotelCode: parseInt(data.HotelCode),
        stationID: parseInt(data.StationID),
        bookingNumber: parseInt(data.BookingNumber),
        startDate: parseDate(data.StartDate),
        endDate: parseDate(data.EndDate),
        roomNumber: parseInt(data.RoomNumber),
        categoryNumber: parseInt(data.CategoryNumber),
        customerID: parseInt(data.CustomerID),
        bookingStatus: parseInt(data.BookingStatus),
        globalBookingID: parseInt(data.GlobalBookingID),
        globalStartDate: parseDate(data.GlobalStartDate),
        globalEndDate: parseDate(data.GlobalEndDate),
        groupMaster: parseInt(data.GroupMaster),
        groupNumber: parseInt(data.GroupNumber),
        roomStatus: parseInt(data.RoomStatus),
        laundry: parseInt(data.Laundry),
        housekeepingDate: parseDate(data.HousekeepingDate),
        housekeepingTime: data.HousekeepingTime,
        loyaltyPoints: parseInt(data.LoyaltyPoints),
        referenceNumber: parseInt(data.ReferenceNumber),
        reservationCharacter: parseInt(data.ReservationCharacter),
        relocation: parseInt(data.Relocation),
        bookingText: data.BookingText,
        arrivalTime: data.ArrivalTime,
        departureTime: data.DepartureTime,
        priority: parseInt(data.Priority),
        fromRoomNumber: parseInt(data.FromRoomNumber),
        fromOccupancy: parseInt(data.FromOccupancy),
        fromTask: data.FromTask,
        isDeleted: parseInt(data.IsDeleted),
        daysNotOccupied: parseInt(data.DaysNotOccupied),
        suiteNumber: parseInt(data.SuiteNumber),
      },
    });

    return new NextResponse(JSON.stringify({ newRecord, status: 200 }));
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  } finally {
    await prisma.$disconnect();
  }
}
