'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { logoutAdmin } from '../actions';

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAboutDropdownOpen, setIsAboutDropdownOpen] = useState(pathname.includes('/pages/about'));

  const handleLogout = async () => {
    await logoutAdmin();
    router.push('/ad/m/in');
  };

  const isActive = (path) => pathname === path;
  const isPagesActive = pathname.startsWith('/ad/m/in/pages');

  let pageTitle = 'Dashboard Overview';
  if (pathname.includes('/pages')) pageTitle = 'Website Content Management';
  if (pathname.includes('/settings')) pageTitle = 'Admin Settings';

  return (
    <div className="d-flex vh-100 bg-light">
      {/* Sidebar */}
      <div className="text-white d-flex flex-column" style={{ width: '280px', flexShrink: 0, backgroundColor: 'var(--dark-one)' }}>
        <div className="p-4 border-bottom border-secondary">
          <h5 className="fw-bold mb-0 text-white">Admin Portal</h5>
        </div>
        
        <div className="flex-grow-1 p-3">
          <ul className="nav nav-pills flex-column mb-auto">
            <li className="nav-item mb-2">
              <Link href="/ad/m/in/dashboard" className={`nav-link text-start w-100 py-2 ${isActive('/ad/m/in/dashboard') ? 'text-white fw-bold' : 'text-white-50'}`} style={isActive('/ad/m/in/dashboard') ? { backgroundColor: 'var(--primary-color-1)' } : {}}>
                <i className="far fa-chart-line me-2"></i> Dashboard
              </Link>
            </li>
            
            {/* Pages Section */}
            <li className="nav-item mb-2">
              <Link href="/ad/m/in/pages/home" className={`nav-link text-start w-100 py-2 ${isActive('/ad/m/in/pages/home') ? 'text-white fw-bold' : 'text-white-50'}`} style={isActive('/ad/m/in/pages/home') ? { backgroundColor: 'var(--primary-color-1)' } : {}}>
                <i className="far fa-home me-2"></i> Home Page
              </Link>
            </li>
            <li className="nav-item mb-2">
              <button 
                onClick={() => setIsAboutDropdownOpen(!isAboutDropdownOpen)} 
                className={`nav-link text-start w-100 py-2 ${pathname.startsWith('/ad/m/in/pages/about') ? 'text-white fw-bold' : 'text-white-50'}`} 
                style={pathname.startsWith('/ad/m/in/pages/about') ? { backgroundColor: 'var(--primary-color-1)' } : {}}
              >
                <div className="d-flex justify-content-between align-items-center">
                  <div><i className="far fa-info-circle me-2"></i> About Us</div>
                  <i className={`far fa-chevron-${isAboutDropdownOpen ? 'up' : 'down'} small`}></i>
                </div>
              </button>
              {isAboutDropdownOpen && (
                <ul className="nav flex-column ms-3 mt-1 border-start border-secondary ps-2">
                  <li className="nav-item">
                    <Link href="/ad/m/in/pages/about/history" className={`nav-link text-start w-100 py-1 ${isActive('/ad/m/in/pages/about/history') ? 'text-white fw-bold' : 'text-white-50'}`} style={{fontSize: '0.85rem'}}>
                      Our History
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link href="/ad/m/in/pages/about/motto" className={`nav-link text-start w-100 py-1 ${isActive('/ad/m/in/pages/about/motto') ? 'text-white fw-bold' : 'text-white-50'}`} style={{fontSize: '0.85rem'}}>
                      School Motto
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link href="/ad/m/in/pages/about/vision" className={`nav-link text-start w-100 py-1 ${isActive('/ad/m/in/pages/about/vision') ? 'text-white fw-bold' : 'text-white-50'}`} style={{fontSize: '0.85rem'}}>
                      Vision Statement
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link href="/ad/m/in/pages/about/board" className={`nav-link text-start w-100 py-1 ${isActive('/ad/m/in/pages/about/board') ? 'text-white fw-bold' : 'text-white-50'}`} style={{fontSize: '0.85rem'}}>
                      Board Of Governors
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link href="/ad/m/in/pages/about/values" className={`nav-link text-start w-100 py-1 ${isActive('/ad/m/in/pages/about/values') ? 'text-white fw-bold' : 'text-white-50'}`} style={{fontSize: '0.85rem'}}>
                      Core Values
                    </Link>
                  </li>
                </ul>
              )}
            </li>
            <li className="nav-item mb-2">
              <Link href="/ad/m/in/pages/school" className={`nav-link text-start w-100 py-2 ${isActive('/ad/m/in/pages/school') ? 'text-white fw-bold' : 'text-white-50'}`} style={isActive('/ad/m/in/pages/school') ? { backgroundColor: 'var(--primary-color-1)' } : {}}>
                <i className="far fa-school me-2"></i> Our School
              </Link>
            </li>
            <li className="nav-item mb-2">
              <Link href="/ad/m/in/pages/admissions" className={`nav-link text-start w-100 py-2 ${isActive('/ad/m/in/pages/admissions') ? 'text-white fw-bold' : 'text-white-50'}`} style={isActive('/ad/m/in/pages/admissions') ? { backgroundColor: 'var(--primary-color-1)' } : {}}>
                <i className="far fa-graduation-cap me-2"></i> Admissions
              </Link>
            </li>
            <li className="nav-item mb-2 mt-4">
              <Link href="/ad/m/in/settings" className={`nav-link text-start w-100 py-2 ${isActive('/ad/m/in/settings') ? 'text-white fw-bold' : 'text-white-50'}`} style={isActive('/ad/m/in/settings') ? { backgroundColor: 'var(--primary-color-1)' } : {}}>
                <i className="far fa-cog me-2"></i> Settings
              </Link>
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
        {/* Top Navbar Component */}
        <div className="bg-white px-4 py-3 shadow-sm d-flex justify-content-between align-items-center mb-4 sticky-top">
          <h5 className="mb-0 fw-semibold text-dark">
            {pageTitle}
          </h5>
          <div className="d-flex align-items-center">
            <span className="text-muted me-3">Admin User</span>
            <div className="text-white rounded-circle d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px', backgroundColor: 'var(--primary-color-1)' }}>
              <i className="fal fa-user"></i>
            </div>
          </div>
        </div>

        {/* Dynamic Page Content */}
        <div className="px-4 pb-5">
          {children}
        </div>
      </div>
    </div>
  );
}
