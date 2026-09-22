"use client"

import React, { useState, useEffect } from 'react';
import SEO from "@/components/data/seo";
import HeaderOne from "@/components/layout/headers/header-one";
import BreadCrumb from "@/components/pages/common/breadcrumb";
import FooterOne from "@/components/layout/footers/footer-one";
import ScrollToTop from "@/components/pages/common/scroll/scroll-to-top";

const ContactSection = ({ data }) => {
  if (!data) return null;
  return (
    <div className="contact__page section-padding pb-0 bg-white">
        <div className="container py-5">
            <div className="row">
                <div className="col-xl-5 col-lg-5 order-last order-lg-first">
                    <div className="contact__page-form shadow-sm p-4 p-md-5 rounded-4 bg-light border-0">
                        <h3 className="mb-4 fw-bold text-dark">Send Us an Inquiry</h3>
                        <form action="#">	
                            <div className="row g-3">
                                <div className="col-sm-12"> 
                                    <div className="contact__page-form-item contact-item position-relative">
                                        <span className="fal fa-user position-absolute top-50 translate-middle-y ms-3 text-muted"></span>
                                        <input type="text" name="name" placeholder="Full Name" required="required" className="form-control rounded-pill ps-5 py-2" />
                                    </div>										
                                </div>
                                <div className="col-sm-12">
                                    <div className="contact__page-form-item contact-item position-relative">
                                        <span className="far fa-envelope-open position-absolute top-50 translate-middle-y ms-3 text-muted"></span>
                                        <input type="email" name="email" placeholder="Email Address" required="required" className="form-control rounded-pill ps-5 py-2" />											
                                    </div>									
                                </div>
                                <div className="col-sm-12"> 
                                    <div className="contact__page-form-item contact-item position-relative">
                                        <span className="far fa-comments position-absolute mt-3 ms-3 text-muted"></span>
                                        <textarea name="message" placeholder="Type your message / admission inquiry..." className="form-control rounded-4 ps-5 pt-3 pb-3" rows="4"></textarea>
                                    </div>										
                                </div>
                                <div className="col-lg-12 mt-4">										
                                    <div className="contact__page-form-item">
                                        <button className="btn btn-primary rounded-pill px-4 py-2 fw-bold w-100" type="submit">Submit Inquiry <i className="far fa-chevron-double-right ms-2"></i></button>
                                    </div>										
                                </div>
                            </div>							
                        </form>                        
                    </div>
                </div>
                <div className="col-xl-7 col-lg-7 mb-5 mb-lg-0">
                    <div className="ps-lg-5">
                        <span className="text-primary fw-bold text-uppercase mb-2 d-block" style={{ letterSpacing: '2px' }}>{data.subtitle || 'Get In Touch'}</span>
                        <h2 className="mb-4 display-6 fw-bolder text-dark">{data.title || 'Contact Information'}</h2>
                        {data.description && <p className="lead text-muted mb-5">{data.description}</p>}
                        
                        <div className="d-flex align-items-center mb-4 p-4 rounded-4 bg-light shadow-sm">
                            <div className="flex-shrink-0 bg-white rounded-circle d-flex align-items-center justify-content-center shadow-sm" style={{ width: '60px', height: '60px' }}>
                                <i className="fas fa-map-marker-alt text-primary fs-4"></i>
                            </div>
                            <div className="ms-4">
                                <h6 className="fw-bold mb-1">Campus Address:</h6>
                                <span className="text-muted">{data.address || 'Sector C-2, Block 5, Green Town, Lahore'}</span>
                            </div>
                        </div>

                        <div className="d-flex align-items-center mb-4 p-4 rounded-4 bg-light shadow-sm">
                            <div className="flex-shrink-0 bg-white rounded-circle d-flex align-items-center justify-content-center shadow-sm" style={{ width: '60px', height: '60px' }}>
                                <i className="fas fa-envelope text-primary fs-4"></i>
                            </div>
                            <div className="ms-4">
                                <h6 className="fw-bold mb-1">Email Address:</h6>
                                <span>
                                    <a href={`mailto:${data.email || 'admin@gracegardenschool.com'}`} className="text-muted">{data.email || 'admin@gracegardenschool.com'}</a>
                                </span>
                            </div>
                        </div>

                        <div className="d-flex align-items-center p-4 rounded-4 bg-light shadow-sm">
                            <div className="flex-shrink-0 bg-white rounded-circle d-flex align-items-center justify-content-center shadow-sm" style={{ width: '60px', height: '60px' }}>
                                <i className="fas fa-phone-alt text-primary fs-4"></i>
                            </div>
                            <div className="ms-4">
                                <h6 className="fw-bold mb-1">Phone / WhatsApp:</h6>
                                <span>
                                    <a href={`tel:${(data.phone || '+923004066340').replace(/\s/g, '')}`} className="text-muted">{data.phone || '+92 300 406 6340'}</a>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="mt-5">
            <iframe src="https://maps.google.com/maps?q=Green%20Town%20Lahore&t=&z=13&ie=UTF8&iwloc=&output=embed" loading="lazy" style={{ width: '100%', height: '450px', border: 0 }} allowFullScreen=""></iframe>
        </div>
    </div>
  );
};


