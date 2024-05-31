"use server"

import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken"

export async function GET(request) {
    const tokenCookie = cookies().get("jwt");

    if (!tokenCookie) {
        return new NextResponse(JSON.stringify({ status: 401, message: "Token não encontrado" }), { status: 401 });
    }
    const token = jwt.decode(tokenCookie.value);

    if (!token) {
        return new NextResponse(JSON.stringify({ status: 400, message: "Token inválido" }), { status: 400 });
    }

    const propertyID = token.propertyID;
    const connectionString = token.connectionString;
    const userID = token.userID;

    return new NextResponse(JSON.stringify({ status: 200, connectionString, propertyID, userID }), { status: 200 });
}
