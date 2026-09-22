import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET(request) {
  try {
    const [rows] = await pool.query('SELECT json_data FROM home_content WHERE section_id = ?', ['team_members']);
    if (rows.length > 0 && rows[0].json_data) {
      // In case it's a string from DB, parse it. Sometimes mysql driver parses it automatically if it's JSON type
      let data = rows[0].json_data;
      if (typeof data === 'string') {
        data = JSON.parse(data);
      }
      return NextResponse.json({ success: true, data });
    }
    return NextResponse.json({ success: true, data: [] });
  } catch (error) {
    console.error('Error fetching team content:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch content' }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const data = await request.json();
    
    // Validate data structure if needed
    if (!Array.isArray(data)) {
        return NextResponse.json({ success: false, error: 'Expected an array of team members' }, { status: 400 });
    }

    const jsonDataStr = JSON.stringify(data);

    // Update or Insert
    await pool.query(
      `INSERT INTO home_content (section_id, title, subtitle, description, image_url, json_data)
       VALUES (?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE
       json_data = VALUES(json_data)`,
      ['team_members', 'Our Team', '', '', '', jsonDataStr]
    );

    return NextResponse.json({ success: true, message: 'Team updated successfully' });
  } catch (error) {
    console.error('Error updating team content:', error);
    return NextResponse.json({ success: false, error: 'Failed to update content' }, { status: 500 });
  }
}
