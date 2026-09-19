"use client"
import SEO from "@/components/data/seo";
import HeaderOne from "@/components/layout/headers/header-one";
import BreadCrumb from "@/components/pages/common/breadcrumb";
import FooterOne from "@/components/layout/footers/footer-one";
import ScrollToTop from "@/components/pages/common/scroll/scroll-to-top";
import Link from "next/link";

const EventsPage = () => {
    return (
        <>
            <SEO pageTitle="Events & Celebrations - Grace Garden School" />
            <HeaderOne />
            <BreadCrumb title="Events" innerTitle="School Calendar & Events" />
            
            <div className="section-padding py-5">
                <div className="container">
                    <div className="row mb-5">
                        <div className="col-lg-8">
                            <span className="text-primary fw-bold fs-6 mb-2 d-inline-block">Annual Highlights</span>
                            <h2 className="fw-bold mb-3 text-dark">School Events & Celebrations</h2>
                            <p className="lead text-muted">
                                We celebrate academic milestones, cultural festivals, scientific discoveries, and athletic feats throughout the academic year.
                            </p>
                        </div>
                    </div>

                    <div className="row g-4 mb-5">
                        {[
                            { title: 'Annual School Day & Awards', date: 'Annual Event', desc: 'Commemorating student excellence, academic top positions, and faculty honors.', link: '/school-day' },
                            { title: 'Science & Art Exhibition', date: 'Spring Term', desc: 'Interactive STEM models, robotics presentations, and student visual artwork.', link: '/science-art-exhibition' },
                            { title: 'Annual Drama Festival', date: 'Winter Term', desc: 'Theatrical stage plays, creative monologues, and dramatic performances.', link: '/annual-drama' },
                            { title: 'Annual Sports Gala', date: 'Sports Week', desc: 'Track and field races, inter-house football matches, cricket cups, and tug-of-war.', link: '/annual-sports-meet' },
                            { title: 'Brain Quiz Competition', date: 'Inter-Class', desc: 'Academic trivia, rapid-fire logic puzzles, and science knowledge contest.', link: '/brain-competition' },
                            { title: 'National & Cultural Celebrations', date: 'Seasonal', desc: 'Independence Day, Pakistan Day, Eid Milad, and Peace Celebrations.', link: '/celebrations' },
                        ].map((ev, idx) => (
                            <div className="col-md-6 col-lg-4" key={idx}>
                                <div className="card h-100 border-0 shadow-sm rounded-4 p-4 bg-white">
                                    <span className="badge bg-primary bg-opacity-10 text-primary mb-2 align-self-start py-2 px-3 rounded-pill fw-bold">{ev.date}</span>
                                    <h4 className="fw-bold text-dark mt-2 mb-2">{ev.title}</h4>
                                    <p className="text-muted small mb-4">{ev.desc}</p>
                                    <div className="mt-auto pt-3 border-top">
                                        <Link href={ev.link} className="btn btn-sm btn-outline-primary rounded-pill px-3">
                                            Event Details
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
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

export default EventsPage;
