'use client';
import React, { useState } from 'react';
import SEO from "@/components/data/seo";
import HeaderOne from "@/components/layout/headers/header-one";
import BreadCrumb from "@/components/pages/common/breadcrumb";
import FooterOne from "@/components/layout/footers/footer-one";
import ScrollToTop from "@/components/pages/common/scroll/scroll-to-top";
import Link from 'next/link';

export default function RegistrationsPage() {
    const [formData, setFormData] = useState({
        student_name: '',
        parent_name: '',
        phone: '',
        email: '',
        grade: '',
        message: ''
    });
    const [status, setStatus] = useState('idle'); // idle, submitting, success, error
    const [errorMsg, setErrorMsg] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('submitting');
        setErrorMsg('');

        try {
            const res = await fetch('/api/registrations', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            
            if (data.success) {
                setStatus('success');
                setFormData({
                    student_name: '',
                    parent_name: '',
                    phone: '',
                    email: '',
                    grade: '',
                    message: ''
                });
            } else {
                setStatus('error');
                setErrorMsg(data.error || 'Failed to submit registration.');
            }
        } catch (err) {
            setStatus('error');
            setErrorMsg('Network error occurred. Please try again.');
        }
    };

    return (
        <>
            <SEO pageTitle="Register Now - Grace Garden School" />
            <HeaderOne />
            <BreadCrumb title="Register Now" innerTitle="Registrations" bgImage="/uploads/facilities.jpg" />
            
            <div className="section-padding py-5 bg-light">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            
                            <div className="text-center mb-5">
                                <span className="text-primary fw-bold fs-6 mb-2 d-inline-block text-uppercase" style={{ letterSpacing: '2px' }}>Join Our Community</span>
                                <h2 className="fw-bolder mb-3 text-dark display-6">Student Registration Form</h2>
                                <p className="lead text-muted">
                                    Fill out the form below to begin the admission process. Our admissions team will contact you shortly to schedule an assessment and interview.
                                </p>
                            </div>

                            <div className="card border-0 shadow-lg p-4 p-md-5 rounded-4 bg-white">
                                {status === 'success' ? (
                                    <div className="text-center py-5">
                                        <div className="mb-4">
                                            <i className="fas fa-check-circle text-success" style={{ fontSize: '5rem' }}></i>
                                        </div>
                                        <h3 className="fw-bold text-dark mb-3">Registration Received!</h3>
                                        <p className="text-muted mb-4 lead">
                                            Thank you for registering. Our admissions office has received your application and will be in touch with you shortly.
                                        </p>
                                        <button className="btn btn-primary px-4 py-2 rounded-pill fw-bold" onClick={() => setStatus('idle')}>
                                            Submit Another Registration
                                        </button>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit}>
                                        {status === 'error' && (
                                            <div className="alert alert-danger mb-4 rounded-3">
                                                <i className="fas fa-exclamation-triangle me-2"></i> {errorMsg}
                                            </div>
                                        )}

                                        <div className="row g-4">
                                            <div className="col-md-6">
                                                <label className="form-label fw-bold">Student's Full Name <span className="text-danger">*</span></label>
                                                <input type="text" className="form-control form-control-lg bg-light border-0" name="student_name" value={formData.student_name} onChange={handleChange} required placeholder="e.g. Ali Ahmed" />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label fw-bold">Parent/Guardian Name <span className="text-danger">*</span></label>
                                                <input type="text" className="form-control form-control-lg bg-light border-0" name="parent_name" value={formData.parent_name} onChange={handleChange} required placeholder="e.g. Ahmed Khan" />
                                            </div>
                                            
                                            <div className="col-md-6">
                                                <label className="form-label fw-bold">Phone Number <span className="text-danger">*</span></label>
                                                <input type="tel" className="form-control form-control-lg bg-light border-0" name="phone" value={formData.phone} onChange={handleChange} required placeholder="+92 3XX XXXXXXX" />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label fw-bold">Email Address</label>
                                                <input type="email" className="form-control form-control-lg bg-light border-0" name="email" value={formData.email} onChange={handleChange} placeholder="optional@example.com" />
                                            </div>

                                            <div className="col-12">
                                                <label className="form-label fw-bold">Class / Grade Applying For <span className="text-danger">*</span></label>
                                                <select className="form-select form-select-lg bg-light border-0" name="grade" value={formData.grade} onChange={handleChange} required>
                                                    <option value="" disabled>Select Class</option>
                                                    <optgroup label="Pre School">
                                                        <option value="Pre Nursery">Pre Nursery</option>
                                                        <option value="Nursery">Nursery</option>
                                                        <option value="Prep">Prep</option>
                                                    </optgroup>
                                                    <optgroup label="Primary Section">
                                                        <option value="Class 1">Class 1</option>
                                                        <option value="Class 2">Class 2</option>
                                                        <option value="Class 3">Class 3</option>
                                                        <option value="Class 4">Class 4</option>
                                                        <option value="Class 5">Class 5</option>
                                                    </optgroup>
                                                    <optgroup label="Middle Section">
                                                        <option value="Class 6">Class 6</option>
                                                    </optgroup>
                                                </select>
                                            </div>

                                            <div className="col-12">
                                                <label className="form-label fw-bold">Any Additional Message / Query</label>
                                                <textarea className="form-control bg-light border-0" name="message" rows="4" value={formData.message} onChange={handleChange} placeholder="Tell us if you have any specific questions..."></textarea>
                                            </div>

                                            <div className="col-12 mt-5">
                                                <button type="submit" className="btn btn-primary btn-lg w-100 rounded-pill fw-bold shadow-sm" disabled={status === 'submitting'}>
                                                    {status === 'submitting' ? (
                                                        <><span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Submitting...</>
                                                    ) : (
                                                        <><i className="fas fa-paper-plane me-2"></i> Submit Registration</>
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                )}
                            </div>

                            <div className="mt-5 text-center">
                                <p className="text-muted mb-2">Need help with registration?</p>
                                <p className="fw-bold text-dark"><i className="fas fa-phone-alt me-2 text-primary"></i> +92 300 406 6340 | <i className="fas fa-envelope me-2 text-primary"></i> admin@gracegardenschool.com</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='all-footer'>
                <FooterOne />
            </div>
            <ScrollToTop />
        </>
    );
}
