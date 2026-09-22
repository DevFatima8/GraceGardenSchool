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
import Preloader from "@/components/pages/common/preloader";

const defaultContent = {
    hero: {
        json_data: [
            {
                title: "Grace Garden School",
                subtitle: "Cultivating Minds, Nurturing Hearts, Building Future Leaders",
                description: "A forward-thinking educational institution in Green Town, Lahore, dedicated to academic excellence, character development, and extracurricular enrichment.",
                image_url: "/uploads/hero-1.jpg"
            },
            {
                title: "Inspiring Academic Excellence",
                subtitle: "Discover Your Child's True Potential",
                description: "Our modern curriculum, state-of-the-art facilities, and dedicated faculty provide an unmatched learning environment.",
                image_url: "/uploads/hero-2.jpg"
            },
            {
                title: "A Vibrant School Community",
                subtitle: "Fostering Friendships & Social Skills",
                description: "From engaging extracurricular activities to interactive learning sessions, students thrive in our supportive community.",
                image_url: "/uploads/hero-3.jpg"
            }
        ]
    },
    about: {
        subtitle: "School Profile",
        title: "Grace Garden School",
        description: "Established in 2023, Grace Garden School has quickly become a hub for academic excellence, character development, and extracurricular enrichment. With a holistic approach to education, we are committed to shaping the next generation of leaders, innovators, and responsible global citizens.",
        image_url: "/assets/img/about/about-1.jpg"
    },
    academics: {
        subtitle: "Academic Programs",
        title: "Foundations for Lifelong Achievement",
        description: "High-quality academic programs designed to foster literacy, numeracy, critical inquiry, and creative exploration from Pre-School to 6th Class."
    },
    faculty: {
        subtitle: "Faculty and Staff",
        title: "Dedicated to Academic Excellence & Mentorship",
        description: "Our educators hold advanced trainings and are committed to student-centered teaching, continuous professional development, and supportive administration.",
        image_url: "/assets/img/pages/experience-1.jpg"
    },
    admissions: {
        subtitle: "Admissions Open - Join Grace Garden",
        title: "Nurturing Your Child's Bright Future",
        description: "Tour our school, meet our faculty, and apply for admission today. Scholarships and financial aid options available."
    },
    facilities: {
        subtitle: "Facilities & Resources",
        title: "State-of-the-Art Learning Environment",
        description: "Equipped with modern classrooms, interactive digital learning tools, science laboratories, well-stocked library, and expansive sports grounds."
    },
    achievements: {
        subtitle: "Achievements & Accolades",
        title: "Recognized for Academic & Community Excellence",
        description: "Top standardized scores, athletic championships, and community service recognition."
    },
    extracurricular: {
        subtitle: "Extracurricular Activities",
        title: "Enriching Student Life Beyond the Classroom",
        description: "Sports festivals, Debate Club, Drama Society, Robotics Club, and meaningful community service projects."
    },
    future: {
        subtitle: "Future Plans & Vision",
        title: "Continuous Innovation & Growth",
        description: "Planning our new campus expansion, science and innovation hub, 1:1 technology integration, and global student exchange programs."
    }
};

const HomeOne = () => {
    const [content, setContent] = useState(defaultContent);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch('/api/home-content')
            .then(res => res.json())
            .then(data => {
                if (data.success && data.data && data.data.length > 0) {
                    const contentMap = { ...defaultContent };
                    data.data.forEach(item => {
                        if (item.section_id) {
                            const current = contentMap[item.section_id] || {};
                            let parsedJson = null;
                            if (item.json_data) {
                                try {
                                    parsedJson = typeof item.json_data === 'string' ? JSON.parse(item.json_data) : item.json_data;
                                } catch (e) {
                                    parsedJson = null;
                                }
                            }
                            contentMap[item.section_id] = {
                                ...current,
                                title: current.title, // Hardcoded, not editable by admin
                                subtitle: current.subtitle, // Hardcoded, not editable by admin
                                description: item.description || current.description,
                                image_url: item.image_url || current.image_url,
                                json_data: parsedJson && parsedJson.length > 0 ? parsedJson : current.json_data
                            };
                        }
                    });
                    setContent(contentMap);
                }
                setIsLoading(false);
            })
            .catch(() => {
                setIsLoading(false);
            });
    }, []);

    return (
        <div>
            <SEO pageTitle='Grace Garden School - Green Town, Lahore' />
            {isLoading && <Preloader />}
            <HeaderOne />
            {!isLoading && (
                <>
                    <BannerOne data={content.hero} />
                    <About data={content.about} />
                    <Services data={content.academics} />
                    <Experience data={content.faculty} />
                    <CtaArea data={content.admissions} />
                    <Portfolio data={content.facilities} />
                    <Testimonial data={content.achievements} />
                    <GetInTouch data={content.extracurricular} />
                    <Blog data={content.future} />
                </>
            )}
            <FooterOne />
            <ScrollToTop />
        </div>
    );
};

export default HomeOne;