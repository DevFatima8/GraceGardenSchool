'use client';

import React, { useState } from 'react';
import { resetAdminPassword } from '../../actions';

export default function SettingsPage() {
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

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

  return (
    <div>
      <div className="card shadow-sm border-0 mb-4" style={{ maxWidth: '500px' }}>
        <div className="card-body p-4">
          <h5 className="fw-bold mb-3">Reset Password</h5>
          {error && <div className="alert alert-danger py-2">{error}</div>}
          {message && <div className="alert alert-success py-2">{message}</div>}

          <form onSubmit={handleReset}>
            <div className="mb-3">
              <label className="form-label text-muted fw-semibold small ">New Password</label>
              <input 
                type="password" 
                className="form-control" 
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
              />
            </div>
            <button type="submit" className="btn text-white w-100 fw-bold" style={{ backgroundColor: 'var(--primary-color-1)' }}>
              Update Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
