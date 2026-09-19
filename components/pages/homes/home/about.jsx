import shape1 from "../../../../public/assets/img/shape/about-1.png";
import shape2 from "../../../../public/assets/img/shape/about-1-dark.png";
import shape3 from "../../../../public/assets/img/shape/about-2.png";
import shape4 from "../../../../public/assets/img/shape/about-2-dark.png";
import image1 from "../../../../public/assets/img/about/about-1.jpg";
import Count from "../../common/count";
import Link from "next/link";

const About = ({ data }) => {
    const aboutData = {
        count: 100,
        exp: '% Dedicated Focus on Excellence',
        subtitle: data?.subtitle || 'School Profile',
        title: data?.title || 'Grace Garden School',
        description: data?.description || 'Grace Garden School is a forward-thinking educational institution dedicated to fostering a learning environment where students are encouraged to explore their full potential. Established in 2023 in Sector C-2, Block 5, Green Town, Lahore, the school has quickly become a hub for academic excellence, character development, and extracurricular enrichment.',
        author_name: 'School Administration',
        author_sub: 'CEO & Principal Office',
        btn_title: 'Admissions Info',
        btn_link: '/admissions',
        avatar_img: '/assets/img/team/ceo-administrator.jpg'
    }
    return (
        <div className="about__one dark__image section-padding">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-xl-6 col-lg-6 lg-mb-30">
                        <div className="about__one-left">
                            <div className="about__one-left-image">
                                <img className="one rounded-4 shadow" src={data?.image_url || image1.src} alt="Grace Garden School" />
                            </div>
                            <div className="about__one-left-experience">
                                <h1><Count number={aboutData?.count}/>%</h1>
                                <h6>{aboutData?.exp}</h6>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-6 col-lg-6">
                        <div className="about__one-right">
                            <div className="about__one-right-title">
                                <span className="subtitle-one">{aboutData?.subtitle}</span>
                                <h2>{aboutData?.title}</h2>
                                <p>{aboutData?.description}</p>
                            </div>
                            <div className="about__one-right-btn">
                                <div>
                                    <Link className="btn-one" href={aboutData?.btn_link}>{aboutData?.btn_title}<i className="far fa-chevron-double-right"></i></Link>
                                </div>
                                <div className="about__one-right-btn-author">
                                    <div className="about__one-right-btn-author-avatar">
                                        <img src={aboutData.avatar_img} alt="CEO & Administrator" style={{ objectFit: 'cover', borderRadius: '50%' }} />
                                    </div>
                                    <div className="about__one-right-btn-author-name">
                                        <span className="text-one">{aboutData?.author_name}</span>
                                        <h6>{aboutData?.author_sub}</h6>
                                    </div>
                                </div>
                            </div>
                            <div className="about__one-right-bottom">
                                <div className="about__one-right-bottom-list">
                                    <span><i className="far fa-check"></i>Holistic student-centered learning.</span>
                                    <span><i className="far fa-check"></i>Character & moral development.</span>
                                    <span><i className="far fa-check"></i>Extracurricular & STEM enrichment.</span>
                                </div>
                                <div className="about__one-right-bottom-experience">
                                    <h3><span className="counter">Est.</span></h3>
                                    <h6>2023 in Lahore</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <img className="about__one-shape-1 dark-n" src={shape1?.src} alt="about-shape" />
            <img className="about__one-shape-1 light-n" src={shape2?.src} alt="about-shape" />
            <img className="about__one-shape-2 dark-n" src={shape3?.src} alt="about-shape" />
            <img className="about__one-shape-2 light-n" src={shape4?.src} alt="about-shape" />
        </div>
    );
};

export default About;