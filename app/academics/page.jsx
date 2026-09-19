"use client"
import SEO from "@/components/data/seo";
import HeaderOne from "@/components/layout/headers/header-one";
import BreadCrumb from "@/components/pages/common/breadcrumb";
import FooterOne from "@/components/layout/footers/footer-one";
import ScrollToTop from "@/components/pages/common/scroll/scroll-to-top";

const Page = () => {
    return (
        <>
            <SEO pageTitle="Academics" />
            <HeaderOne />
            <BreadCrumb title="Academics" innerTitle="Academics" />
            
            <div className="section-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h2 className="mb-4">Academics</h2>
                            <p>Content for Academics will be updated soon.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className='all-footer'>
                <FooterOne />
            </div>
            <ScrollToTop />
        </>
    );
};

export default Page;
