import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  try {
    // 1. Total Visits
    const [visitsResult] = await pool.query('SELECT SUM(visits_count) as total_visits FROM site_visits');
    const totalVisits = visitsResult[0]?.total_visits || 0;

    // 2. Active Pages (home_content entries)
    const [pagesResult] = await pool.query('SELECT COUNT(*) as count FROM home_content');
    const activePages = pagesResult[0]?.count || 0;



    // 5. Visits for Line Chart (last 7 days)
    const [dailyVisits] = await pool.query(`
      SELECT DATE_FORMAT(visit_date, '%a') as name, visits_count as visits 
      FROM site_visits 
      ORDER BY visit_date ASC 
      LIMIT 7
    `);


    return NextResponse.json({
      success: true,
      stats: {
        totalVisits,
        activePages
      },
      charts: {
        visits: dailyVisits
      }
    });

  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch stats' }, { status: 500 });
  }
}
