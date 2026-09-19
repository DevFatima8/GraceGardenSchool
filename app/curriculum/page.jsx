"use client"
import SEO from "@/components/data/seo";
import HeaderOne from "@/components/layout/headers/header-one";
import BreadCrumb from "@/components/pages/common/breadcrumb";
import FooterOne from "@/components/layout/footers/footer-one";
import ScrollToTop from "@/components/pages/common/scroll/scroll-to-top";
import Link from "next/link";

const CurriculumPage = () => {
    return (
        <>
            <SEO pageTitle="Curriculum - Grace Garden School" />
            <HeaderOne />
            <BreadCrumb title="Curriculum" innerTitle="Academic Curriculum" />
            
            <div className="section-padding py-5">
                <div className="container">
                    <div className="row mb-5">
                        <div className="col-lg-8">
                            <span className="text-primary fw-bold fs-6 mb-2 d-inline-block">Academic Framework</span>
                            <h2 className="fw-bold mb-3 text-dark">Holistic & Progressive Curriculum</h2>
                            <p className="lead text-muted">
                                Our curriculum blends national educational standards with international best practices. We emphasize deep conceptual understanding, inquiry-based STEM learning, digital literacy, and character development from early years to secondary education.
                            </p>
                        </div>
                    </div>

                    <div className="row g-4 mb-5">
                        <div className="col-md-6 col-lg-3">
                            <div className="card h-100 border-0 shadow-sm rounded-4 p-4 bg-white">
                                <div className="text-primary fs-2 mb-3"><i className="fas fa-shapes"></i></div>
                                <h5 className="fw-bold text-dark mb-2">Early Years Foundation</h5>
                                <p className="text-muted small mb-0">Play-based Montessori exploration, phonetic awareness, sensory coordination, and joyful social discovery for Pre-Schoolers.</p>
                            </div>
                        </div>

                        <div className="col-md-6 col-lg-3">
                            <div className="card h-100 border-0 shadow-sm rounded-4 p-4 bg-white">
                                <div className="text-primary fs-2 mb-3"><i className="fas fa-book-open"></i></div>
                                <h5 className="fw-bold text-dark mb-2">Primary Curriculum</h5>
                                <p className="text-muted small mb-0">Strong literacy, conceptual arithmetic, general science experiments, creative art, and introductory digital skills (Grades 1-5).</p>
                            </div>
                        </div>

                        <div className="col-md-6 col-lg-3">
                            <div className="card h-100 border-0 shadow-sm rounded-4 p-4 bg-white">
                                <div className="text-primary fs-2 mb-3"><i className="fas fa-atom"></i></div>
                                <h5 className="fw-bold text-dark mb-2">Middle School Years</h5>
                                <p className="text-muted small mb-0">Deepening analytical skills in Physics, Chemistry, Biology, Advanced Math, Social Studies, and ICT (Grades 6-8).</p>
                            </div>
                        </div>

                        <div className="col-md-6 col-lg-3">
                            <div className="card h-100 border-0 shadow-sm rounded-4 p-4 bg-white">
                                <div className="text-primary fs-2 mb-3"><i className="fas fa-award"></i></div>
                                <h5 className="fw-bold text-dark mb-2">Matric & Cambridge</h5>
                                <p className="text-muted small mb-0">Dual-stream excellence: BISE Lahore Board examinations and Cambridge Assessment International Education (CAIE) pathways.</p>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12">
                            <div className="card border-0 shadow-sm p-4 p-md-5 rounded-4 text-white" style={{ backgroundColor: "#004389" }}>
                                <div className="row align-items-center">
                                    <div className="col-lg-8">
                                        <h4 className="fw-bold text-white mb-2">Explore Our Classes & Programs</h4>
                                        <p className="text-white-50 mb-0">Discover details about each grade level, subjects offered, and extracurricular activities at Grace Garden School.</p>
                                    </div>
                                    <div className="col-lg-4 text-lg-end mt-4 mt-lg-0">
                                        <Link href="/admissions" className="btn btn-warning px-4 py-3 rounded-pill fw-bold text-dark">
                                            Admissions Procedure
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

export default CurriculumPage;
