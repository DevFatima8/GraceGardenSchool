'use client';
import React, { useState, useEffect } from 'react';

export default function RegistrationsManager() {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchRegistrations = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/registrations');
      const data = await res.json();
      if (data.success) {
        setRegistrations(data.data);
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Failed to fetch registrations');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const updateStatus = async (id, newStatus) => {
    try {
      const res = await fetch('/api/registrations', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus })
      });
      const data = await res.json();
      if (data.success) {
        setRegistrations(registrations.map(r => r.id === id ? { ...r, status: newStatus } : r));
      }
    } catch (err) {
      console.error(err);
      alert("Failed to update status");
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold m-0">Student Registrations</h3>
        <button className="btn btn-outline-primary" onClick={fetchRegistrations}>
          <i className="fas fa-sync-alt me-2"></i> Refresh
        </button>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="card border-0 shadow-sm rounded-4">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover table-striped mb-0 align-middle">
              <thead className="table-light">
                <tr>
                  <th className="px-4 py-3">ID</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Student / Parent</th>
                  <th className="px-4 py-3">Contact</th>
                  <th className="px-4 py-3">Class</th>
                  <th className="px-4 py-3">Message</th>
                  <th className="px-4 py-3 text-center">Status</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="7" className="text-center py-5">
                      <div className="spinner-border text-primary" role="status"></div>
                    </td>
                  </tr>
                ) : registrations.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center py-5 text-muted">
                      No registrations found.
                    </td>
                  </tr>
                ) : (
                  registrations.map((reg) => (
                    <tr key={reg.id}>
                      <td className="px-4 fw-bold text-muted">#{reg.id}</td>
                      <td className="px-4">
                        {new Date(reg.created_at).toLocaleDateString('en-GB', {
                          day: '2-digit', month: 'short', year: 'numeric'
                        })}
                      </td>
                      <td className="px-4">
                        <div className="fw-bold text-dark">{reg.student_name}</div>
                        <div className="small text-muted">P: {reg.parent_name}</div>
                      </td>
                      <td className="px-4">
                        <div className="fw-bold">{reg.phone}</div>
                        {reg.email && <div className="small text-muted">{reg.email}</div>}
                      </td>
                      <td className="px-4 fw-bold text-primary">{reg.grade}</td>
                      <td className="px-4">
                        {reg.message ? (
                          <button 
                            className="btn btn-sm btn-light" 
                            title={reg.message} 
                            onClick={() => alert(reg.message)}
                          >
                            <i className="far fa-comment-dots text-primary"></i> View
                          </button>
                        ) : (
                          <span className="text-muted small">-</span>
                        )}
                      </td>
                      <td className="px-4 text-center">
                        <div className="dropdown">
                          <button 
                            className={`btn btn-sm dropdown-toggle fw-bold w-100 ${reg.status === 'Pending' ? 'btn-warning text-dark' : reg.status === 'Contacted' ? 'btn-info text-white' : reg.status === 'Enrolled' ? 'btn-success' : 'btn-secondary'}`}
                            type="button" 
                            data-bs-toggle="dropdown"
                          >
                            {reg.status}
                          </button>
                          <ul className="dropdown-menu dropdown-menu-end shadow">
                            <li><button className="dropdown-item fw-bold text-warning" onClick={() => updateStatus(reg.id, 'Pending')}>Pending</button></li>
                            <li><button className="dropdown-item fw-bold text-info" onClick={() => updateStatus(reg.id, 'Contacted')}>Contacted</button></li>
                            <li><button className="dropdown-item fw-bold text-success" onClick={() => updateStatus(reg.id, 'Enrolled')}>Enrolled</button></li>
                            <li><button className="dropdown-item fw-bold text-secondary" onClick={() => updateStatus(reg.id, 'Rejected')}>Rejected</button></li>
                          </ul>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
