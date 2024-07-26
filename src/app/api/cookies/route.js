"use server"

import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken"

const MAIN_PROJECT_URL = 'http://localhost:3000';

export async function GET(request) {
    const tokenCookie = cookies().get("jwt");

    if (!tokenCookie) {
        return NextResponse.redirect(`${MAIN_PROJECT_URL}`); // Redirect to main project login page
    }
    const token = jwt.decode(tokenCookie.value);

    if (!token) {
        return NextResponse.redirect(`${MAIN_PROJECT_URL}`); // Redirect to main project login page
    }

    const propertyID = token.propertyID;
    const connectionString = token.connectionString;
    const userID = token.userID;

    return new NextResponse(JSON.stringify({ status: 200, connectionString, propertyID, userID }), { status: 200 });
}