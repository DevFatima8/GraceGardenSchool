"use client"
import SEO from "@/components/data/seo";
import HeaderOne from "@/components/layout/headers/header-one";
import BreadCrumb from "../../common/breadcrumb";
import TeamSingleMain from "./team-single";
import FooterOne from "@/components/layout/footers/footer-one";
import ScrollToTop from "../../common/scroll/scroll-to-top";

const TeamSingle = ({teamDetails}) => {
    return (
        <>
            <SEO pageTitle={teamDetails?.name} />
            <HeaderOne />
            <BreadCrumb title={teamDetails?.name} innerTitle={teamDetails?.name} />
            <TeamSingleMain teamDetails={teamDetails}/>
            <div className='all-footer'>
                <FooterOne />
            </div>
            <ScrollToTop />
        </>
    );
};

export default TeamSingle;