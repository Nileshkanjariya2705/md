import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME || process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    if (!cloudName || !apiKey || !apiSecret) {
      return NextResponse.json(
        { error: 'Cloudinary credentials are not configured on the server. Please check your .env configuration.' },
        { status: 500 }
      );
    }

    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const folder = (formData.get('folder') as string) || 'magnovaa';

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { error: 'Only image files (PNG, JPG, WebP, GIF) are allowed' },
        { status: 400 }
      );
    }

    const maxBytes = 10 * 1024 * 1024; // 10MB
    if (file.size > maxBytes) {
      return NextResponse.json(
        { error: 'File size exceeds maximum 10MB limit' },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const timestamp = Math.floor(Date.now() / 1000);

    // Cloudinary signature formula: alphabetical sort of parameters, concatenated with api_secret
    const stringToSign = `folder=${folder}&timestamp=${timestamp}${apiSecret}`;
    const signature = crypto.createHash('sha1').update(stringToSign).digest('hex');

    const uploadFormData = new FormData();
    const blob = new Blob([buffer], { type: file.type });
    uploadFormData.append('file', blob, file.name);
    uploadFormData.append('api_key', apiKey);
    uploadFormData.append('timestamp', timestamp.toString());
    uploadFormData.append('signature', signature);
    uploadFormData.append('folder', folder);

    const cloudinaryRes = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: 'POST',
        body: uploadFormData,
      }
    );

    const result = await cloudinaryRes.json();

    if (!cloudinaryRes.ok) {
      console.error('Cloudinary upload error:', result);
      return NextResponse.json(
        { error: result.error?.message || 'Failed to upload image to Cloudinary' },
        { status: cloudinaryRes.status }
      );
    }

    return NextResponse.json({
      url: result.secure_url || result.url,
      public_id: result.public_id,
      width: result.width,
      height: result.height,
      format: result.format,
    });
  } catch (error: unknown) {
    console.error('Upload handler error:', error);
    return NextResponse.json(
      { error: (error as Error)?.message || 'Internal server error during upload' },
      { status: 500 }
    );
  }
}
