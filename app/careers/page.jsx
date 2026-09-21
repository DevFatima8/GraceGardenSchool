"use client"
import SEO from "@/components/data/seo";
import HeaderOne from "@/components/layout/headers/header-one";
import BreadCrumb from "@/components/pages/common/breadcrumb";
import FooterOne from "@/components/layout/footers/footer-one";
import ScrollToTop from "@/components/pages/common/scroll/scroll-to-top";
import Link from "next/link";

const CareersPage = () => {
    return (
        <>
            <SEO pageTitle="Careers - Grace Garden School" />
            <HeaderOne />
            <BreadCrumb title="Careers" innerTitle="Join Our Team" />
            
            <div className="section-padding py-5">
                <div className="container">
                    <div className="row mb-5">
                        <div className="col-lg-8">
                            <span className="text-primary fw-bold fs-6 mb-2 d-inline-block">Join Our Faculty</span>
                            <h2 className="fw-bold mb-3 text-dark">Build a Rewarding Teaching Career</h2>
                            <p className="lead text-muted">
                                At Grace Garden School, we are always looking for passionate, certified, and forward-thinking educators and administrative professionals who want to make a meaningful difference in the lives of young learners.
                            </p>
                        </div>
                    </div>

                    <div className="row g-4 mb-5">
                        {[
                            { title: 'Pre-School / Montessori Teacher', dept: 'Early Childhood Wing', type: 'Full-Time', req: 'Montessori Diploma / Graduate with 2+ years of early childhood teaching experience.' },
                            { title: 'Primary English & Science Teacher', dept: 'Primary Wing (Grades 1-5)', type: 'Full-Time', req: 'B.Ed / BS English or Science with strong pedagogical skills and fluency.' },
                            { title: 'Mathematics & Computer Teacher', dept: 'Middle & Matric Wing', type: 'Full-Time', req: 'BS Mathematics / Computer Science with experience in BISE / Cambridge syllabi.' },
                            { title: 'Physics / Chemistry Subject Specialist', dept: 'Secondary Wing (Grades 9-10)', type: 'Full-Time', req: 'M.Sc / BS in relevant field with proven track record of excellent board results.' },
                        ].map((job, idx) => (
                            <div className="col-md-6" key={idx}>
                                <div className="card h-100 border-0 shadow-sm rounded-4 p-4 bg-white">
                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                        <span className="badge bg-primary bg-opacity-10 text-primary py-2 px-3 rounded-pill fw-bold">{job.dept}</span>
                                        <span className="badge bg-success bg-opacity-10 text-success py-2 px-3 rounded-pill fw-bold">{job.type}</span>
                                    </div>
                                    <h4 className="fw-bold text-dark mt-2 mb-2">{job.title}</h4>
                                    <p className="text-muted small mb-4">{job.req}</p>
                                    <div className="mt-auto pt-3 border-top">
                                        <Link href="mailto:admin@gracegardenschool.com" className="btn btn-outline-primary rounded-pill px-4">
                                            Apply via Email
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="row">
                        <div className="col-12">
                            <div className="p-4 p-md-5 rounded-4 text-white text-center" style={{ backgroundColor: "#004389" }}>
                                <h4 className="fw-bold text-white mb-2">How to Apply</h4>
                                <p className="text-white-50 mb-4">Please email your updated CV/Resume mentioning the position in the subject line to <strong>admin@gracegardenschool.com</strong> or drop your CV at our campus in Sector C-2, Block 5, Green Town, Lahore.</p>
                                <Link href="/contact" className="btn btn-warning px-4 py-2 rounded-pill fw-bold text-dark">
                                    Contact HR Desk
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

export default CareersPage;
