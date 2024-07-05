// lib/nlp.js
import nlp from 'compromise';

export function extractReservationDetails(emailText) {
    let doc = nlp(emailText);

    console.log(doc)

    let name = doc.match('Nome: #Person').text().replace('Nome: ', '').trim();
    let date = doc.match('Data: #Date').text().replace('Data: ', '').trim();
    let time = doc.match('Hora: #Time').text().replace('Hora: ', '').trim();
    let people = doc.match('Pessoas: #Value').text().replace('Pessoas: ', '').trim();

    return { name, date, time, people };
}

export function isValidReservationEmail(emailText) {
    const doc = nlp(emailText);

    const name = doc.match('Nome: #Person').found;
    const date = doc.match('Data: #Date').found;
    const time = doc.match('Hora: #Time').found;
    const people = doc.match('Pessoas: #Value').found;

    return name && date && time && people;
}
