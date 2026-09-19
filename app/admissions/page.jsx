"use client"
import SEO from "@/components/data/seo";
import HeaderOne from "@/components/layout/headers/header-one";
import BreadCrumb from "@/components/pages/common/breadcrumb";
import FooterOne from "@/components/layout/footers/footer-one";
import ScrollToTop from "@/components/pages/common/scroll/scroll-to-top";
import Link from "next/link";

const AdmissionsPage = () => {
    return (
        <>
            <SEO pageTitle="Admissions - Grace Garden School" />
            <HeaderOne />
            <BreadCrumb title="Admissions" innerTitle="Admissions" />
            
            <div className="section-padding py-5">
                <div className="container">
                    {/* Overview */}
                    <div className="row mb-5" id="overview">
                        <div className="col-lg-8">
                            <span className="text-primary fw-bold fs-6 mb-2 d-inline-block">Welcome to Grace Garden</span>
                            <h2 className="fw-bold mb-4 text-dark">Admissions Overview</h2>
                            <p className="lead text-muted mb-4">
                                At Grace Garden School, we welcome ambitious learners from Pre-School to Matric & Cambridge streams. Our admissions process is designed to identify students who are eager to learn, grow, and thrive in an intellectually inspiring and nurturing environment.
                            </p>
                            <p className="text-muted">
                                We admit students on merit, baseline assessment evaluation, and family interview, ensuring each child receives the personalized attention and academic support required to excel.
                            </p>
                        </div>
                        <div className="col-lg-4">
                            <div className="card border-0 shadow-sm p-4 rounded-4 text-white" style={{ backgroundColor: "#004389" }}>
                                <h4 className="fw-bold text-white mb-3">Admission Key Contacts</h4>
                                <p className="text-white-50 small mb-2">Visit our admission office or contact us:</p>
                                <p className="mb-1 text-warning fw-bold"><i className="fas fa-phone-alt me-2"></i>+92 300 406 6340</p>
                                <p className="mb-1 text-warning fw-bold"><i className="fas fa-phone-alt me-2"></i>+92 316 440 8633</p>
                                <p className="mb-3 text-warning fw-bold"><i className="fas fa-phone-office me-2"></i>+92 300 406 6340</p>
                                <p className="small text-white-50 mb-4"><i className="fas fa-map-marker-alt me-2"></i>Sector C-2, Block 5, Green Town, Lahore</p>
                                <Link href="/registrations" className="btn btn-warning w-100 py-2 rounded-pill fw-bold text-dark">
                                    Register Online
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Why Grace Garden */}
                    <div className="row mb-5 py-4 bg-light rounded-4 p-4 p-md-5" id="why-ggs">
                        <div className="col-12 text-center mb-4">
                            <span className="text-primary fw-bold fs-6 mb-2 d-inline-block">Why Choose Us</span>
                            <h3 className="fw-bold text-dark">Why Grace Garden School?</h3>
                        </div>
                        <div className="col-md-4 mb-4">
                            <div className="card h-100 border-0 shadow-sm p-4 rounded-4 bg-white">
                                <div className="text-primary fs-2 mb-3"><i className="fas fa-chalkboard-teacher"></i></div>
                                <h5 className="fw-bold text-dark">Certified & Caring Faculty</h5>
                                <p className="text-muted small mb-0">Our educators combine proven subject expertise with empathetic, student-centered teaching methodologies.</p>
                            </div>
                        </div>
                        <div className="col-md-4 mb-4">
                            <div className="card h-100 border-0 shadow-sm p-4 rounded-4 bg-white">
                                <div className="text-primary fs-2 mb-3"><i className="fas fa-microscope"></i></div>
                                <h5 className="fw-bold text-dark">Modern STEM & IT Labs</h5>
                                <p className="text-muted small mb-0">Equipped with science labs, computer workstations, robotics, and interactive learning tools.</p>
                            </div>
                        </div>
                        <div className="col-md-4 mb-4">
                            <div className="card h-100 border-0 shadow-sm p-4 rounded-4 bg-white">
                                <div className="text-primary fs-2 mb-3"><i className="fas fa-medal"></i></div>
                                <h5 className="fw-bold text-dark">Character & Values</h5>
                                <p className="text-muted small mb-0">Comprehensive co-curricular activities, ethical grooming, leadership clubs, and sports galas.</p>
                            </div>
                        </div>
                    </div>

                    {/* Admission Process */}
                    <div className="row mb-5" id="process">
                        <div className="col-12 mb-4">
                            <span className="text-primary fw-bold fs-6 mb-2 d-inline-block">Step by Step</span>
                            <h3 className="fw-bold text-dark">Admission Process</h3>
                        </div>
                        <div className="col-md-3 mb-4">
                            <div className="p-4 rounded-4 border bg-white text-center h-100">
                                <div className="rounded-circle bg-primary text-white fw-bold d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '45px', height: '45px' }}>1</div>
                                <h5 className="fw-bold text-dark">Step 1: Registration</h5>
                                <p className="text-muted small mb-0">Submit online registration form or collect the prospectus packet from the admissions desk.</p>
                            </div>
                        </div>
                        <div className="col-md-3 mb-4">
                            <div className="p-4 rounded-4 border bg-white text-center h-100">
                                <div className="rounded-circle bg-primary text-white fw-bold d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '45px', height: '45px' }}>2</div>
                                <h5 className="fw-bold text-dark">Step 2: Assessment</h5>
                                <p className="text-muted small mb-0">Age-appropriate written assessment/informal observation to evaluate readiness and grade placement.</p>
                            </div>
                        </div>
                        <div className="col-md-3 mb-4">
                            <div className="p-4 rounded-4 border bg-white text-center h-100">
                                <div className="rounded-circle bg-primary text-white fw-bold d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '45px', height: '45px' }}>3</div>
                                <h5 className="fw-bold text-dark">Step 3: Interview</h5>
                                <p className="text-muted small mb-0">Parent and student interactive session with the principal/wing coordinator.</p>
                            </div>
                        </div>
                        <div className="col-md-3 mb-4">
                            <div className="p-4 rounded-4 border bg-white text-center h-100">
                                <div className="rounded-circle bg-primary text-white fw-bold d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '45px', height: '45px' }}>4</div>
                                <h5 className="fw-bold text-dark">Step 4: Fee & Enrollment</h5>
                                <p className="text-muted small mb-0">Submission of required documents, fee voucher payment, and receipt of admission confirmation.</p>
                            </div>
                        </div>
                    </div>

                    {/* Quick Action Buttons */}
                    <div className="row">
                        <div className="col-12 text-center p-4 rounded-4 text-white" style={{ backgroundColor: "#004389" }}>
                            <h4 className="fw-bold text-white mb-2">Ready to Enroll Your Child?</h4>
                            <p className="text-white-50 mb-4">Check our fee structure or start registration online today.</p>
                            <div className="d-flex justify-content-center flex-wrap gap-3">
                                <Link href="/registrations" className="btn btn-warning px-4 py-2 rounded-pill fw-bold text-dark">
                                    Register Online Now
                                </Link>
                                <Link href="/fee-structure" className="btn btn-outline-light px-4 py-2 rounded-pill fw-bold">
                                    View Fee Structure
                                </Link>
                                <Link href="/books-lists" className="btn btn-outline-light px-4 py-2 rounded-pill fw-bold">
                                    Books Lists
                                </Link>
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

export default AdmissionsPage;
