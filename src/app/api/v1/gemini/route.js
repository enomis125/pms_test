import { GoogleGenerativeAI } from '@google/generative-ai';

// Carregar a chave de API do arquivo .env.local
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function POST(req) {
    const { prompt } = await req.json();

    console.log(process.env.GEMINI_API_KEY)

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = await response.text();
        return new Response(JSON.stringify({ text }), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: 'Erro ao acessar a API do Gemini' }), { status: 500 });
    }
}