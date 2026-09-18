"use client";

import React, { useState } from 'react';
import { resetAdminPassword, logoutAdmin } from '../actions';
import { useRouter } from 'next/navigation';
import PageManager from '@/components/admin/PageManager';

export default function AdminDashboard() {
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const router = useRouter();

  const handleReset = async (e) => {
    e.preventDefault();
    if (!newPassword) {
      setError('Please provide a new password.');
      return;
    }
    setError('');
    setMessage('');
    
    const result = await resetAdminPassword(newPassword);
    if (result.success) {
      setMessage('Password reset successfully.');
      setNewPassword('');
    } else {
      setError(result.error || 'Failed to reset password.');
    }
  };

  const handleLogout = async () => {
    await logoutAdmin();
    router.push('/ad/m/in');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'pages':
        return <PageManager />;
      case 'settings':
        return (
          <div>
            <h3 className="fw-bold mb-4">Settings</h3>
            <div className="card shadow-sm border-0 mb-4" style={{ maxWidth: '500px' }}>
              <div className="card-body p-4">
                <h5 className="fw-bold mb-3">Reset Password</h5>
                {error && <div className="alert alert-danger py-2">{error}</div>}
                {message && <div className="alert alert-success py-2">{message}</div>}

                <form onSubmit={handleReset}>
                  <div className="mb-3">
                    <label className="form-label text-muted fw-semibold small text-uppercase">New Password</label>
                    <input 
                      type="password" 
                      className="form-control" 
                      placeholder="Enter new password"
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </div>
                  <button type="submit" className="btn w-100 text-white" style={{ backgroundColor: 'var(--primary-color-1)', borderColor: 'var(--primary-color-1)' }}>Update Password</button>
                </form>
              </div>
            </div>
          </div>
        );
      case 'dashboard':
      default:
        return (
          <div>
            <h3 className="fw-bold mb-4">Dashboard Overview</h3>
            <div className="row mb-4">
              <div className="col-md-3">
                <div className="card shadow-sm border-0 text-white" style={{ backgroundColor: 'var(--primary-color-1)' }}>
                  <div className="card-body">
                    <h6 className="card-title">Total Visits</h6>
                    <h2 className="mb-0 fw-bold">1,245</h2>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card shadow-sm border-0 text-white" style={{ backgroundColor: 'var(--primary-color-2)' }}>
                  <div className="card-body">
                    <h6 className="card-title">Active Pages</h6>
                    <h2 className="mb-0 fw-bold">8</h2>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card shadow-sm border-0 text-white" style={{ backgroundColor: 'var(--primary-color-3)' }}>
                  <div className="card-body">
                    <h6 className="card-title">Pending Updates</h6>
                    <h2 className="mb-0 fw-bold">3</h2>
                  </div>
                </div>
              </div>
            </div>
            <div className="card shadow-sm border-0 p-5 text-center">
              <h5 className="text-muted">Welcome to the Grace Garden School Admin Panel</h5>
              <p className="text-muted small">Select an option from the sidebar to manage your application.</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="d-flex vh-100 bg-light">
      {/* Sidebar */}
      <div className="text-white d-flex flex-column" style={{ width: '280px', flexShrink: 0, backgroundColor: 'var(--dark-one)' }}>
        <div className="p-4 border-bottom border-secondary">
          <h5 className="fw-bold mb-0">Admin Portal</h5>
        </div>
        
        <div className="flex-grow-1 p-3">
          <ul className="nav nav-pills flex-column mb-auto">
            <li className="nav-item mb-2">
              <button 
                onClick={() => setActiveTab('dashboard')} 
                className={`nav-link text-start w-100 ${activeTab === 'dashboard' ? 'active text-white' : 'text-white-50'}`}
                style={activeTab === 'dashboard' ? { backgroundColor: 'var(--primary-color-1)' } : {}}
              >
                <i className="far fa-chart-line me-2"></i> Dashboard
              </button>
            </li>
            <li className="nav-item mb-2">
              <button 
                onClick={() => setActiveTab('pages')} 
                className={`nav-link text-start w-100 ${activeTab === 'pages' ? 'active text-white' : 'text-white-50'}`}
                style={activeTab === 'pages' ? { backgroundColor: 'var(--primary-color-1)' } : {}}
              >
                <i className="far fa-file-alt me-2"></i> Manage Pages
              </button>
            </li>
            <li className="nav-item mb-2">
              <button 
                onClick={() => setActiveTab('settings')} 
                className={`nav-link text-start w-100 ${activeTab === 'settings' ? 'active text-white' : 'text-white-50'}`}
                style={activeTab === 'settings' ? { backgroundColor: 'var(--primary-color-1)' } : {}}
              >
                <i className="far fa-cog me-2"></i> Settings
              </button>
            </li>
          </ul>
        </div>
        
        <div className="p-3 border-top border-secondary">
          <button onClick={handleLogout} className="btn btn-outline-light w-100 text-start">
            <i className="far fa-sign-out-alt me-2"></i> Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 overflow-auto">
        {/* Top Navbar Component inside dashboard (optional) */}
        <div className="bg-white px-4 py-3 shadow-sm d-flex justify-content-between align-items-center mb-4 sticky-top">
          <h5 className="mb-0 fw-semibold text-dark">
            {activeTab === 'dashboard' && 'Dashboard Overview'}
            {activeTab === 'pages' && 'Website Content Management'}
            {activeTab === 'settings' && 'Admin Settings'}
          </h5>
          <div className="d-flex align-items-center">
            <span className="text-muted me-3">Admin User</span>
            <div className="text-white rounded-circle d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px', backgroundColor: 'var(--primary-color-1)' }}>
              <i className="fal fa-user"></i>
            </div>
          </div>
        </div>

        {/* Dynamic Content Area */}
        <div className="px-4 pb-5">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
