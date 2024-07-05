// getToken.js
const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');

// Carrega as credenciais do cliente a partir do arquivo local
const CREDENTIALS_PATH = 'credentials.json';
const TOKEN_PATH = 'token.json';

fs.readFile(CREDENTIALS_PATH, (err, content) => {
    if (err) return console.log('Error loading client secret file:', err);
    authorize(JSON.parse(content), getAccessToken);
});

/**
 * Cria um cliente OAuth2 com as credenciais fornecidas e executa a função callback para obter o token de acesso.
 * @param {Object} credentials As credenciais do cliente.
 * @param {function} callback A função callback para executar com o cliente autorizado.
 */
function authorize(credentials, callback) {
    const { client_secret, client_id, redirect_uris } = credentials.web;
    const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

    // Verifica se já temos um token guardado
    fs.readFile(TOKEN_PATH, (err, token) => {
        if (err) return getAccessToken(oAuth2Client, callback);
        oAuth2Client.setCredentials(JSON.parse(token));
        callback(oAuth2Client);
    });
}

/**
 * Obtém e armazena o token após a obtenção do código de autorização.
 * @param {google.auth.OAuth2} oAuth2Client O cliente OAuth2 a ser obtido.
 * @param {getEventsCallback} callback A função callback para a chamada à API autorizada.
 */
function getAccessToken(oAuth2Client, callback) {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: ['https://www.googleapis.com/auth/gmail.readonly'],
    });
    console.log('Authorize this app by visiting this url:', authUrl);
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    rl.question('Enter the code from that page here: ', (code) => {
        rl.close();
        oAuth2Client.getToken(code, (err, token) => {
            if (err) return console.error('Error retrieving access token', err);
            oAuth2Client.setCredentials(token);
            // Armazena o token em disco para execuções futuras
            fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
                if (err) return console.error(err);
                console.log('Token stored to', TOKEN_PATH);
            });
            callback(oAuth2Client);
        });
    });
}
