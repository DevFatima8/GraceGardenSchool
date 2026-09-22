import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const pageSlug = searchParams.get('page_slug');

    let query = 'SELECT * FROM our_school_content';
    let params = [];

    if (pageSlug) {
      query += ' WHERE page_slug = ?';
      params.push(pageSlug);
    }

    const [rows] = await pool.query(query, params);
    return NextResponse.json({ success: true, data: rows });
  } catch (error) {
    console.error('Error fetching our school content:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch content' }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const { page_slug, section_id, title, subtitle, description, image_url, json_data } = await request.json();
    
    if (!page_slug || !section_id) {
      return NextResponse.json({ success: false, error: 'page_slug and section_id are required' }, { status: 400 });
    }

    const jsonDataStr = json_data ? JSON.stringify(json_data) : null;

    const [result] = await pool.query(
      `INSERT INTO our_school_content (page_slug, section_id, title, subtitle, description, image_url, json_data)
       VALUES (?, ?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE
       title = VALUES(title),
       subtitle = VALUES(subtitle),
       description = VALUES(description),
       image_url = VALUES(image_url),
       json_data = VALUES(json_data)`,
      [page_slug, section_id, title, subtitle, description, image_url, jsonDataStr]
    );

    return NextResponse.json({ success: true, message: 'Content updated successfully' });
  } catch (error) {
    console.error('Error updating our school content:', error);
    return NextResponse.json({ success: false, error: 'Failed to update content' }, { status: 500 });
  }
}
