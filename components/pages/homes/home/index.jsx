"use client";
import React, { useEffect, useState } from 'react';
import SEO from "@/components/data/seo";
import HeaderOne from "@/components/layout/headers/header-one";
import About from "./about";
import Services from "./services";
import CtaArea from "./cta";
import Experience from "./experience";
import Portfolio from "./portfolio";
import Testimonial from "./testimonial";
import GetInTouch from "./get-in-touch";
import Blog from "./blog";
import FooterOne from "@/components/layout/footers/footer-one";
import BannerOne from "./banner";
import ScrollToTop from "../../common/scroll/scroll-to-top";

const HomeOne = () => {
    const [content, setContent] = useState(null);

    useEffect(() => {
        fetch('/api/home-content')
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    const contentMap = {};
                    data.data.forEach(item => {
                        contentMap[item.section_id] = item;
                    });
                    setContent(contentMap);
                }
            })
            .catch(console.error);
    }, []);

    if (!content) return <div>Loading...</div>;

    return (
        <div>
            <SEO pageTitle='Grace Garden School - Home' />
            <HeaderOne />
            <BannerOne data={content.hero} />
            <About data={content.about} />
            <Services data={content.academics} />
            <Experience data={content.faculty} />
            <CtaArea data={content.admissions} />
            <Portfolio data={content.facilities} />
            <Testimonial data={content.achievements} />
            <GetInTouch data={content.extracurricular} />
            <Blog data={content.future} />
            <FooterOne />
            <ScrollToTop />
        </div>
    );
};

export default HomeOne;