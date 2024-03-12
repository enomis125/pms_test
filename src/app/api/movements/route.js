

import { NextRequest, NextResponse } from "next/server";
import axios from "axios";



export async function GET(request, context) {

    let url = "Movementsstk/"


    
    const filtros = request.nextUrl.searchParams.get('filtros') || "";
    const page = request.nextUrl.searchParams.get('page') || 1;
    const per_page = request.nextUrl.searchParams.get('per_page') || 15;



    if (filtros !== null) {
        url += filtros.toString();
    }

    if (page !== null) {
        url += "/";
        url += page.toString();
    }

    if (per_page !== null) {
        url += "/";
        url += per_page.toString();
    }

    const API_movements = process.env.AUTH_URL + url;

    //console.log('API_movements:',API_movements)
    const AuthString = `${process.env.API_USERNAME}:${process.env.API_PASSWORD}`

    const encodedAuth = btoa(AuthString)

    const response_movements = await axios.get(API_movements, {
        headers: {
            "Authorization": `Basic ${encodedAuth}`,
            "Content-Type": "application/json"
        }
    });

    if (response_movements.status = 200)
    {
        const response = JSON.parse(response_movements.data.result)
  
        return new NextResponse(JSON.stringify({ response, status: 200 }));
    }
    else    
    return new NextResponse(JSON.stringify({'message': 'Tem de  fazer login para acessar a estas informações', 'error': True}));
    
}