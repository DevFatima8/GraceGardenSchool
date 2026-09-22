import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET(request) {
  try {
    const [rows] = await db.query('SELECT * FROM registrations ORDER BY created_at DESC');
    return NextResponse.json({ success: true, data: rows });
  } catch (error) {
    console.error('Error fetching registrations:', error);
    return NextResponse.json({ success: false, error: 'Database error' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { student_name, parent_name, phone, email, grade, message } = body;

    if (!student_name || !parent_name || !phone || !grade) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }

    const query = `
      INSERT INTO registrations (student_name, parent_name, phone, email, grade, message)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const [result] = await db.query(query, [student_name, parent_name, phone, email || '', grade, message || '']);

    return NextResponse.json({ success: true, message: 'Registration submitted successfully!' });
  } catch (error) {
    console.error('Error submitting registration:', error);
    return NextResponse.json({ success: false, error: 'Database error' }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    const { id, status } = body;
    
    if (!id || !status) {
      return NextResponse.json({ success: false, error: 'Missing ID or Status' }, { status: 400 });
    }

    await db.query('UPDATE registrations SET status = ? WHERE id = ?', [status, id]);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating registration:', error);
    return NextResponse.json({ success: false, error: 'Database error' }, { status: 500 });
  }
}
