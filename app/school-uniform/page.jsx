"use client"
import SEO from "@/components/data/seo";
import HeaderOne from "@/components/layout/headers/header-one";
import BreadCrumb from "@/components/pages/common/breadcrumb";
import FooterOne from "@/components/layout/footers/footer-one";
import ScrollToTop from "@/components/pages/common/scroll/scroll-to-top";
import Link from "next/link";

const SchoolUniformPage = () => {
    return (
        <>
            <SEO pageTitle="School Uniform & Dress Code - Grace Garden School" />
            <HeaderOne />
            <BreadCrumb title="School Uniform" innerTitle="School Uniform" />
            
            <div className="section-padding py-5">
                <div className="container">
                    <div className="row mb-5">
                        <div className="col-lg-8">
                            <span className="text-primary fw-bold fs-6 mb-2 d-inline-block">Identity & Discipline</span>
                            <h2 className="fw-bold mb-3 text-dark">Official School Uniform Guidelines</h2>
                            <p className="lead text-muted">
                                Wearing the proper school uniform instills a sense of belonging, unity, and pride in our students. All students from Pre-School to Secondary level are required to adhere to the uniform guidelines neatly each school day.
                            </p>
                        </div>
                    </div>

                    <div className="row g-4 mb-5">
                        <div className="col-md-6">
                            <div className="card border-0 shadow-sm rounded-4 p-4 p-md-5 h-100 bg-white">
                                <h4 className="fw-bold text-primary mb-3"><i className="fas fa-sun me-2"></i>Summer Uniform</h4>
                                <h6 className="fw-bold text-dark mt-3">Boys (Pre-School & Primary to Secondary):</h6>
                                <ul className="text-muted small mb-4">
                                    <li>Official school polo / white shirt with embroidered Grace Garden School crest.</li>
                                    <li>School grey trousers / tailored shorts for junior grades.</li>
                                    <li>Black school shoes with school crest socks.</li>
                                    <li>Clean haircut and trimmed nails.</li>
                                </ul>

                                <h6 className="fw-bold text-dark mt-3">Girls (Pre-School & Primary to Secondary):</h6>
                                <ul className="text-muted small mb-0">
                                    <li>Official school tunic / shirt with school necktie/scarf and monogram.</li>
                                    <li>White shalwar / uniform trousers.</li>
                                    <li>Black shoes with white socks. Hair tied neatly with school ribbons/bands.</li>
                                </ul>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="card border-0 shadow-sm rounded-4 p-4 p-md-5 h-100 bg-white">
                                <h4 className="fw-bold text-primary mb-3"><i className="fas fa-snowflake me-2"></i>Winter Uniform</h4>
                                <h6 className="fw-bold text-dark mt-3">Boys & Girls:</h6>
                                <ul className="text-muted small mb-4">
                                    <li>Official navy blue V-neck pullover / sweater with school monogram.</li>
                                    <li>Official navy blue school blazer (mandatory for Middle and Secondary wings).</li>
                                    <li>School necktie and standard winter uniform shirts.</li>
                                    <li>Standard navy blue winter caps and scarves if required.</li>
                                </ul>

                                <h6 className="fw-bold text-dark mt-3">Physical Education (PE) & Sports Kit:</h6>
                                <ul className="text-muted small mb-0">
                                    <li>House T-shirt (Red, Blue, Green, Yellow) on designated sports days.</li>
                                    <li>Navy blue track pants and white trainers/joggers.</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12">
                            <div className="p-4 p-md-5 rounded-4 bg-light text-center border">
                                <h4 className="fw-bold text-dark mb-2">Authorized Uniform Suppliers</h4>
                                <p className="text-muted mb-4">Official Grace Garden School uniform sets, monograms, badges, and sports gear are available at our designated uniform partner stores in Green Town, Lahore.</p>
                                <Link href="/contact" className="btn btn-primary px-4 py-2 rounded-pill fw-semibold">
                                    Inquire Supplier Details
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

export default SchoolUniformPage;
