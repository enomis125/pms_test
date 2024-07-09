import { NextResponse } from "next/server";
import path from "path";
import { writeFile, readFile } from "fs/promises";
import { generatePrismaClient, getPropertyIDFromToken } from '@/app/lib/utils';
import { cookies } from 'next/headers';
import { encrypt } from "@/app/lib/encryption";
import { getCrentials } from "@/app/lib/email";

export async function POST(req, res) {
    const tokenCookie = cookies().get("jwt");
    const prisma = generatePrismaClient();
    const propertyID = getPropertyIDFromToken(tokenCookie.value);

    console.log(propertyID);

    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
        return NextResponse.json({ error: "No files received." }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const encryptedData = encrypt(buffer.toString('utf-8'));
    const filename = `${propertyID}_credentials.json`; // Usando propertyID para o nome do arquivo
    console.log(filename);

    try {
        await writeFile(
            path.join(process.cwd(), "credentials/" + filename),
            encryptedData
        );
        return NextResponse.json({ Message: "Success", status: 201 });
    } catch (error) {
        console.log("Erro ocorrido ", error);
        return NextResponse.json({ Message: "Failed", status: 500 });
    }
}

export async function GET(req, res) {
    const tokenCookie = cookies().get("jwt");
    const propertyID = getPropertyIDFromToken(tokenCookie.value);

    const credentials = await getCrentials(propertyID)

    return new NextResponse(JSON.stringify({ response: credentials, status: 200 }))
}
