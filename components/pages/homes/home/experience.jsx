import Link from "next/link";
import image1 from "../../../../public/assets/img/pages/experience-1.jpg";
import SkillBarItem from "../../common/skill-bar";

const Experience = ({ data }) => {
    const experienceContent = {
        subtitle: data?.subtitle || 'Faculty and Staff',
        title: data?.title || 'Dedicated to Academic Excellence & Mentorship',
        des: data?.description || 'The quality of our teaching staff directly impacts the learning experience. Our faculty is dedicated to fostering academic excellence, continuous professional development, and student-centered growth.',
        btn_text: 'Join Our Team',
        btn_link: '/careers',
        progress1: '98',
        progress2: '100',
    }
    return (
        <>
            <div className="experience__area dark__image section-padding">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-xl-6 col-lg-6 lg-mb-30">
                            <div className="experience__area-image">
                                <img className="experience__area-image-shape left-right-animate" src="assets/img/shape/dots.png" alt="" />
                                <div className="experience__area-image-item">
                                    <img className="rounded-4 shadow" src={data?.image_url || image1.src} alt="Faculty and Learning" />
                                </div>
                                <div className="experience__area-image-item mt-65">
                                    <img className="rounded-4 shadow" src="/assets/img/team/ceo-administrator.jpg" alt="School Leadership" />
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6">
                            <div className="experience__area-right">
                                <div className="experience__area-right-title">
                                    <span className="subtitle-one">{experienceContent.subtitle}</span>
                                    <h2>{experienceContent.title}</h2>		
                                    <p>{experienceContent.des}</p>
                                </div>
                                <div className="skill__area mt-30">
                                    <div className="skill__area-item">
                                        <div className="skill__area-item-content">
                                            <span className="text-two">Highly Qualified & Certified Teachers</span>
                                        </div>
                                        <div className="skill__area-item-inner">
                                            <SkillBarItem countUp={experienceContent?.progress1} />
                                        </div>
                                    </div>
                                    <div className="skill__area-item">
                                        <div className="skill__area-item-content">
                                            <span className="text-two">Continuous Professional Development</span>
                                        </div>
                                        <div className="skill__area-item-inner">
                                            <SkillBarItem countUp={experienceContent?.progress2} />
                                        </div>
                                    </div>
                                </div>
                                <Link className="btn-two" href={experienceContent.btn_link}>{experienceContent.btn_text}<i className="far fa-chevron-double-right"></i></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Experience;