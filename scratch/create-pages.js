const fs = require('fs');
const path = require('path');

const pages = [
  { name: 'academics', title: 'Academics' },
  { name: 'admissions', title: 'Admissions' },
  { name: 'fee-structure', title: 'Fee Structure' },
  { name: 'registrations', title: 'Registrations' },
  { name: 'books-lists', title: 'Books Lists' },
  { name: 'school-uniform', title: 'School Uniform' },
  { name: 'curriculum', title: 'Curriculum' },
  { name: 'activities', title: 'Activities' },
  { name: 'events', title: 'Events' },
  { name: 'careers', title: 'Careers' },
];

const template = (title) => `"use client"
import SEO from "@/components/data/seo";
import HeaderOne from "@/components/layout/headers/header-one";
import BreadCrumb from "@/components/pages/common/breadcrumb";
import FooterOne from "@/components/layout/footers/footer-one";
import ScrollToTop from "@/components/pages/common/scroll/scroll-to-top";

const Page = () => {
    return (
        <>
            <SEO pageTitle="${title}" />
            <HeaderOne />
            <BreadCrumb title="${title}" innerTitle="${title}" />
            
            <div className="section-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h2 className="mb-4">${title}</h2>
                            <p>Content for ${title} will be updated soon.</p>
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
`;

pages.forEach(page => {
    const dir = path.join(__dirname, '..', 'app', page.name);
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(path.join(dir, 'page.jsx'), template(page.title));
    console.log(`Created ${page.name}`);
});
