import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET(request) {
  try {
    const [rows] = await pool.query('SELECT * FROM home_content');
    return NextResponse.json({ success: true, data: rows });
  } catch (error) {
    console.error('Error fetching home content:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch content' }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const { section_id, title, subtitle, description, image_url, json_data } = await request.json();
    
    if (!section_id) {
      return NextResponse.json({ success: false, error: 'section_id is required' }, { status: 400 });
    }

    const jsonDataStr = json_data ? JSON.stringify(json_data) : null;

    const [result] = await pool.query(
      `INSERT INTO home_content (section_id, title, subtitle, description, image_url, json_data)
       VALUES (?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE
       title = VALUES(title),
       subtitle = VALUES(subtitle),
       description = VALUES(description),
       image_url = VALUES(image_url),
       json_data = VALUES(json_data)`,
      [section_id, title, subtitle, description, image_url, jsonDataStr]
    );

    return NextResponse.json({ success: true, message: 'Content updated successfully' });
  } catch (error) {
    console.error('Error updating home content:', error);
    return NextResponse.json({ success: false, error: 'Failed to update content' }, { status: 500 });
  }
}
