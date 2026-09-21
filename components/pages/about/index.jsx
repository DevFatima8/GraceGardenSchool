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
    <div className={`tw-py-16 ${isRight ? 'tw-bg-gray-50' : 'tw-bg-white'}`}>
      <div className="container">
        <div className={`tw-flex tw-flex-col ${isRight ? 'md:tw-flex-row-reverse' : 'md:tw-flex-row'} tw-gap-12 tw-items-center`}>
          <div className="tw-w-full md:tw-w-1/2">
            <h4 className="tw-text-blue-600 tw-font-bold tw-text-sm tw-uppercase tw-mb-2">{data.subtitle}</h4>
            <h2 className="tw-text-4xl tw-font-extrabold tw-text-gray-900 tw-mb-6">{data.title}</h2>
            <p className="tw-text-gray-600 tw-text-lg tw-leading-relaxed">{data.description}</p>
          </div>
          <div className="tw-w-full md:tw-w-1/2">
            {data.image_url && (
              <img src={data.image_url} alt={data.title} className="tw-w-full tw-rounded-2xl tw-shadow-xl tw-object-cover tw-h-96" />
            )}
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
    <div className="tw-py-20 tw-bg-white">
      <div className="container">
        <div className="tw-text-center tw-max-w-3xl tw-mx-auto tw-mb-16">
          <h4 className="tw-text-blue-600 tw-font-bold tw-text-sm tw-uppercase tw-mb-2">{data.subtitle}</h4>
          <h2 className="tw-text-4xl tw-font-extrabold tw-text-gray-900 tw-mb-6">{data.title}</h2>
          <p className="tw-text-gray-600 tw-text-lg">{data.description}</p>
        </div>
        
        {cards.length > 0 && (
          <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-8">
            {cards.map((card, idx) => (
              <div key={idx} className="tw-bg-white tw-border tw-border-gray-100 tw-rounded-2xl tw-p-8 tw-shadow-sm hover:tw-shadow-xl tw-transition-all tw-duration-300">
                {card.image_url && (
                  <img src={card.image_url} alt={card.title} className="tw-w-20 tw-h-20 tw-rounded-full tw-object-cover tw-mb-6 tw-border-4 tw-border-blue-50" />
                )}
                <h3 className="tw-text-xl tw-font-bold tw-text-gray-900 tw-mb-1">{card.title}</h3>
                {card.subtitle && <h5 className="tw-text-sm tw-font-semibold tw-text-blue-600 tw-mb-3">{card.subtitle}</h5>}
                <p className="tw-text-gray-600">{card.description}</p>
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