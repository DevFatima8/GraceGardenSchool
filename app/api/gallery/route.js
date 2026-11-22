import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

async function listFromDb() {
  const [rows] = await pool.query(
    'SELECT id, image_url, title, created_at FROM gallery_images ORDER BY id DESC'
  );
  return rows;
}

async function seedFromLocalUploadsIfEmpty() {
  const [countRows] = await pool.query('SELECT COUNT(*) AS count FROM gallery_images');
  if (countRows[0]?.count > 0) return;

  const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
  if (!fs.existsSync(uploadsDir)) return;

  const files = fs
    .readdirSync(uploadsDir)
    .filter((file) => /\.(jpg|jpeg|png|gif|webp)$/i.test(file));

  for (const file of files) {
    await pool.query('INSERT INTO gallery_images (image_url, title) VALUES (?, ?)', [
      `/uploads/${file}`,
      file,
    ]);
  }
}

export async function GET() {
  try {
    await seedFromLocalUploadsIfEmpty();
    const rows = await listFromDb();
    const images = rows.map((row) => row.image_url);

    return NextResponse.json(
      { success: true, images, items: rows },
      { headers: { 'Cache-Control': 'no-store' } }
    );
  } catch (error) {
    console.error('Error fetching gallery images:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch images' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const imageUrl = body.image_url || body.imageUrl;
    const title = body.title || '';

    if (!imageUrl) {
      return NextResponse.json({ success: false, error: 'image_url is required' }, { status: 400 });
    }

    const [result] = await pool.query(
      'INSERT INTO gallery_images (image_url, title) VALUES (?, ?)',
      [imageUrl, title]
    );

    return NextResponse.json({
      success: true,
      item: { id: result.insertId, image_url: imageUrl, title },
    });
  } catch (error) {
    console.error('Error adding gallery image:', error);
    return NextResponse.json({ success: false, error: 'Failed to add image' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const body = await request.json();
    const id = body.id;
    const imageUrl = body.image_url || body.imageUrl;

    if (id) {
      await pool.query('DELETE FROM gallery_images WHERE id = ?', [id]);
    } else if (imageUrl) {
      await pool.query('DELETE FROM gallery_images WHERE image_url = ?', [imageUrl]);
    } else {
      return NextResponse.json({ success: false, error: 'id or image_url is required' }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting gallery image:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete image' }, { status: 500 });
  }
}
