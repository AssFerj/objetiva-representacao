import { google } from 'googleapis';
import formidable from 'formidable';
import { createReadStream } from 'fs';

export const config = {
  api: {
    bodyParser: false,
  },
};

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.VITE_GOOGLE_CLIENT_EMAIL,
    private_key: process.env.VITE_GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
  scopes: ['https://www.googleapis.com/auth/drive.file'],
});

const drive = google.drive({ version: 'v3', auth });

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', process.env.VERCEL_URL || 'http://localhost:5173');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  try {
    const form = formidable();
    
    const [fields, files] = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        resolve([fields, files]);
      });
    });

    const file = files.file[0];
    const fileName = fields.fileName[0];
    const metadata = fields.metadata ? JSON.parse(fields.metadata[0]) : {};

    if (!file) {
      return res.status(400).json({ message: 'Nenhum arquivo enviado' });
    }

    // Create file metadata
    const fileMetadata = {
      name: fileName,
      parents: [process.env.VITE_GOOGLE_DRIVE_FOLDER_ID],
      properties: metadata,
    };

    // Create media
    const media = {
      mimeType: file.mimetype,
      body: createReadStream(file.filepath),
    };

    // Upload file
    const response = await drive.files.create({
      requestBody: fileMetadata,
      media: media,
      fields: 'id, webViewLink',
    });

    if (!response.data.webViewLink) {
      throw new Error('Não foi possível obter o link do arquivo');
    }

    res.status(200).json({ webViewLink: response.data.webViewLink });
  } catch (error) {
    console.error('Error uploading to Google Drive:', error);
    res.status(500).json({ message: 'Erro ao enviar arquivo para o Google Drive' });
  }
}
