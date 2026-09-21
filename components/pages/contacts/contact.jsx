"use client"
import SEO from "@/components/data/seo";
import HeaderOne from "@/components/layout/headers/header-one";
import BreadCrumb from "../common/breadcrumb";
import FooterOne from "@/components/layout/footers/footer-one";
import ScrollToTop from "../common/scroll/scroll-to-top";

const ContactUs = () => {
    return (
        <>
            <SEO pageTitle="Contact Us - Grace Garden School" />
            <HeaderOne />
            <BreadCrumb title="Contact Us" innerTitle="Contact Campus" />
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
                                    <span>Sector C-2, Block 5, Green Town, Lahore</span>
                                </div>
                                <div className="contact__page-info-item">
                                    <h6>Email Address <span>:</span></h6>
                                    <span>
                                        <a href="mailto:admin@gracegardenschool.com">admin@gracegardenschool.com</a>
                                    </span>
                                </div>
                                <div className="contact__page-info-item">
                                    <h6>Phone / WhatsApp Numbers<span>:</span></h6>
                                    <span>
                                        <a href="tel:+923004066340" style={{ display: 'block' }}>+92 300 406 6340</a>
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