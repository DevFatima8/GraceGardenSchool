import { NextResponse } from 'next/server';
import { uploadImageBuffer } from '@/lib/upload-image';

export async function POST(request) {
  try {
    const data = await request.formData();
    const file = data.get('file');

    if (!file) {
      return NextResponse.json({ success: false, error: 'No file uploaded' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const result = await uploadImageBuffer(buffer, file.name || 'image.jpg');

    return NextResponse.json({
      success: true,
      imageUrl: result.imageUrl,
      provider: result.provider,
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json({ success: false, error: 'Failed to upload file' }, { status: 500 });
  }
}
