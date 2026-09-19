import React from 'react';
import image1 from "../../../public/assets/img/about/history-1.jpg";
import image2 from "../../../public/assets/img/about/history-2.jpg";
import image3 from "../../../public/assets/img/about/history-3.jpg";

const History = () => {
    return (
        <div className="company__history section-padding" id="our-history">
            <div className="container" id="history">
                <div className="row mb-70">
                    <div className="col-xl-12">
                        <div className="company__history-title t-center">
                            <span className="subtitle-one">Our Journey</span>
                            <h2>The Story of Grace Garden School</h2>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xl-12">
                        <div className="company__history-area dark__image">
                            <div className="company__history-area-item">
                                <div className="company__history-area-item-left">
                                    <img src={image1.src} alt="Inception" />
                                </div>
                                <div className="company__history-area-item-right">
                                    <div className="company__history-area-item-right-content mb-50 xl-mb-30">
                                        <div className="company__history-area-item-right-content-date">
                                            <span>2023</span>
                                            <h5>Establishment of Campus</h5>
                                        </div>
                                        <p>Grace Garden School was established in Sector C-2, Block 5, Green Town, Lahore with a mission to deliver modern, holistic, and value-based education.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="company__history-area-items">
                                <div className="company__history-area-items-left order-last order-lg-first">
                                    <div className="company__history-area-items-left-content mb-50 xl-mb-30">
                                        <div className="company__history-area-items-left-content-date">
                                            <span>2024</span>
                                            <h5>Expansion of Academic Wings</h5>
                                        </div>
                                        <p>Introduced state-of-the-art computer and science laboratories, enriched Cambridge Lower Secondary pathways, and enhanced STEM learning clubs.</p>
                                    </div>
                                </div>
                                <div className="company__history-area-items-right">
                                    <div className="company__history-area-items-right-image">
                                        <img src={image2.src} alt="Academic Growth" />
                                    </div>
                                </div>
                            </div>
                            <div className="company__history-area-item">
                                <div className="company__history-area-item-left">
                                    <div className="company__history-area-item-left-image">
                                        <img src={image3.src} alt="Ongoing Success" />
                                    </div>
                                </div>
                                <div className="company__history-area-item-right">
                                    <div className="company__history-area-item-right-content">
                                        <div className="company__history-area-item-right-content-date">
                                            <span>Present</span>
                                            <h5>Excellence in Action</h5>
                                        </div>
                                        <p>Continuing to set higher standards of academic rigor, character development, and student leadership across all grade levels.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default History;