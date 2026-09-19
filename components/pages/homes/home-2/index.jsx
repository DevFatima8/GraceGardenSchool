"use client"
import SEO from "@/components/data/seo";
import HeaderTwo from "@/components/layout/headers/header-two";
import FooterOne from "@/components/layout/footers/footer-one";
import BannerTwo from "./banner";
import SwitchTab from "../../common/dark-light";
import Services from "./services";
import About from "./about";
import Video from "./video";
import Work from "./work";
import Consulting from "./consulting";
import Portfolio from "./portfolio";
import Team from "./team";
import Blog from "./blog";
import ScrollToTop from "../../common/scroll/scroll-to-top";

const HomeTwo = ({addClass}) => {
    return (
        <>
            <SEO pageTitle="Consulting Business" />
            <SwitchTab addClass={addClass} />
            <HeaderTwo />
            <BannerTwo />
            <Services />
            <About />
            <Video />
            <Work />
            <Consulting />
            <Portfolio />
            <Team />
            <Blog />
            <FooterOne />
            <ScrollToTop addClass={addClass} />
        </>
    );
};

export default HomeTwo;