import Link from "next/link";
import Count from "../common/count";

const AboutMain = () => {
    const aboutContent = {
        image_1: '/assets/img/about/about-7.jpg',
        image_2: '/assets/img/about/about-8.jpg',
        subtitle: 'School Profile',
        title: 'Grace Garden School',
        description: 'Grace Garden School is a forward-thinking educational institution dedicated to fostering a learning environment where students are encouraged to explore their full potential. Established in 2023 in Green Town, Lahore, the school has quickly become a hub for academic excellence, character development, and extracurricular enrichment.',
        btn_text: 'Admissions Info',
        btn_href: '/admissions',
        shape_1: '/assets/img/shape/about-1.png',
        shape_2: '/assets/img/shape/about-2.png',
    }
    return (
        <>
            <div className="about__company section-padding" id="school-motto">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-xxl-7 col-xl-6 xl-mb-30">
                            <div className="about__company-left">
                                <div className="about__company-left-image dark__image">
                                    <img src={aboutContent.image_1} alt="Grace Garden School" />
                                    <img src={aboutContent.image_2} alt="Grace Garden School Campus" />
                                </div>
                                <div className="about__company-left-experience">
                                    <h2><Count number={100} />%</h2>
                                    <h6>Dedicated Faculty</h6>
                                </div>
                            </div>
                        </div>
                        <div className="col-xxl-5 col-xl-6">
                            <div className="about__company-right">
                                <div className="about__company-right-title">							
                                    <span className="subtitle-one">{aboutContent.subtitle}</span>
                                    <h2>{aboutContent.title}</h2>
                                    <p>{aboutContent.description}</p>
                                    
                                    <div className="mt-4 mb-4 p-3 rounded bg-light" id="motto" style={{ borderLeft: "4px solid #004389" }}>
                                        <h5 className="fw-bold mb-1" style={{ color: "#004389" }}>School Motto</h5>
                                        <p className="mb-0 text-muted fst-italic">"Cultivating Minds, Nurturing Hearts, Building Future Leaders"</p>
                                    </div>

                                    <Link className="btn-one" href={aboutContent.btn_href}>{aboutContent.btn_text}</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <img className="about__one-shape-1" src={aboutContent.shape_1} alt="shape" />
                <img className="about__one-shape-2" src={aboutContent.shape_2} alt="shape" />
            </div>
        </>
    );
};

export default AboutMain;