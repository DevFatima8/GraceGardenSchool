"use client"

import React, { useState, useEffect } from 'react';
import SEO from "@/components/data/seo";
import HeaderOne from "@/components/layout/headers/header-one";
import BreadCrumb from "../common/breadcrumb";
import FooterOne from "@/components/layout/footers/footer-one";
import ScrollToTop from "../common/scroll/scroll-to-top";

// Default content for fallback
const defaultAboutContent = {
  history: {
    title: "Our History",
    subtitle: "A Legacy of Excellence",
    description: "Grace Garden School was founded with a mission to deliver world-class education in an environment that fosters intellectual curiosity, moral integrity, and social responsibility. Over the years, we have grown from a small institution to a prestigious school recognized for academic excellence.",
    image_url: "/assets/img/about/history.jpg"
  },
  motto: {
    title: "School Motto",
    subtitle: "Learn, Grow, Lead",
    description: "Our motto reflects our commitment to continuous learning, personal growth, and developing the leaders of tomorrow.",
    image_url: "/assets/img/about/vision.jpg"
  },
  vision: {
    title: "Vision Statement",
    subtitle: "Inspiring the Future",
    description: "To be a leading educational institution that empowers students to reach their full potential and make a positive impact on the world.",
    image_url: "/assets/img/about/vision.jpg"
  },
  board: {
    title: "Board of Governors",
    subtitle: "Guiding with Wisdom",
    description: "Our dedicated board members ensure the school maintains its high standards and strategic direction.",
    json_data: [
      { title: "Dr. Sarah Ahmed", subtitle: "Chairperson", description: "Education expert with 20 years of experience.", image_url: "/assets/img/avatar/avatar-1.jpg" },
      { title: "Mr. Ali Khan", subtitle: "Vice Chairman", description: "Business leader and philanthropist.", image_url: "/assets/img/avatar/avatar-2.jpg" }
    ]
  },
  values: {
    title: "Core Values",
    subtitle: "What We Stand For",
    description: "Our core values shape our culture and community.",
    image_url: "/assets/img/about/values.jpg",
    json_data: [
      { title: "Integrity", description: "We act with honesty and strong moral principles." },
      { title: "Excellence", description: "We strive for the highest quality in everything we do." },
      { title: "Respect", description: "We value and celebrate diversity in our community." }
    ]
  }
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
                <img src={data.image_url} alt={data.title} className="img-fluid rounded-4 shadow w-100" style={{ objectFit: 'cover', minHeight: '350px', maxHeight: '450px' }} />
                <div className="position-absolute top-0 start-0 w-100 h-100 rounded-4" style={{ background: 'linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.05))', pointerEvents: 'none' }}></div>
              </div>
            )}
          </div>
          <div className={`col-lg-6 order-2 ${isRight ? 'order-lg-1' : 'order-lg-2'}`}>
            <div className={`px-lg-4 ${isRight ? 'pe-lg-5 text-lg-end text-center' : 'ps-lg-5 text-center text-lg-start'}`}>
              <span className="fw-bold text-uppercase d-block mb-2" style={{ letterSpacing: '2px', color: 'var(--primary-color-1, #0d6efd)' }}>{data.subtitle}</span>
              <h2 className="display-5 fw-bolder mb-4 text-dark" style={{ lineHeight: '1.2' }}>{data.title}</h2>
              <p className="lead text-muted mb-0" style={{ lineHeight: '1.8', fontSize: '1.1rem' }}>{data.description}</p>
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
            <span className="fw-bold text-uppercase d-block mb-2" style={{ letterSpacing: '2px', color: 'var(--primary-color-1, #0d6efd)' }}>{data.subtitle}</span>
            <h2 className="display-5 fw-bolder mb-3 text-dark">{data.title}</h2>
            <div className="mx-auto mt-3 mb-4" style={{ width: '60px', height: '4px', backgroundColor: 'var(--primary-color-1, #0d6efd)', borderRadius: '2px' }}></div>
            <p className="lead text-muted">{data.description}</p>
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
                    <h4 className="card-title fw-bold mb-2 text-dark">{card.title}</h4>
                    {card.subtitle && <h6 className="card-subtitle mb-3 fw-semibold" style={{ color: 'var(--primary-color-1, #0d6efd)' }}>{card.subtitle}</h6>}
                    <p className="card-text text-muted" style={{ lineHeight: '1.7' }}>{card.description}</p>
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

const AboutUs = () => {
    const [content, setContent] = useState(defaultAboutContent);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      fetch('/api/about-content')
        .then(res => res.json())
        .then(data => {
          if (data.success && data.data && data.data.length > 0) {
            const dbContent = {};
            data.data.forEach(item => {
              dbContent[item.section_id] = item;
            });
            // Merge DB content with fallback if any section is completely missing
            setContent(prev => ({
              history: dbContent.history || prev.history,
              motto: dbContent.motto || prev.motto,
              vision: dbContent.vision || prev.vision,
              board: dbContent.board || prev.board,
              values: dbContent.values || prev.values,
            }));
          }
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setLoading(false);
        });
    }, []);

    if (loading) {
      return <div className="tw-flex tw-items-center tw-justify-center tw-min-h-screen tw-bg-white"><div className="tw-animate-spin tw-w-12 tw-h-12 tw-border-4 tw-border-blue-600 tw-border-t-transparent tw-rounded-full"></div></div>;
    }

    return (
      <>
        <SEO pageTitle="About Us" />
        <HeaderOne />
        <BreadCrumb title="About Us" innerTitle="Company About" />
        
        {/* Dynamic Sections using Tailwind CSS */}
        <div className="about-dynamic-wrap">
          <DynamicSection data={content.history} isRight={false} />
          <DynamicSection data={content.motto} isRight={true} />
          <DynamicSection data={content.vision} isRight={false} />
          <CardsSection data={content.values} />
          <CardsSection data={content.board} />
        </div>

        <div className='all-footer'>
            <FooterOne />
        </div>
        <ScrollToTop />
      </>
    );
};

export default AboutUs;