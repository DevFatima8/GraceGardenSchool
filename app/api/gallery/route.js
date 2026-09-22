import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    
    if (!fs.existsSync(uploadsDir)) {
        return NextResponse.json({ success: true, images: [] });
    }

    const files = fs.readdirSync(uploadsDir);
    
    // Filter out only image files and get their stats
    const images = files
      .filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file))
      .map(file => {
        const filePath = path.join(uploadsDir, file);
        const stats = fs.statSync(filePath);
        return {
          url: `/uploads/${file}`,
          time: stats.mtimeMs
        };
      })
      .sort((a, b) => b.time - a.time) // Descending order
      .map(img => img.url);

    return NextResponse.json({ success: true, images });
  } catch (error) {
    console.error('Error fetching gallery images:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch images' }, { status: 500 });
  }
}
