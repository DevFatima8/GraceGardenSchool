"use client";

import React, { useState } from 'react';
import { loginAdmin } from './actions';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in both email and password.');
      return;
    }
    setError('');
    
    const result = await loginAdmin(email, password);
    if (result.success) {
      router.push('/ad/m/in/dashboard');
    } else {
      setError(result.error || 'Login failed.');
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100" style={{ backgroundColor: '#f4f7f6' }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-6 col-lg-4">
            <div className="card border-0 shadow-lg" style={{ borderRadius: '15px', overflow: 'hidden' }}>
              <div className="card-header text-white text-center py-4 border-0" style={{ backgroundColor: 'var(--primary-color-1)' }}>
                <h4 className="mb-0 fw-bold">Secure Admin Access</h4>
              </div>
              <div className="card-body p-5">
                
                {error && (
                  <div className="alert alert-danger" role="alert" style={{ fontSize: '14px' }}>
                    {error}
                  </div>
                )}

                <form onSubmit={handleLogin}>
                  <div className="mb-4">
                    <label className="form-label text-muted fw-semibold" style={{ fontSize: '13px', textTransform: 'uppercase' }}>Email Address</label>
                    <input 
                      type="email" 
                      className="form-control form-control-lg" 
                      placeholder="admin@example.com" 
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      style={{ fontSize: '15px', borderRadius: '8px' }}
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label className="form-label text-muted fw-semibold" style={{ fontSize: '13px', textTransform: 'uppercase' }}>Password</label>
                    <input 
                      type="password" 
                      className="form-control form-control-lg" 
                      placeholder="••••••••" 
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      style={{ fontSize: '15px', borderRadius: '8px' }}
                    />
                  </div>
                  
                  <div className="d-grid mt-5">                   
                    <button className="btn btn-lg fw-bold text-white" type="submit" style={{ borderRadius: '8px', padding: '12px', backgroundColor: 'var(--primary-color-1)', borderColor: 'var(--primary-color-1)' }}>
                      Login to Dashboard
                    </button>
                  </div>
                </form>                        
              </div>
            </div>
            <div className="text-center mt-4">
              <span className="text-muted" style={{ fontSize: '13px' }}>&copy; {new Date().getFullYear()} Admin Portal. All rights reserved.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