const DynamicSection = ({ data, isRight }) => {
  if (!data) return null;
  return (
    <div className={`py-5 ${isRight ? 'bg-light' : 'bg-white'}`}>
      <div className="container py-4">
        <div className="row align-items-center gy-5">
          <div className={`col-lg-6 order-1 ${isRight ? 'order-lg-2' : 'order-lg-1'}`}>
            {data.image_url && (
              <div className="position-relative">
                <img src={data.image_url} alt={data.title} className="img-fluid rounded-4 shadow-lg w-100" style={{ objectFit: 'cover', minHeight: '350px', maxHeight: '450px' }} />
                <div className="position-absolute top-0 start-0 w-100 h-100 rounded-4" style={{ background: 'linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.05))', pointerEvents: 'none' }}></div>
              </div>
            )}
          </div>
          <div className={`col-lg-6 order-2 ${isRight ? 'order-lg-1' : 'order-lg-2'}`}>
            <div className={`px-lg-4 ${isRight ? 'pe-lg-5 text-lg-end text-center' : 'ps-lg-5 text-center text-lg-start'}`}>
              {data.subtitle && <span className="fw-bold text-uppercase d-block mb-2" style={{ letterSpacing: '2px', color: 'var(--primary-color-1, #0d6efd)' }}>{data.subtitle}</span>}
              {data.title && <h2 className="display-5 fw-bolder mb-4 text-dark" style={{ lineHeight: '1.2' }}>{data.title}</h2>}
              {data.description && <div className="lead text-muted mb-0" style={{ lineHeight: '1.8', fontSize: '1.1rem', whiteSpace: 'pre-line' }}>{data.description}</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CardsSection = ({ data }) => {
  if (!data) return null;
  
  let cards = [];
  if (Array.isArray(data.json_data)) {
    cards = data.json_data;
  } else if (typeof data.json_data === 'string') {
    try { cards = JSON.parse(data.json_data); } catch (e) {}
  }

  return (
    <div className="py-5 bg-white">
      <div className="container py-5">
        <div className="row justify-content-center mb-5">
          <div className="col-lg-8 text-center">
            {data.subtitle && <span className="fw-bold text-uppercase d-block mb-2" style={{ letterSpacing: '2px', color: 'var(--primary-color-1, #0d6efd)' }}>{data.subtitle}</span>}
            {data.title && <h2 className="display-5 fw-bolder mb-3 text-dark">{data.title}</h2>}
            <div className="mx-auto mt-3 mb-4" style={{ width: '60px', height: '4px', backgroundColor: 'var(--primary-color-1, #0d6efd)', borderRadius: '2px' }}></div>
            {data.description && <p className="lead text-muted">{data.description}</p>}
          </div>
        </div>
        
        {cards.length > 0 && (
          <div className="row g-4 justify-content-center">
            {cards.map((card, idx) => (
              <div key={idx} className="col-lg-4 col-md-6">
                <div className="card h-100 border-0 shadow-sm rounded-4 p-4 text-center" style={{ transition: 'transform 0.3s ease, box-shadow 0.3s ease' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-10px)'; e.currentTarget.classList.add('shadow-lg'); }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.classList.remove('shadow-lg'); }}>
                  <div className="card-body">
                    {card.image_url && (
                      <div className="mb-4 d-inline-block position-relative">
                        <img src={card.image_url} alt={card.title} className="rounded-circle shadow-sm" style={{ width: '100px', height: '100px', objectFit: 'cover', border: '4px solid #fff' }} />
                      </div>
                    )}
                    {card.title && <h4 className="card-title fw-bold mb-2 text-dark">{card.title}</h4>}
                    {card.subtitle && <h6 className="card-subtitle mb-3 fw-semibold" style={{ color: 'var(--primary-color-1, #0d6efd)' }}>{card.subtitle}</h6>}
                    {card.description && <p className="card-text text-muted" style={{ lineHeight: '1.7' }}>{card.description}</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default function GenericPage({ pageSlug, pageTitle, defaultContent }) {
    const [content, setContent] = useState(defaultContent);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      fetch(`/api/our-school-content?page_slug=${pageSlug}`)
        .then(res => res.json())
        .then(data => {
          if (data.success && data.data && data.data.length > 0) {
            const dbContent = {};
            data.data.forEach(item => {
              dbContent[item.section_id] = item;
            });
            // Merge DB content with fallback
            const mergedContent = { ...defaultContent };
            Object.keys(defaultContent).forEach(key => {
              if (dbContent[key]) {
                mergedContent[key] = dbContent[key];
              }
            });
            setContent(mergedContent);
          }
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setLoading(false);
        });
    }, [pageSlug, defaultContent]);

    if (loading) {
      return <div className="d-flex align-items-center justify-content-center min-vh-100 bg-white"><div className="spinner-border text-primary" role="status"></div></div>;
    }

    return (
      <>
        <SEO pageTitle={pageTitle} />
        <HeaderOne />
        <BreadCrumb title={pageTitle} innerTitle={pageTitle} bgImage={content.hero?.image_url} />
        
        <div className="our-school-dynamic-wrap bg-white">
          {Object.keys(content).map((key, index) => {
            if (key === 'hero') return null; // Handled by BreadCrumb
            const sectionData = content[key];
            if (sectionData.type === 'contact') {
                return <ContactSection key={key} data={sectionData} />;
            } else if (sectionData.json_data && sectionData.json_data.length > 0) {
                return <CardsSection key={key} data={sectionData} />;
            } else {
                return <DynamicSection key={key} data={sectionData} isRight={index % 2 !== 0} />;
            }
          })}
        </div>

        <div className='all-footer'>
            <FooterOne />
        </div>
        <ScrollToTop />
      </>
    );
}
