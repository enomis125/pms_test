import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';

const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];

function getAuthenticatedClient() {
    const {
        GOOGLE_CLIENT_ID,
        GOOGLE_CLIENT_SECRET,
        GOOGLE_REDIRECT_URI,
        GOOGLE_REFRESH_TOKEN,
        GOOGLE_ACCESS_TOKEN,
        GOOGLE_EXPIRY_DATE
    } = process.env;

    const oAuth2Client = new OAuth2Client(
        GOOGLE_CLIENT_ID,
        GOOGLE_CLIENT_SECRET,
        GOOGLE_REDIRECT_URI
    );

    oAuth2Client.setCredentials({
        refresh_token: GOOGLE_REFRESH_TOKEN,
        access_token: GOOGLE_ACCESS_TOKEN,
        expiry_date: Number(GOOGLE_EXPIRY_DATE)
    });

    return oAuth2Client;
}

export async function listMessages(query) {
    const auth = getAuthenticatedClient();
    const gmail = google.gmail({ version: 'v1', auth });

    const res = await gmail.users.messages.list({
        userId: 'me',
        q: query,
    });

    return res.data.messages;
}

export async function getMessage(messageId) {
    const auth = getAuthenticatedClient();
    const gmail = google.gmail({ version: 'v1', auth });

    const res = await gmail.users.messages.get({
        userId: 'me',
        id: messageId,
    });

    return res.data;
}
