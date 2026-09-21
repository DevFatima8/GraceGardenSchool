"use client";
import Social from '@/components/data/social';
import Link from 'next/link';
import MainMenu from './header-menu';
import Search from './search';
import { useEffect, useState } from 'react';
import SideBar from './offcanvas';
import MobileMenuOne from './menu_sidebar/menu-one';
import logo1 from "../../../public/assets/img/logo-1.jpg";
import logo2 from "../../../public/assets/img/logo-2.jpg";

const HeaderOne = ({variant}) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [menuSidebar, setMenuSidebar] = useState(false);
    const [search, setSearch] = useState(false);
    const [isSticky, setIsSticky] = useState(false);
    useEffect(() => {
        window.addEventListener("scroll", () => {
        if (window.scrollY > 150) {
            setIsSticky(true);
        } else {
            setIsSticky(false);
        }
        });
    }, []);
    return (
        <>
            <div className="top__bar d-none d-lg-block">
                <div className="container custom__container">
                    <div className="row align-items-center">
                        <div className="col-xl-5 col-md-6">
                            <div className="top__bar-left">
                                <Link href="https://www.google.com/maps"><i className="far fa-map-marker-alt"></i>Sector C-2, Block 5, Green Town, Lahore</Link>
                            </div>
                        </div>
                        <div className="col-xl-7 col-md-6">
                            <div className="top__bar-right">
                                <Link href="tel:+923004066340" style={{ marginRight: '15px' }}><i className="fas fa-phone-alt"></i>+92 300 406 6340</Link>
                                <Link href="mailto:admin@gracegardenschool.com"><i className="fas fa-envelope"></i>admin@gracegardenschool.com</Link>
                                <div className="top__bar-right-social">
                                    <Social />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`header__area ${ variant ? variant : "" } header__sticky ${isSticky ? "header__sticky-sticky-menu" : ""}`}>
                <div className="container custom__container">
                    <div className="header__area-menubar">
                        <div className="header__area-menubar-left">
                            <div className="header__area-menubar-left-logo">
                                <Link href='/'>
                                    <img className='dark-n' src={logo1.src} alt='Grace Garden School' style={{ maxHeight: '60px', width: 'auto' }} />
                                    <img className="light-n" src={logo2.src} alt="Grace Garden School" style={{ maxHeight: '60px', width: 'auto' }} />
                                </Link>
                            </div>
                        </div>
                        <div className="header__area-menubar-center">
                            <div className="header__area-menubar-center-menu menu-responsive">
                                <MainMenu />                               
                            </div>
                        </div>
                        <div className="header__area-menubar-right">
                            <div className="header__area-menubar-right-box">
                                <div className="header__area-menubar-right-box-search">
                                    <div className="search">	
                                        <span className="header__area-menubar-right-box-search-icon open" onClick={() => setSearch(true)}>
                                            <i className="fal fa-search"></i>
                                        </span>
                                    </div>
                                    <Search isOpen={search} setIsOpen={setSearch} />
                                </div>
                                <div className="header__area-menubar-right-sidebar">
                                    <div className="header__area-menubar-right-sidebar-popup-icon" onClick={() => setSidebarOpen(true)}>
                                        <i className="flaticon-menu"></i>                          
                                    </div>
                                </div>
                                <div className="header__area-menubar-right-box-btn">
                                    <Link className="btn-one" href="/admissions">Admissions<i className="far fa-chevron-double-right"></i></Link>
                                </div>
                                <div className="header__area-menubar-right-responsive-menu menu__bar">
                                    <i className="flaticon-menu" onClick={() => setMenuSidebar(true)}></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <SideBar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
            <MobileMenuOne isOpen={menuSidebar} setIsOpen={setMenuSidebar} />
        </>
    );
};

export default HeaderOne;