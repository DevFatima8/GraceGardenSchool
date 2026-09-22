"use client"
import React, { useState, useEffect } from 'react';
import SEO from "@/components/data/seo";
import HeaderOne from "@/components/layout/headers/header-one";
import BreadCrumb from "../common/breadcrumb";
import FooterOne from "@/components/layout/footers/footer-one";
import ScrollToTop from "../common/scroll/scroll-to-top";

const defaultContent = {
    hero: {
        image_url: "/uploads/community.jpg"
    },
    contact_info: {
        title: "Sector C-2, Block 5, Green Town, Lahore",
        subtitle: "admin@gracegardenschool.com",
        description: "+92 300 406 6340"
    }
};

const ContactUs = () => {
    const [content, setContent] = useState(defaultContent);

    useEffect(() => {
        fetch('/api/our-school-content?page_slug=contact')
            .then(res => res.json())
            .then(data => {
                if (data.success && data.data.length > 0) {
                    const merged = { ...defaultContent };
                    data.data.forEach(section => {
                        if (merged[section.section_id]) {
                            merged[section.section_id] = {
                                ...merged[section.section_id],
                                ...section
                            };
                        }
                    });
                    setContent(merged);
                }
            })
            .catch(err => console.error(err));
    }, []);

    return (
        <>
            <SEO pageTitle="Contact Us - Grace Garden School" />
            <HeaderOne />
            <BreadCrumb title="Contact Us" innerTitle="Contact Campus" bgImage={content.hero?.image_url} />
            <div className="contact__page section-padding pb-0">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-5 col-lg-5 order-last order-lg-first">
                            <div className="contact__page-form">
                                <h3 className="mb-30">Send Us an Inquiry</h3>
                                <form action="#">	
                                    <div className="row">
                                        <div className="col-sm-12 mb-20"> 
                                            <div className="contact__page-form-item contact-item">
                                                <span className="fal fa-user"></span>
                                                <input type="text" name="name" placeholder="Full Name" required="required" />
                                            </div>										
                                        </div>
                                        <div className="col-sm-12 mb-20">
                                            <div className="contact__page-form-item contact-item">
                                                <span className="far fa-envelope-open"></span>
                                                <input type="email" name="email" placeholder="Email Address" required="required" />											
                                            </div>									
                                        </div>
                                        <div className="col-sm-12 mb-30"> 
                                            <div className="contact__page-form-item contact-item">
                                                <span className="far fa-comments"></span>
                                                <textarea name="message" placeholder="Type your message / admission inquiry..."></textarea>
                                            </div>										
                                        </div>
                                        <div className="col-lg-12">										
                                            <div className="contact__page-form-item">
                                                <button className="btn-one" type="submit">Submit Inquiry<i className="far fa-chevron-double-right"></i></button>
                                            </div>										
                                        </div>
                                    </div>							
                                </form>                        
                            </div>
                        </div>
                        <div className="col-xl-7 col-lg-7 lg-mb-30">
                            <div className="contact__page-info">
                                <h2 className="mb-60 lg-mb-30">Get In Touch</h2>
                                <div className="contact__page-info-item">
                                    <h6>Campus Address<span>:</span></h6>
                                    <span>{content.contact_info.title}</span>
                                </div>
                                <div className="contact__page-info-item">
                                    <h6>Email Address <span>:</span></h6>
                                    <span>
                                        <a href={`mailto:${content.contact_info.subtitle}`}>{content.contact_info.subtitle}</a>
                                    </span>
                                </div>
                                <div className="contact__page-info-item">
                                    <h6>Phone / WhatsApp Numbers<span>:</span></h6>
                                    <span>
                                        <a href={`tel:${content.contact_info.description.replace(/\s/g, '')}`} style={{ display: 'block' }}>{content.contact_info.description}</a>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="contact__page-map">
                <iframe src="https://maps.google.com/maps?q=Green%20Town%20Lahore&t=&z=13&ie=UTF8&iwloc=&output=embed" loading="lazy"></iframe>
            </div>
            <div className='all-footer'>
                <FooterOne />
            </div>
            <ScrollToTop />
        </>
    );
};

export default ContactUs;