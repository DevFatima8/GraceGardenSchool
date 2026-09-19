"use client"
import SEO from "@/components/data/seo";
import HeaderOne from "@/components/layout/headers/header-one";
import BreadCrumb from "@/components/pages/common/breadcrumb";
import FooterOne from "@/components/layout/footers/footer-one";
import ScrollToTop from "@/components/pages/common/scroll/scroll-to-top";
import Link from "next/link";

const BooksListsPage = () => {
    return (
        <>
            <SEO pageTitle="Books Lists - Grace Garden School" />
            <HeaderOne />
            <BreadCrumb title="Books Lists" innerTitle="Books Lists" />
            
            <div className="section-padding py-5">
                <div className="container">
                    <div className="row mb-5">
                        <div className="col-lg-8">
                            <span className="text-primary fw-bold fs-6 mb-2 d-inline-block">Academic Year Syllabus</span>
                            <h2 className="fw-bold mb-3 text-dark">Prescribed Books & Stationery Lists</h2>
                            <p className="lead text-muted">
                                Grace Garden School carefully selects world-class textbooks from Oxford University Press, Cambridge University Press, and National Curriculum boards to foster critical inquiry, conceptual clarity, and language fluency.
                            </p>
                        </div>
                    </div>

                    <div className="row g-4 mb-5">
                        {[
                            { section: 'Pre-School Wing', classes: 'Pre-Nursery, Nursery & Prep', publishers: 'Oxford Phonics, Early Math Workbooks & Sensory Activity Packs' },
                            { section: 'Lower Primary (Grades 1 - 2)', classes: 'Class 1 & Class 2', publishers: 'Oxford Progressive English, Primary Mathematics & General Science' },
                            { section: 'Upper Primary (Grades 3 - 5)', classes: 'Class 3, 4 & 5', publishers: 'Oxford International Primary Science, Social Studies, Urdu & ICT' },
                            { section: 'Middle School (Grades 6 - 8)', classes: 'Class 6, 7 & 8', publishers: 'Cambridge Lower Secondary Checkpoint Series & National Curriculum' },
                            { section: 'Matriculation Wing (9 - 10)', classes: 'Class 9 & Class 10 (BISE)', publishers: 'Punjab Textbook Board (PTB) Prescribed Science & Humanities Textbooks' },
                            { section: 'Cambridge Wing (O-Level)', classes: 'Grade 9C & 10C (CAIE)', publishers: 'Cambridge University Press & Hodder Education O-Level Endorsed Series' },
                        ].map((item, idx) => (
                            <div className="col-md-6 col-lg-4" key={idx}>
                                <div className="card h-100 border-0 shadow-sm rounded-4 p-4 bg-white">
                                    <span className="badge bg-primary bg-opacity-10 text-primary mb-2 align-self-start py-2 px-3 rounded-pill fw-bold">{item.section}</span>
                                    <h5 className="fw-bold text-dark mt-2 mb-2">{item.classes}</h5>
                                    <p className="text-muted small mb-4">{item.publishers}</p>
                                    <div className="mt-auto pt-3 border-top d-flex justify-content-between align-items-center">
                                        <span className="text-success small fw-semibold"><i className="fas fa-check-circle me-1"></i>Approved List</span>
                                        <Link href="/contact" className="btn btn-sm btn-outline-primary rounded-pill px-3">Collect List</Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="row">
                        <div className="col-12">
                            <div className="p-4 p-md-5 rounded-4 text-white text-center" style={{ backgroundColor: "#004389" }}>
                                <h4 className="fw-bold text-white mb-2">Need a Printed Copy of the Book List?</h4>
                                <p className="text-white-50 mb-4">Complete book lists with notebook specifications and stationary requirements are available at our school administrative office.</p>
                                <Link href="/contact" className="btn btn-warning px-4 py-2 rounded-pill fw-bold text-dark">
                                    Contact Admissions Desk
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

export default BooksListsPage;
