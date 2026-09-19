"use client"
import SEO from "@/components/data/seo";
import HeaderOne from "@/components/layout/headers/header-one";
import BreadCrumb from "@/components/pages/common/breadcrumb";
import FooterOne from "@/components/layout/footers/footer-one";
import ScrollToTop from "@/components/pages/common/scroll/scroll-to-top";
import Link from "next/link";

const FeeStructurePage = () => {
    return (
        <>
            <SEO pageTitle="Fee Structure - Grace Garden School" />
            <HeaderOne />
            <BreadCrumb title="Fee Structure" innerTitle="Fee Structure" />
            
            <div className="section-padding py-5">
                <div className="container">
                    <div className="row mb-5">
                        <div className="col-lg-8">
                            <span className="text-primary fw-bold fs-6 mb-2 d-inline-block">Affordable & Transparent</span>
                            <h2 className="fw-bold mb-3 text-dark">Tuition & Fee Policy</h2>
                            <p className="lead text-muted">
                                Grace Garden School is dedicated to providing high-quality education at competitive, transparent fee structures. We believe in providing premium learning experiences with no hidden charges.
                            </p>
                        </div>
                        <div className="col-lg-4 text-lg-end align-self-center">
                            <Link href="/registrations" className="btn btn-primary px-4 py-3 rounded-pill fw-bold">
                                Apply For Admission
                            </Link>
                        </div>
                    </div>

                    <div className="row g-4 mb-5">
                        <div className="col-lg-4">
                            <div className="card border-0 shadow-sm rounded-4 p-4 h-100 bg-white border-top border-4 border-primary">
                                <span className="badge bg-primary bg-opacity-10 text-primary mb-2 align-self-start py-2 px-3 rounded-pill fw-bold">Pre-School Wing</span>
                                <h4 className="fw-bold text-dark mt-2 mb-3">Pre-Nursery, Nursery, Prep</h4>
                                <p className="text-muted small mb-4">Montessori play-based learning, foundational phonics, sensory materials, and air-conditioned activity rooms.</p>
                                <ul className="list-unstyled text-muted small mb-4">
                                    <li className="mb-2"><i className="fas fa-check text-success me-2"></i>Registration & Prospectus: Available at Office</li>
                                    <li className="mb-2"><i className="fas fa-check text-success me-2"></i>Admission Fee: One-time at enrollment</li>
                                    <li className="mb-2"><i className="fas fa-check text-success me-2"></i>Monthly Tuition: Affordable Tiered Rates</li>
                                    <li className="mb-2"><i className="fas fa-check text-success me-2"></i>Activities & Stationery: Included</li>
                                </ul>
                                <Link href="/contact" className="btn btn-outline-primary w-100 py-2 rounded-pill fw-semibold mt-auto">Inquire Fee Details</Link>
                            </div>
                        </div>

                        <div className="col-lg-4">
                            <div className="card border-0 shadow-sm rounded-4 p-4 h-100 bg-white border-top border-4 border-primary">
                                <span className="badge bg-primary bg-opacity-10 text-primary mb-2 align-self-start py-2 px-3 rounded-pill fw-bold">Primary & Middle</span>
                                <h4 className="fw-bold text-dark mt-2 mb-3">Grades 1 to 8</h4>
                                <p className="text-muted small mb-4">Conceptual curriculum, interactive smart learning, STEM science labs, computer lab access, and sports coaching.</p>
                                <ul className="list-unstyled text-muted small mb-4">
                                    <li className="mb-2"><i className="fas fa-check text-success me-2"></i>Registration Fee: Nominal</li>
                                    <li className="mb-2"><i className="fas fa-check text-success me-2"></i>Admission Fee: One-time</li>
                                    <li className="mb-2"><i className="fas fa-check text-success me-2"></i>Monthly Tuition: Standard Primary/Middle Rates</li>
                                    <li className="mb-2"><i className="fas fa-check text-success me-2"></i>Lab & IT Facilities: Included</li>
                                </ul>
                                <Link href="/contact" className="btn btn-outline-primary w-100 py-2 rounded-pill fw-semibold mt-auto">Inquire Fee Details</Link>
                            </div>
                        </div>

                        <div className="col-lg-4">
                            <div className="card border-0 shadow-sm rounded-4 p-4 h-100 bg-white border-top border-4 border-primary">
                                <span className="badge bg-primary bg-opacity-10 text-primary mb-2 align-self-start py-2 px-3 rounded-pill fw-bold">Matric & Cambridge</span>
                                <h4 className="fw-bold text-dark mt-2 mb-3">Grades 9, 10 & O-Levels</h4>
                                <p className="text-muted small mb-4">Targeted board exam sessions, comprehensive revisions, past papers practice, science practicals, and career counseling.</p>
                                <ul className="list-unstyled text-muted small mb-4">
                                    <li className="mb-2"><i className="fas fa-check text-success me-2"></i>Registration Fee: Standard</li>
                                    <li className="mb-2"><i className="fas fa-check text-success me-2"></i>Admission Fee: One-time</li>
                                    <li className="mb-2"><i className="fas fa-check text-success me-2"></i>Monthly Tuition: Secondary Grade Stream</li>
                                    <li className="mb-2"><i className="fas fa-check text-success me-2"></i>Board / CAIE Registration: As per official board fees</li>
                                </ul>
                                <Link href="/contact" className="btn btn-outline-primary w-100 py-2 rounded-pill fw-semibold mt-auto">Inquire Fee Details</Link>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12">
                            <div className="card border-0 shadow-sm p-4 p-md-5 rounded-4" style={{ backgroundColor: "#004389", color: "#fff" }}>
                                <div className="row align-items-center">
                                    <div className="col-lg-8">
                                        <h4 className="fw-bold text-white mb-2">Payment Terms & Concessions</h4>
                                        <p className="text-white-50 mb-3">Fees are payable on a monthly basis by the 10th of each calendar month. Sibling concessions and merit-based fee waivers are available upon evaluation by the administration.</p>
                                        <p className="text-warning mb-0 fw-semibold">For exact fee challans and installment options, please contact our Accounts Office at +92 300 406 6340.</p>
                                    </div>
                                    <div className="col-lg-4 text-lg-end mt-4 mt-lg-0">
                                        <Link href="/contact" className="btn btn-warning px-4 py-3 rounded-pill fw-bold text-dark">
                                            Contact Accounts Desk
                                        </Link>
                                    </div>
                                </div>
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

export default FeeStructurePage;
