import jwt from 'jsonwebtoken';
import { getPrismaClient } from "@/app/lib/prisma";
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from "next/server";


const getPropertyIDFromToken = (token) => {

    if (!token) {
        throw new Error("Token is required to initialize PrismaClient");
    }

    const decodedToken = jwt.decode(token);
    if (!decodedToken || !decodedToken.propertyID) {
        throw new Error("Invalid token");
    }

    const propertyID = decodedToken.propertyID;

    return propertyID
}

const getUserIDFromToken = (token) => {

    if (!token) {
        throw new Error("Token is required to initialize PrismaClient");
    }

    const decodedToken = jwt.decode(token);

    if (!decodedToken || !decodedToken.userID) {
        throw new Error("Invalid token");
    }

    const userID = decodedToken.userID;

    return userID
}

const generatePrismaClient = (connectionString) => {

    if (!connectionString) {

        const tokenCookie = cookies().get("jwt");

        if (!tokenCookie) {
            return NextResponse.json({ status: 401, message: "Token not found" }, { status: 401 });
        }

        const prisma = getPrismaClient(tokenCookie.value, true);

        return prisma
    }

    const prisma = getPrismaClient(connectionString, false);

    return prisma

}

export { getPropertyIDFromToken, generatePrismaClient, getUserIDFromToken };