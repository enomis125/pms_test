import { readFile } from "fs/promises";
import { decrypt } from "./encryption";
import { NextResponse } from "next/server";
import path from "path";



export async function getCrentials(propertyID) {
    const filename = `${propertyID}_credentials.json`;
    console.log(filename);

    try {
        const encryptedData = await readFile(path.join(process.cwd(), "credentials/" + filename), 'utf-8');
        const decryptedData = decrypt(encryptedData);
        const jsonData = JSON.parse(decryptedData);

        return jsonData
    } catch (error) {
        console.log("Erro ocorrido ", error);
        return new NextResponse(JSON.stringify({ Message: "Failed", status: 500 }));
    }
}