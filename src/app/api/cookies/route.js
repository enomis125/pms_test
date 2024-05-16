"use server"

import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken"

export async function GET(request) {

    console.log(jwt.decode(cookies().get("jwt").value))

    return new NextResponse(JSON.stringify({ status: 200 }));
}
