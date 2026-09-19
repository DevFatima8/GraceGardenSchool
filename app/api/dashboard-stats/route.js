import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET(request) {
  try {
    // 1. Total Visits
    const [visitsResult] = await pool.query('SELECT SUM(visits_count) as total_visits FROM site_visits');
    const totalVisits = visitsResult[0]?.total_visits || 0;

    // 2. Active Pages (home_content entries)
    const [pagesResult] = await pool.query('SELECT COUNT(*) as count FROM home_content');
    const activePages = pagesResult[0]?.count || 0;

    // 3. Pending Updates (unread messages)
    const [messagesResult] = await pool.query('SELECT COUNT(*) as count FROM contact_messages WHERE status = "unread"');
    const pendingUpdates = messagesResult[0]?.count || 0;

    // 4. New Admissions (total)
    const [admissionsResult] = await pool.query('SELECT COUNT(*) as count FROM admissions');
    const totalAdmissions = admissionsResult[0]?.count || 0;

    // 5. Visits for Line Chart (last 7 days)
    const [dailyVisits] = await pool.query(`
      SELECT DATE_FORMAT(visit_date, '%a') as name, visits_count as visits 
      FROM site_visits 
      ORDER BY visit_date ASC 
      LIMIT 7
    `);

    // 6. Admissions for Bar Chart (last 6 months)
    const [monthlyAdmissions] = await pool.query(`
      SELECT DATE_FORMAT(created_at, '%b') as name, COUNT(*) as admissions
      FROM admissions
      WHERE created_at >= DATE_SUB(CURDATE(), INTERVAL 6 MONTH)
      GROUP BY DATE_FORMAT(created_at, '%Y-%m'), DATE_FORMAT(created_at, '%b')
      ORDER BY DATE_FORMAT(created_at, '%Y-%m') ASC
    `);

    return NextResponse.json({
      success: true,
      stats: {
        totalVisits,
        activePages,
        pendingUpdates,
        totalAdmissions
      },
      charts: {
        visits: dailyVisits,
        admissions: monthlyAdmissions
      }
    });

  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch stats' }, { status: 500 });
  }
}
