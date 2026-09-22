import Social from "@/components/data/social";
import Link from "next/link";
import logo from "../../../public/assets/img/logo-2.jpg";

const FooterOne = () => {
    return (
        <>
            <div className="footer__one">
                <img className="footer__one-shape" src="assets/img/shape/footer-bg.png" alt="shape" />
                <div className="container">
                    <div className="row">
                        <div className="col-xl-2 col-lg-4 col-md-6 col-sm-6 xl-mb-30">
                            <div className="footer__one-widget">
                                <div className="footer__one-widget-about">
                                    <Link href="/"><img src={logo.src} alt="Grace Garden School" style={{ maxHeight: '60px', width: 'auto' }} /></Link>
                                    <p>Grace Garden School is a forward-thinking educational institution dedicated to fostering academic excellence, character development, and extracurricular enrichment.</p>
                                    <div className="footer__one-widget-about-social">
                                        <Social />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-2 col-lg-4 col-md-6 col-sm-6 sm-mb-30">
                            <div className="footer__one-widget border-one">
                                <h4>Programs</h4>
                                <div className="footer__one-widget-solution">
                                    <ul>
                                        <li><Link href="/pre-school"><i className="far fa-chevron-double-right"></i>Pre-School</Link></li>
                                        <li><Link href="/lower-primary"><i className="far fa-chevron-double-right"></i>Primary</Link></li>
                                        <li><Link href="/middle"><i className="far fa-chevron-double-right"></i>Middle</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-2 col-lg-4 col-md-6 col-sm-6 sm-mb-30">
                            <div className="footer__one-widget border-one">
                                <h4>Quick Links</h4>
                                <div className="footer__one-widget-solution">
                                    <ul>
                                        <li><Link href="/about-us"><i className="far fa-chevron-double-right"></i>About Us</Link></li>
                                        <li><Link href="/academics"><i className="far fa-chevron-double-right"></i>Academics</Link></li>
                                        <li><Link href="/admissions"><i className="far fa-chevron-double-right"></i>Admissions</Link></li>
                                        <li><Link href="/fee-structure"><i className="far fa-chevron-double-right"></i>Fee</Link></li>
                                        <li><Link href="/contact"><i className="far fa-chevron-double-right"></i>Contact</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-2 col-lg-4 col-md-6 col-sm-6 sm-mb-30">
                            <div className="footer__one-widget border-one">
                                <h4>Campus Life</h4>
                                <div className="footer__one-widget-solution">
                                    <ul>
                                        <li><Link href="/events"><i className="far fa-chevron-double-right"></i>Events</Link></li>
                                        <li><Link href="/activities"><i className="far fa-chevron-double-right"></i>Activities</Link></li>
                                        <li><Link href="/gallery"><i className="far fa-chevron-double-right"></i>Gallery</Link></li>
                                        <li><Link href="/blog"><i className="far fa-chevron-double-right"></i>Blog</Link></li>
                                        <li><Link href="/careers"><i className="far fa-chevron-double-right"></i>Careers</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-2 col-lg-4 col-md-6 col-sm-6 sm-mb-30">
                            <div className="footer__one-widget border-one">
                                <h4>Contact Info</h4>
                                <div className="footer__one-widget-location">
                                    <div className="footer__one-widget-location-item">
                                        <div className="footer__one-widget-location-item-icon">
                                            <i className="far fa-map-marker-alt"></i>
                                        </div>
                                        <div className="footer__one-widget-location-item-info">
                                            <span className="text-white">Sector C-2, Block 5, Green Town, Lahore</span>
                                        </div>
                                    </div>
                                    <div className="footer__one-widget-location-item">
                                        <div className="footer__one-widget-location-item-icon">
                                            <i className="far fa-phone-alt"></i>
                                        </div>
                                        <div className="footer__one-widget-location-item-info" style={{ whiteSpace: 'nowrap', lineHeight: '1.2' }}>
                                            <Link href="tel:+923004066340" className="text-white d-block">+92 300 406 6340</Link>
                                        </div>
                                    </div>
                                    <div className="footer__one-widget-location-item">
                                        <div className="footer__one-widget-location-item-icon">
                                            <i className="far fa-envelope"></i>
                                        </div>
                                        <div className="footer__one-widget-location-item-info" style={{ whiteSpace: 'nowrap', lineHeight: '1.5' }}>
                                            <Link href="mailto:admin@gracegardenschool.com" className="text-white d-block">admin@gracegardenschool.com</Link>
                                            <Link href="mailto:info@gracegardenschool.com" className="text-white d-block">info@gracegardenschool.com</Link>
                                            <Link href="mailto:principal@gracegardenschool.com" className="text-white d-block">principal@gracegardenschool.com</Link>
                                            <Link href="mailto:accounts@gracegardenschool.com" className="text-white d-block">accounts@gracegardenschool.com</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-2 col-lg-4 col-md-6 col-sm-6">
                            <div className="footer__one-widget border-one tow">
                                <h4>Admissions</h4>
                                <div className="footer__one-widget-subscribe">
                                    <p>Admissions Open from Pre-School to 6th Class.</p>
                                    <Link href="/admissions" className="btn btn-warning w-100 py-2 rounded-pill fw-bold text-dark text-center mt-2 d-block">
                                        Apply
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="copyright__one" style={{ paddingTop: '20px' }}>
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-12">
                                <p>Copyright 2024 <Link href="/">Grace Garden School</Link> - All Rights Reserved</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FooterOne;