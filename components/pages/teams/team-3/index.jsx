"use client"
import SEO from "@/components/data/seo";
import HeaderOne from "@/components/layout/headers/header-one";
import BreadCrumb from "../../common/breadcrumb";
import TeamMain from "./team";
import FooterOne from "@/components/layout/footers/footer-one";
import ScrollToTop from "../../common/scroll/scroll-to-top";

const TeamPageThree = () => {
    return (
        <>
            <SEO pageTitle='Team Three' />
            <HeaderOne />
            <BreadCrumb title='Team Three' innerTitle='Team Three'/>
            <TeamMain />
            <div className='all-footer'>
                <FooterOne />
            </div>
            <ScrollToTop />
        </>
    );
};

export default TeamPageThree;