import Link from "next/link";
import bgImage from "../../../../public/assets/img/pages/getInTouch.jpg";

const GetInTouch = ({ data }) => {
    const touchContent = {
        subtitle: data?.subtitle || 'Extracurricular Activities',
        title: data?.title || 'Developing Well-Rounded Students',
        title2: 'Sports, Clubs & Community Service',
        des: data?.description || 'From sports festivals and debate clubs to drama society and robotics, Grace Garden School provides diverse extracurriculars that foster leadership, teamwork, and civic responsibility.',
    }
    return (
        <>
            <div className="getIn__touch section-padding" style={{ backgroundImage: `url(${data?.image_url || bgImage.src})` }}>
                <img className="getIn__touch-shape left-right-animate2" src="assets/img/shape/getInTouch.png" alt="shape" />
                <div className="container">
                    <div className="row">
                        <div className="col-xl-6 col-lg-5 lg-mb-30">
                            <div className="getIn__touch-left">
                                <div className="getIn__touch-left-title">
                                    <span className="subtitle-one">{touchContent.subtitle}</span>
                                    <h2>{touchContent.title}</h2>
                                </div>
                                <div className="getIn__touch-left-form">
                                    <form action="#">
                                        <div className="mt-25">
                                            <input type="text" name="name" placeholder="Student / Parent Full Name" required="required" />
                                        </div>
                                        <div className="mt-25">
                                            <input type="email" name="email" placeholder="Email Address" required="required" />
                                        </div>
                                        <div className="mt-25">
                                            <input type="text" name="subject" placeholder="Grade Applying For" required="required" />
                                        </div>
                                        <div className="mt-25">
                                            <button className="btn-one" type="submit">Submit Inquiry</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-7">
                            <div className="getIn__touch-right">
                                <div className="getIn__touch-right-title">
                                    <h2>{touchContent.title2}</h2>
                                    <p>{touchContent.des}</p>
                                </div>
                                <div className="getIn__touch-right-bottom">
                                    <div className="getIn__touch-right-bottom-text">
                                        <h4>Nurturing Tomorrow's Leaders in Lahore</h4>
                                    </div>
                                    <div className="getIn__touch-right-bottom-shape">
                                        <img src="assets/img/icon/getInTouch.png" alt="shape" />
                                    </div>
                                    <div className="getIn__touch-right-bottom-image">
                                        <ul>
                                            <li><img src="/assets/img/team/ceo-administrator.jpg" alt="CEO" /></li>
                                            <li><img src="assets/img/avatar/avatar-2.jpg" alt="Faculty" /></li>
                                            <li><img src="assets/img/avatar/avatar-3.jpg" alt="Faculty" /></li>
                                            <li><img src="assets/img/avatar/avatar-4.jpg" alt="Student" /></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-xl-5"></div>
                    <div className="col-xl-7">
                        <div className="help__area">
                            <div className="help__area-item">
                                <div className="help__area-item-icon icon-animation">
                                    <i className="fal fa-phone-alt"></i>
                                </div>
                                <div className="help__area-item-info">
                                    <span className="text-three">Admission Helpdesk</span>
                                    <h5><Link href="tel:+923004066340">+92 300 406 6340</Link></h5>
                                </div>
                            </div>
                            <div className="help__area-item">
                                <div className="help__area-item-icon">
                                    <i className="fal fa-envelope-open-text"></i>
                                </div>
                                <div className="help__area-item-info">
                                    <span className="text-three">Official Email</span>
                                    <h5><Link href="mailto:Gracegarden042@gmail.com">Gracegarden042@gmail.com</Link></h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default GetInTouch;