import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(request) {
    
    const API_Movimenttype = process.env.AUTH_URL + "Movimenttype";
    const AuthString = `${process.env.API_USERNAME}:${process.env.API_PASSWORD}`
    const encodedAuth = btoa(AuthString)
    const Movimenttype = await axios.get(API_Movimenttype, {
        headers: {
            "Authorization": `Basic ${encodedAuth}`,
            "Content-Type": "application/json"
        }
    })
    const response = JSON.parse(Movimenttype.data.result)

    return new NextResponse(JSON.stringify({ response, status: 200 }))
}