"use client"
import React, { useState, useEffect } from 'react';
import SEO from "@/components/data/seo";
import HeaderOne from "@/components/layout/headers/header-one";
import BreadCrumb from "@/components/pages/common/breadcrumb";
import FooterOne from "@/components/layout/footers/footer-one";
import ScrollToTop from "@/components/pages/common/scroll/scroll-to-top";
import Link from "next/link";

const Page = () => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/gallery')
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setImages(data.images);
                }
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    return (
        <>
            <SEO pageTitle="Photo Gallery" />
            <HeaderOne />
            <BreadCrumb title="Photo Gallery" innerTitle="Gallery" bgImage="/uploads/activities.jpg" />
            
            <div className="section-padding py-5 bg-light">
                <div className="container py-4">
                    <div className="text-center mb-5">
                        <span className="fw-bold text-uppercase d-block mb-2" style={{ letterSpacing: '2px', color: 'var(--primary-color-1, #0d6efd)' }}>Memories & Celebrations</span>
                        <h2 className="display-5 fw-bolder mb-3 text-dark">Our Complete Gallery</h2>
                        <div className="mx-auto mt-3 mb-4" style={{ width: '60px', height: '4px', backgroundColor: 'var(--primary-color-1, #0d6efd)', borderRadius: '2px' }}></div>
                        <p className="lead text-muted mx-auto" style={{ maxWidth: "700px" }}>
                            Explore moments of joy, academic achievements, sports galas, cultural days, and co-curricular activities at Grace Garden School.
                        </p>
                    </div>
                    
                    {loading ? (
                        <div className="text-center py-5">
                            <div className="spinner-border text-primary" role="status"></div>
                        </div>
                    ) : images.length > 0 ? (
                        <div className="row g-4">
                            {images.map((src, idx) => (
                                <div key={idx} className="col-lg-4 col-md-6 col-sm-12">
                                    <div className="card border-0 rounded-4 overflow-hidden shadow-sm h-100" style={{ transition: 'transform 0.3s ease, box-shadow 0.3s ease', cursor: 'pointer' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.classList.add('shadow-lg'); }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.classList.remove('shadow-lg'); }}>
                                        <div className="position-relative" style={{ paddingBottom: '75%' }}>
                                            <img 
                                                src={src} 
                                                alt={`Gallery image ${idx + 1}`} 
                                                className="position-absolute top-0 start-0 w-100 h-100" 
                                                style={{ objectFit: 'cover', transition: 'transform 0.5s ease' }} 
                                                onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.1)'; }}
                                                onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
                                            />
                                            {/* Hover effect container that prevents mouse event issues by placing pointer-events: none */}
                                            <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{ background: 'rgba(0,0,0,0.1)', pointerEvents: 'none' }}>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-5">
                            <p className="text-muted">No images found in the gallery.</p>
                        </div>
                    )}
                </div>
            </div>

            <div className='all-footer'>
                <FooterOne />
            </div>
            <ScrollToTop />
        </>
    );
};

export default Page;
