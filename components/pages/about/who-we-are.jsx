import React from 'react';
import bgImage from "../../../public/assets/img/about/about-solution.jpg";
import image from "../../../public/assets/img/about/about-9.jpg";
import shape from "../../../public/assets/img/shape/about-solution.png";
import Count from '../common/count';
import Link from 'next/link';

const WhoWeAre = () => {
    return (
        <>
            <div className="company__two section-padding pt-0" id="vision-statement">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-xl-6 col-lg-7 lg-mb-30">
                            <div className="company__two-left">
                                <div className="company__two-left-title" id="vision">
                                    <span className="subtitle-one">Mission & Vision</span>
                                    <h2>Holistic Education for Future Leaders</h2>
                                    <p><strong>Mission Statement:</strong> To build a fundamental teacher-student centered environment and a broad, inspiring curriculum with engaging resources. We aim to enhance students' abilities to transform them into confident, proactive, and independent learners.</p>
                                    <p className="mt-2"><strong>Vision Statement:</strong> To provide holistic, progressive, and value-based education that nurtures intellectual curiosity, moral integrity, and social responsibility.</p>
                                </div>
                                <div className="company__two-left-skill">
                                    <div className="company__two-left-skill-item">
                                        <h2><Count number={500} />+</h2>
                                        <h6>Enrolled Students</h6>
                                    </div>
                                    <div className="company__two-left-skill-item">
                                        <h2><Count number={100} />%</h2>
                                        <h6>Holistic Development</h6>
                                    </div>
                                </div>
                                <Link className="btn-two" href="/admissions">Join Our School<i className="far fa-chevron-double-right"></i></Link>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-5">
                            <div className="company__two-right dark__image t-right">
                                <img className="img__full rounded-4 shadow" src={image.src} alt="Grace Garden School Learning" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Core Values & Board of Governors Section */}
            <div className="section-padding py-5 bg-light" id="core-values">
                <div className="container">
                    <div className="row mb-5">
                        <div className="col-12 text-center" id="core">
                            <span className="subtitle-one">Our Principles</span>
                            <h2 className="fw-bold">Core Values of Grace Garden School</h2>
                            <p className="text-muted mx-auto" style={{ maxWidth: "700px" }}>Guiding every student and teacher towards ethical excellence and lifelong growth.</p>
                        </div>
                    </div>
                    <div className="row g-4">
                        {[
                            { title: 'Academic Excellence', desc: 'Fostering intellectual curiosity, critical thinking, and highest academic standards.', icon: 'fas fa-graduation-cap' },
                            { title: 'Character & Integrity', desc: 'Instilling honesty, ethical conduct, personal accountability, and moral strength.', icon: 'fas fa-shield-alt' },
                            { title: 'Inclusivity & Respect', desc: 'Promoting a supportive, diverse, and caring community where everyone thrives.', icon: 'fas fa-hands-helping' },
                            { title: 'Innovation & Creativity', desc: 'Encouraging forward-thinking, STEM problem solving, arts, and expression.', icon: 'fas fa-lightbulb' },
                            { title: 'Compassion & Service', desc: 'Developing empathetic individuals committed to making positive community contributions.', icon: 'fas fa-heart' },
                            { title: 'Leadership & Discipline', desc: 'Empowering students with proactive decision-making, resilience, and self-discipline.', icon: 'fas fa-user-tie' },
                        ].map((val, idx) => (
                            <div className="col-md-4" key={idx}>
                                <div className="card h-100 border-0 shadow-sm p-4 rounded-4 bg-white">
                                    <div className="d-flex align-items-center mb-3">
                                        <div className="me-3 p-3 rounded-circle fs-4" style={{ backgroundColor: 'rgba(249, 76, 48, 0.1)', color: 'var(--primary-color-1)' }}>
                                            <i className={val.icon}></i>
                                        </div>
                                        <h5 className="fw-bold mb-0 text-dark">{val.title}</h5>
                                    </div>
                                    <p className="text-muted mb-0">{val.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Board of Governors */}
                    <div className="row mt-5 pt-4" id="board-of-governors">
                        <div className="col-12" id="governors">
                            <div className="p-4 p-md-5 rounded-4 text-white" style={{ backgroundColor: "var(--primary-color-1)" }}>
                                <div className="row align-items-center">
                                    <div className="col-lg-8">
                                        <span className="text-warning fw-bold fs-6 mb-2 d-inline-block">Governance & Leadership</span>
                                        <h3 className="fw-bold text-white mb-3">Board of Governors</h3>
                                        <p className="text-white-50 mb-0">The Board of Governors at Grace Garden School comprises distinguished educationists, community leaders, and academic advisors. The board provides visionary strategic direction, ensures institutional accountability, and guarantees the highest standard of education for all students.</p>
                                    </div>
                                    <div className="col-lg-4 text-lg-end mt-4 mt-lg-0">
                                        <Link href="/contact" className="btn bg-white px-4 py-3 rounded-pill fw-bold" style={{ color: "var(--primary-color-1)" }}>
                                            Contact Leadership
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="about__solution" style={{backgroundImage: `url(${bgImage.src})`}}>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-xl-8">
                            <div className="about__solution-left xl-t-center">
                                <h2>Nurturing the Leaders and Innovators of Tomorrow.</h2>
                            </div>
                        </div>
                        <div className="col-xl-4">
                            <div className="about__solution-right t-right xl-t-center">						
                                <Link className="btn-one" href="/admissions">Apply For Admission<i className="far fa-chevron-double-right"></i></Link>
                                <img className="about__solution-right-shape left-right-animate" src={shape.src} alt="shape" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>        
        </>
    );
};

export default WhoWeAre;