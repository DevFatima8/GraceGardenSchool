"use client"
import HeaderOne from "@/components/layout/headers/header-one";
import BreadCrumb from "../../common/breadcrumb";
import ServicesSingleMain from "./services-single";
import SEO from "@/components/data/seo";
import ScrollToTop from "../../common/scroll/scroll-to-top";
import FooterOne from "@/components/layout/footers/footer-one";

const ServicesSingle = ({serviceDetails}) => {
    return (
        <>
            <SEO pageTitle={serviceDetails?.title} />
            <HeaderOne />
            <BreadCrumb title={serviceDetails?.title} innerTitle={serviceDetails?.title} />
            <ServicesSingleMain serviceDetails={serviceDetails}/>
            <div className='all-footer'>
                <FooterOne />
            </div>
            <ScrollToTop />
        </>
    );
};

export default ServicesSingle;