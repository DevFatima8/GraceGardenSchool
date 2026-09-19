"use client"
import SEO from "@/components/data/seo";
import HeaderOne from "@/components/layout/headers/header-one";
import BreadCrumb from "@/components/pages/common/breadcrumb";
import FooterOne from "@/components/layout/footers/footer-one";
import ScrollToTop from "@/components/pages/common/scroll/scroll-to-top";
import Link from "next/link";

const ActivitiesPage = () => {
    return (
        <>
            <SEO pageTitle="Activities - Grace Garden School" />
            <HeaderOne />
            <BreadCrumb title="Activities" innerTitle="Co-Curricular Life" />
            
            <div className="section-padding py-5">
                <div className="container">
                    <div className="row mb-5">
                        <div className="col-lg-8">
                            <span className="text-primary fw-bold fs-6 mb-2 d-inline-block">Life Beyond Books</span>
                            <h2 className="fw-bold mb-3 text-dark">Co-Curricular & Enrichment Activities</h2>
                            <p className="lead text-muted">
                                At Grace Garden School, education extends far beyond textbook learning. We cultivate well-rounded personalities through vibrant clubs, competitive sports, arts exhibitions, theatrical drama, and leadership opportunities.
                            </p>
                        </div>
                    </div>

                    <div className="row g-4 mb-5">
                        {[
                            { title: 'Robotics & STEM Club', desc: 'Hands-on programming, sensor builds, and STEM invention challenges.', icon: 'fas fa-robot' },
                            { title: 'Debating & MUN Society', desc: 'Bilingual parliamentary debates, declamation contests, and Model UN training.', icon: 'fas fa-microphone' },
                            { title: 'Arts & Creative Crafts', desc: 'Visual arts, canvas painting, pottery, origami, and annual exhibitions.', icon: 'fas fa-palette' },
                            { title: 'Sports & Martial Arts', desc: 'Cricket, football, badminton, gymnastics, and athletic training tournaments.', icon: 'fas fa-futbol' },
                            { title: 'Community Outreach & Service', desc: 'Charity drives, tree plantation campaigns, and social welfare projects.', icon: 'fas fa-seedling' },
                            { title: 'Music & Theatrical Drama', desc: 'Vocal singing, instruments, theatrical plays, and annual performance day.', icon: 'fas fa-theater-masks' },
                        ].map((act, idx) => (
                            <div className="col-md-6 col-lg-4" key={idx}>
                                <div className="card h-100 border-0 shadow-sm rounded-4 p-4 bg-white">
                                    <div className="text-primary fs-2 mb-3"><i className={act.icon}></i></div>
                                    <h4 className="fw-bold text-dark mb-2">{act.title}</h4>
                                    <p className="text-muted small mb-0">{act.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="row">
                        <div className="col-12">
                            <div className="p-4 p-md-5 rounded-4 text-white text-center" style={{ backgroundColor: "#004389" }}>
                                <h4 className="fw-bold text-white mb-2">Want to Learn More About Campus Activities?</h4>
                                <p className="text-white-50 mb-4">Explore our upcoming school events or contact our Student Enrichment (SET) department.</p>
                                <div className="d-flex justify-content-center flex-wrap gap-3">
                                    <Link href="/events" className="btn btn-warning px-4 py-2 rounded-pill fw-bold text-dark">
                                        View School Events
                                    </Link>
                                    <Link href="/contact" className="btn btn-outline-light px-4 py-2 rounded-pill fw-bold">
                                        Contact Administration
                                    </Link>
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

export default ActivitiesPage;
