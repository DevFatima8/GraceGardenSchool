"use client"
import SEO from "@/components/data/seo";
import HeaderOne from "@/components/layout/headers/header-one";
import BreadCrumb from "@/components/pages/common/breadcrumb";
import FooterOne from "@/components/layout/footers/footer-one";
import ScrollToTop from "@/components/pages/common/scroll/scroll-to-top";
import Link from "next/link";

const Page = () => {
    return (
        <>
            <SEO pageTitle="How to Prepare Your Child for School" />
            <HeaderOne />
            <BreadCrumb title="How to Prepare Your Child for School" innerTitle="How to Prepare Your Child for School" />
            
            <div className="section-padding py-5">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="card border-0 shadow-sm p-4 p-md-5 rounded-4 mb-4">
                                <span className="text-primary fw-bold fs-6 mb-2 d-inline-block">Parenting Guide & Transition Tips</span>
                                <h2 className="mb-4 text-dark fw-bold">How to Prepare Your Child for School</h2>
                                <p className="lead text-muted mb-4" style={{ lineHeight: "1.8" }}>
                                    Essential practical advice for parents on easing school transitions, establishing morning routines, and fostering an enthusiastic attitude towards learning.
                                </p>
                                
                                <div className="p-4 rounded-3 mb-4" style={{ backgroundColor: "#f8fafc", borderLeft: "4px solid #004389" }}>
                                    <h4 className="fw-bold mb-3" style={{ color: "#004389" }}>Grace Garden School Profile</h4>
                                    <p className="mb-2"><strong>Location:</strong> Sector C-2, Block 5, Green Town, Lahore</p>
                                    <p className="mb-2"><strong>Established:</strong> 2023</p>
                                    <p className="mb-0"><strong>Focus:</strong> Academic Excellence, Character Development & Co-Curricular Enrichment</p>
                                </div>

                                <h4 className="fw-bold mb-3 text-dark">Key Highlights & Objectives</h4>
                                <ul className="list-unstyled mb-4">
                                    <li className="mb-2 d-flex align-items-center">
                                        <i className="fas fa-check-circle text-success me-2"></i>
                                        <span>Student-centered learning environment with experienced, certified faculty.</span>
                                    </li>
                                    <li className="mb-2 d-flex align-items-center">
                                        <i className="fas fa-check-circle text-success me-2"></i>
                                        <span>Well-equipped modern classrooms, laboratories, and multimedia facilities.</span>
                                    </li>
                                    <li className="mb-2 d-flex align-items-center">
                                        <i className="fas fa-check-circle text-success me-2"></i>
                                        <span>Holistic character building, ethical values, and leadership training.</span>
                                    </li>
                                    <li className="mb-2 d-flex align-items-center">
                                        <i className="fas fa-check-circle text-success me-2"></i>
                                        <span>Regular parent-teacher engagement and continuous progress tracking.</span>
                                    </li>
                                </ul>

                                <div className="d-flex flex-wrap gap-3 pt-2">
                                    <Link href="/admissions" className="btn btn-primary px-4 py-2 rounded-pill fw-semibold">
                                        Admissions Info
                                    </Link>
                                    <Link href="/contact" className="btn btn-outline-secondary px-4 py-2 rounded-pill fw-semibold">
                                        Contact Office
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4">
                            <div className="card border-0 shadow-sm p-4 rounded-4 mb-4" style={{ backgroundColor: "#004389", color: "#fff" }}>
                                <h4 className="fw-bold mb-3 text-white">Need Assistance?</h4>
                                <p className="text-white-50 mb-4">Feel free to contact our administration for admissions, campus tours, or academic inquiries.</p>
                                <div className="mb-3">
                                    <p className="mb-1 text-white-50 small">Phone Numbers:</p>
                                    <p className="fw-bold mb-0 text-white">+92 300 406 6340 | +92 316 440 8633</p>
                                </div>
                                <div className="mb-3">
                                    <p className="mb-1 text-white-50 small">Landline:</p>
                                    <p className="fw-bold mb-0 text-white">+92 300 406 6340</p>
                                </div>
                                <div className="mb-3">
                                    <p className="mb-1 text-white-50 small">Email Address:</p>
                                    <p className="fw-bold mb-0 text-white">Gracegarden042@gmail.com</p>
                                </div>
                                <div className="mb-4">
                                    <p className="mb-1 text-white-50 small">Campus Address:</p>
                                    <p className="fw-bold mb-0 text-white">Sector C-2, Block 5, Green Town, Lahore</p>
                                </div>
                                <Link href="/contact" className="btn btn-warning w-100 py-2 rounded-pill fw-bold text-dark">
                                    Get In Touch
                                </Link>
                            </div>

                            <div className="card border-0 shadow-sm p-4 rounded-4 bg-white">
                                <h5 className="fw-bold mb-3 text-dark">Quick Navigation</h5>
                                <ul className="list-unstyled mb-0">
                                    <li className="py-2 border-bottom"><Link href="/about-us" className="text-decoration-none text-muted">About Grace Garden</Link></li>
                                    <li className="py-2 border-bottom"><Link href="/admissions" className="text-decoration-none text-muted">Admission Procedures</Link></li>
                                    <li className="py-2 border-bottom"><Link href="/fee-structure" className="text-decoration-none text-muted">Fee Structure</Link></li>
                                    <li className="py-2 border-bottom"><Link href="/curriculum" className="text-decoration-none text-muted">Academic Curriculum</Link></li>
                                    <li className="py-2"><Link href="/contact" className="text-decoration-none text-muted">Contact Campus</Link></li>
                                </ul>
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

export default Page;
