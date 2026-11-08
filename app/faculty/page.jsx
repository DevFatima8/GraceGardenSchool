"use client"

import React, { useState, useEffect } from 'react';
import SEO from "@/components/data/seo";
import HeaderOne from "@/components/layout/headers/header-one";
import BreadCrumb from "@/components/pages/common/breadcrumb";
import FooterOne from "@/components/layout/footers/footer-one";
import ScrollToTop from "@/components/pages/common/scroll/scroll-to-top";
import { fetchWithCache } from "@/lib/client-cache";

const photoOf = (member) => {
    if (!member?.image) return '';
    if (typeof member.image === 'string') return member.image;
    return member.image.src || '';
};

const initialsOf = (name) => {
    const parts = String(name || '').trim().split(/\s+/).filter(Boolean);
    if (parts.length === 0) return 'GG';
    return parts.slice(0, 2).map((part) => part[0]).join('').toUpperCase();
};

const Page = () => {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;
        fetchWithCache('/api/team')
            .then((data) => {
                if (!isMounted) return;
                if (data && data.success && Array.isArray(data.data)) {
                    setMembers(data.data);
                }
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                if (isMounted) setLoading(false);
            });

        return () => { isMounted = false; };
    }, []);

    return (
        <>
            <SEO pageTitle="Faculty Members" />
            <HeaderOne />
            <BreadCrumb title="Faculty Members" innerTitle="Faculty" bgImage="/uploads/faculty.jpg" />

            <div className="section-padding py-5 bg-light" dir="ltr">
                <div className="container py-4">
                    <div className="text-center mb-5">
                        <span className="fw-bold text-uppercase d-block mb-2" style={{ letterSpacing: '2px', color: 'var(--primary-color-1, #0d6efd)' }}>Our Educators</span>
                        <h2 className="display-5 fw-bolder mb-3 text-dark">Faculty Members</h2>
                        <div className="mx-auto mt-3 mb-4" style={{ width: '60px', height: '4px', backgroundColor: 'var(--primary-color-1, #0d6efd)', borderRadius: '2px' }}></div>
                        <p className="lead text-muted mx-auto" style={{ maxWidth: '700px', direction: 'ltr', textAlign: 'center' }}>
                            Meet the teachers and staff who guide students at Grace Garden School. Profiles added in the admin panel appear here.
                        </p>
                    </div>

                    {loading ? (
                        <div className="text-center py-5">
                            <div className="spinner-border text-primary" role="status"></div>
                        </div>
                    ) : members.length > 0 ? (
                        <div className="row g-4">
                            {members.map((member, idx) => {
                                const photo = photoOf(member);
                                return (
                                    <div key={member.id || idx} className="col-lg-4 col-md-6">
                                        <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden bg-white" style={{ direction: 'ltr' }}>
                                            <div className="position-relative bg-light" style={{ height: '280px' }}>
                                                {photo ? (
                                                    <img
                                                        src={photo}
                                                        alt={member.name || 'Faculty member'}
                                                        className="w-100 h-100"
                                                        style={{ objectFit: 'cover', objectPosition: 'top' }}
                                                    />
                                                ) : (
                                                    <div className="w-100 h-100 d-flex align-items-center justify-content-center" style={{ background: 'var(--primary-color-1, #0d6efd)', color: '#fff', fontSize: '2.5rem', fontWeight: 700 }}>
                                                        {initialsOf(member.name)}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="card-body text-center p-4">
                                                <h4 className="fw-bold mb-1 text-dark">{member.name || 'Faculty Member'}</h4>
                                                <h6 className="mb-3 fw-semibold" style={{ color: 'var(--primary-color-1, #0d6efd)' }}>{member.position || 'Teacher'}</h6>
                                                {member.mail && (
                                                    <p className="mb-1 text-muted">
                                                        <i className="far fa-envelope me-2"></i>
                                                        <a href={`mailto:${member.mail}`} className="text-muted">{member.mail}</a>
                                                    </p>
                                                )}
                                                {member.phone && (
                                                    <p className="mb-0 text-muted">
                                                        <i className="fas fa-phone-alt me-2"></i>
                                                        <a href={`tel:${String(member.phone).replace(/\s/g, '')}`} className="text-muted">{member.phone}</a>
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="text-center py-5">
                            <p className="text-muted mb-0">Faculty profiles will appear here once they are added from the admin panel.</p>
                        </div>
                    )}
                </div>
            </div>

            <div className="all-footer">
                <FooterOne />
            </div>
            <ScrollToTop />
        </>
    );
};

export default Page;
