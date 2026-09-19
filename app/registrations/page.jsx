"use client"
import React, { useState } from "react";
import SEO from "@/components/data/seo";
import HeaderOne from "@/components/layout/headers/header-one";
import BreadCrumb from "@/components/pages/common/breadcrumb";
import FooterOne from "@/components/layout/footers/footer-one";
import ScrollToTop from "@/components/pages/common/scroll/scroll-to-top";

const RegistrationPage = () => {
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        studentName: '',
        parentName: '',
        phone: '',
        email: '',
        gradeApplying: 'Pre-Nursery',
        shift: 'Morning Shift',
        previousSchool: '',
        address: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <>
            <SEO pageTitle="Online Registration - Grace Garden School" />
            <HeaderOne />
            <BreadCrumb title="Online Registration" innerTitle="Register Now" />
            
            <div className="section-padding py-5">
                <div className="container">
                    <div className="row justify-content-center mb-5">
                        <div className="col-lg-8 text-center">
                            <span className="text-primary fw-bold fs-6 mb-2 d-inline-block">Admissions Open</span>
                            <h2 className="fw-bold mb-3 text-dark">Student Admission Registration Form</h2>
                            <p className="lead text-muted">
                                Fill out the online registration form below to initiate the admission process for your child at Grace Garden School, Lahore.
                            </p>
                        </div>
                    </div>

                    <div className="row justify-content-center">
                        <div className="col-lg-10">
                            <div className="card border-0 shadow-sm p-4 p-md-5 rounded-4 bg-white">
                                {submitted ? (
                                    <div className="text-center py-5">
                                        <div className="text-success display-3 mb-3"><i className="fas fa-check-circle"></i></div>
                                        <h3 className="fw-bold text-dark mb-2">Registration Submitted Successfully!</h3>
                                        <p className="text-muted mb-4">Thank you for submitting your child's registration. Our Admissions Office will contact you within 24-48 hours to schedule the baseline assessment and campus visit.</p>
                                        <button className="btn btn-primary px-4 py-2 rounded-pill fw-semibold" onClick={() => setSubmitted(false)}>
                                            Submit Another Registration
                                        </button>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit}>
                                        <h5 className="fw-bold text-primary mb-4 border-bottom pb-2">Student & Parent Information</h5>
                                        <div className="row g-3">
                                            <div className="col-md-6">
                                                <label className="form-label fw-semibold">Student Full Name *</label>
                                                <input type="text" name="studentName" required className="form-control py-2 rounded-3" placeholder="e.g. Ali Ahmed" value={formData.studentName} onChange={handleChange} />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label fw-semibold">Parent / Guardian Name *</label>
                                                <input type="text" name="parentName" required className="form-control py-2 rounded-3" placeholder="e.g. Muhammad Ahmed" value={formData.parentName} onChange={handleChange} />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label fw-semibold">Phone / WhatsApp Number *</label>
                                                <input type="tel" name="phone" required className="form-control py-2 rounded-3" placeholder="e.g. 0300-1234567" value={formData.phone} onChange={handleChange} />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label fw-semibold">Email Address</label>
                                                <input type="email" name="email" className="form-control py-2 rounded-3" placeholder="e.g. parent@example.com" value={formData.email} onChange={handleChange} />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label fw-semibold">Grade / Class Applying For *</label>
                                                <select name="gradeApplying" className="form-select py-2 rounded-3" value={formData.gradeApplying} onChange={handleChange}>
                                                    <option>Pre-Nursery</option>
                                                    <option>Nursery</option>
                                                    <option>Prep</option>
                                                    <option>Class 1</option>
                                                    <option>Class 2</option>
                                                    <option>Class 3</option>
                                                    <option>Class 4</option>
                                                    <option>Class 5</option>
                                                    <option>Class 6 (Middle / Cambridge)</option>
                                                    <option>Class 7 (Middle / Cambridge)</option>
                                                    <option>Class 8 (Middle / Cambridge)</option>
                                                    <option>Class 9 (Matric / O-Level)</option>
                                                    <option>Class 10 (Matric / O-Level)</option>
                                                </select>
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label fw-semibold">Preferred Shift *</label>
                                                <select name="shift" className="form-select py-2 rounded-3" value={formData.shift} onChange={handleChange}>
                                                    <option>Morning Shift</option>
                                                    <option>2nd Shift (Afternoon)</option>
                                                </select>
                                            </div>
                                            <div className="col-12">
                                                <label className="form-label fw-semibold">Previous School Attended (If Any)</label>
                                                <input type="text" name="previousSchool" className="form-control py-2 rounded-3" placeholder="School Name & City" value={formData.previousSchool} onChange={handleChange} />
                                            </div>
                                            <div className="col-12">
                                                <label className="form-label fw-semibold">Residential Address in Lahore</label>
                                                <input type="text" name="address" className="form-control py-2 rounded-3" placeholder="Sector, Block, Green Town / Area" value={formData.address} onChange={handleChange} />
                                            </div>
                                            <div className="col-12">
                                                <label className="form-label fw-semibold">Additional Comments / Inquiries</label>
                                                <textarea name="message" rows="3" className="form-control rounded-3" placeholder="Any specific learning needs, transportation queries, etc." value={formData.message} onChange={handleChange}></textarea>
                                            </div>
                                            <div className="col-12 text-center mt-4">
                                                <button type="submit" className="btn btn-primary px-5 py-3 rounded-pill fw-bold fs-6">
                                                    Submit Registration Application
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                )}
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
};

export default RegistrationPage;
