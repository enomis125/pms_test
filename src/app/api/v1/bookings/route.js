// src/app/api/v1/reservations/route.js
import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        const body = await req.json();
        const { date, time, people, name } = body;

        console.log(name, date, time, people)

        // Simula a criação da reserva
        console.log(`Reserva criada para ${name} no dia ${date} às ${time} para ${people} pessoas.`);

        return NextResponse.json({ message: 'Reserva criada com sucesso!' }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Erro ao criar a reserva.' }, { status: 500 });
    }
}

export async function GET(req) {
    console.log("aaaaaaaaaa")

    return NextResponse.json({ message: "abc123" }, { status: 200 });
}




