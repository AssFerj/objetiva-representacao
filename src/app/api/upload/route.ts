import { NextRequest, NextResponse } from 'next/server';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

// Ensure these are set in your .env file (or .env.local)
const CLOUDFLARE_ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID;
const CLOUDFLARE_ACCESS_KEY_ID = process.env.CLOUDFLARE_ACCESS_KEY_ID; // Server-side only
const CLOUDFLARE_SECRET_ACCESS_KEY = process.env.CLOUDFLARE_SECRET_ACCESS_KEY; // Server-side only
const CLOUDFLARE_BUCKET_NAME = process.env.CLOUDFLARE_BUCKET_NAME;
const CLOUDFLARE_PUBLIC_URL = process.env.CLOUDFLARE_PUBLIC_URL; // Full public base URL of your R2 bucket

if (
  !CLOUDFLARE_ACCOUNT_ID ||
  !CLOUDFLARE_ACCESS_KEY_ID ||
  !CLOUDFLARE_SECRET_ACCESS_KEY ||
  !CLOUDFLARE_BUCKET_NAME ||
  !CLOUDFLARE_PUBLIC_URL
) {
  console.error("Cloudflare R2 environment variables are not fully configured.");
  // In a real app, you might throw an error or handle this more gracefully
  // For now, this will cause issues if not configured, which is a good indicator.
}

const s3Client = new S3Client({
  region: 'auto',
  endpoint: `https://${CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: CLOUDFLARE_ACCESS_KEY_ID!,
    secretAccessKey: CLOUDFLARE_SECRET_ACCESS_KEY!,
  },
});

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const fileName = formData.get('fileName') as string | null;
    const metadataString = formData.get('metadata') as string | null;
    
    const s3Metadata: Record<string, string> = {};
    if (metadataString) {
      try {
        const parsedMetadata = JSON.parse(metadataString);
        if (typeof parsedMetadata === 'object' && parsedMetadata !== null) {
          for (const key in parsedMetadata) {
            if (Object.prototype.hasOwnProperty.call(parsedMetadata, key)) {
              s3Metadata[key] = String(parsedMetadata[key]);
            }
          }
        }
      } catch (e) {
        console.warn("Could not parse or process metadata JSON string:", metadataString, "Error:", e);
        // Proceed with empty metadata or handle error as appropriate
      }
    }

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }
    if (!fileName) {
      return NextResponse.json({ error: 'No fileName provided' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const command = new PutObjectCommand({
      Bucket: CLOUDFLARE_BUCKET_NAME!,
      Key: fileName,
      Body: buffer,
      ContentType: file.type,
      Metadata: s3Metadata, 
    });

    await s3Client.send(command);

    const url = `${CLOUDFLARE_PUBLIC_URL}/${fileName}`;
    return NextResponse.json({ url });

  } catch (error) {
    console.error('Error uploading to R2:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: 'Error uploading file', details: errorMessage }, { status: 500 });
  }
}
