import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(request, context) {

    let url = "Movementstk/"

    const idMovement = request.nextUrl.searchParams.get('idMovement') || "";

    if (idMovement !== null) {
        url += idMovement.toString();
    }

    const API_movements = process.env.AUTH_URL + url;

    
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





export async function POST(request, context) {
    try {
        const res = await request.json();
        console.log('entrou_PosMov', res.info);

        const url = "Movementstk/";
        const API_movements = process.env.AUTH_URL + url;

        const AuthString = `${process.env.API_USERNAME}:${process.env.API_PASSWORD}`;
        const encodedAuth = btoa(AuthString);

        const response = await axios.post(API_movements, res.info, {
            headers: {
                "Authorization": `Basic ${encodedAuth}`,
                "Content-Type": "application/json"
            },
        });

        const result = response.data.result;
        return new NextResponse(JSON.stringify({ result, status: 200 }));
    } catch (error) {
        // Aqui você trata o erro
        console.error("Erro ao fazer a solicitação para a API:", error);
        return new NextResponse(JSON.stringify({ error: "Erro ao fazer a solicitação para a API", status: 500 }));
    }
}


export async function PUT(request, context) {
    
    const res = await request.json()
    // console.log('entrou_PutOrder',res.info)

    const url = "Movementstk/"
    const API_movements = process.env.AUTH_URL + url;
    

    const AuthString = `${process.env.API_USERNAME}:${process.env.API_PASSWORD}`

    const encodedAuth = btoa(AuthString)

    const response = await axios.put(API_movements, res.info, {
        headers: {
            "Authorization": `Basic ${encodedAuth}`,
            "Content-Type": "application/json"
        },
    })
    const result = response.data.result

    return new NextResponse(JSON.stringify({ result, status: 200 }));

}