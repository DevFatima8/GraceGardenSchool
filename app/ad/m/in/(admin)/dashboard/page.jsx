'use client';

import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

export default function DashboardPage() {
  const [dashboardData, setDashboardData] = useState({
    stats: { totalVisits: 0, activePages: 0, pendingUpdates: 0, totalAdmissions: 0 },
    charts: { visits: [], admissions: [] }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/dashboard-stats')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setDashboardData(data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h3 className="fw-bold mb-4">Dashboard Overview</h3>
      <div className="row mb-4">
        <div className="col-md-3 mb-4 mb-md-0">
          <div className="card shadow-sm border-0 text-white h-100" style={{ backgroundColor: 'var(--primary-color-1)' }}>
            <div className="card-body">
              <h6 className="card-title text-white-50">Total Visits</h6>
              <h2 className="mb-0 fw-bold">{loading ? '...' : dashboardData.stats.totalVisits}</h2>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-4 mb-md-0">
          <div className="card shadow-sm border-0 text-white h-100" style={{ backgroundColor: 'var(--primary-color-2)' }}>
            <div className="card-body">
              <h6 className="card-title text-white-50">Active Pages</h6>
              <h2 className="mb-0 fw-bold">{loading ? '...' : dashboardData.stats.activePages}</h2>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-4 mb-md-0">
          <div className="card shadow-sm border-0 text-white h-100" style={{ backgroundColor: 'var(--primary-color-3)' }}>
            <div className="card-body">
              <h6 className="card-title text-white-50">Pending Updates</h6>
              <h2 className="mb-0 fw-bold">{loading ? '...' : dashboardData.stats.pendingUpdates}</h2>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow-sm border-0 text-white h-100" style={{ backgroundColor: '#198754' }}>
            <div className="card-body">
              <h6 className="card-title text-white-50">New Admissions</h6>
              <h2 className="mb-0 fw-bold">{loading ? '...' : dashboardData.stats.totalAdmissions}</h2>
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-lg-6 mb-4 mb-lg-0">
          <div className="card shadow-sm border-0 p-4 h-100">
            <h6 className="fw-bold mb-4">Website Visits (This Week)</h6>
            <div style={{ height: '300px', width: '100%' }}>
              {loading ? <div className="d-flex h-100 align-items-center justify-content-center text-muted">Loading...</div> : (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={dashboardData.charts.visits} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} />
                    <RechartsTooltip />
                    <Line type="monotone" dataKey="visits" stroke="var(--primary-color-1)" strokeWidth={4} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>
        </div>
        
        <div className="col-lg-6">
          <div className="card shadow-sm border-0 p-4 h-100">
            <h6 className="fw-bold mb-4">New Admissions (Last 6 Months)</h6>
            <div style={{ height: '300px', width: '100%' }}>
              {loading ? <div className="d-flex h-100 align-items-center justify-content-center text-muted">Loading...</div> : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dashboardData.charts.admissions} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} />
                    <RechartsTooltip cursor={{fill: 'transparent'}} />
                    <Bar dataKey="admissions" fill="var(--primary-color-2)" radius={[6, 6, 0, 0]} barSize={40} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
