import { NextResponse } from 'next/server';
import axios from 'axios';
import { listMessages, getMessage } from '../../../lib/gmail';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

function cleanExtractedText(text) {
    return text.replace(/```json/g, '').replace(/```/g, '').trim();
}

export async function GET(req) {
    try {
        const query = 'subject:Reserva para';
        const messages = await listMessages(query);

        if (!messages || messages.length === 0) {
            return NextResponse.json({ message: 'Nenhum e-mail encontrado.' }, { status: 200 });
        }

        for (const message of messages) {
            const email = await getMessage(message.id);
            const emailText = email.snippet;

            const prompt = `Extract reservation details from the following email text:\n\n${emailText}. \n\n I just want you to return the data in JSON format and the returned fields should be: name, date, time, people`;
            const result = await model.generateContent(prompt);
            const response = await result.response;
            const extractedText = await response.text();

            const cleanedText = cleanExtractedText(extractedText);

            console.log(cleanedText)

            let reservationDetails;
            try {
                reservationDetails = JSON.parse(cleanedText);
            } catch (error) {
                console.error('Erro ao analisar o texto extraído pelo Gemini:', error.message);
                continue;
            }

            const { name, date, time, people } = reservationDetails;

            // console.log(name);

            // try {
            //     const response = await axios.post('http://localhost:3001/api/v1/bookings', {
            //         name, date, time, people
            //     });

            //     console.log('Resposta da API de reservas:', response.data);
            // } catch (error) {
            //     console.error('Erro ao fazer a requisição POST para a API de reservas:', error.message);
            //     throw error;
            // }

            // console.log(`Reserva criada para ${name} no dia ${date} às ${time} para ${people} pessoas.`);
        }

        return NextResponse.json({ message: 'E-mails processados e reservas criadas.' }, { status: 200 });
    } catch (error) {
        console.error('Erro ao processar e-mails:', error);
        return NextResponse.json({ error: 'Erro ao processar e-mails.' }, { status: 500 });
    }
}
