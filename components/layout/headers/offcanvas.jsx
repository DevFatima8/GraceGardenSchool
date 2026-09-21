import Link from 'next/link';
import logo2 from "../../../public/assets/img/logo-2.jpg";
import Social from '@/components/data/social';

const SideBar = ({ isOpen, setIsOpen }) => {
    return (
        <>
            <div className={`header__area-menubar-right-sidebar-popup ${isOpen ? 'active' : ''}`}>
                <div className="sidebar-close-btn" onClick={() => setIsOpen(false)}><i className="fal fa-times"></i></div>
                <div className="header__area-menubar-right-sidebar-popup-logo">
                    <Link href='/'>
                        <img src={logo2.src} alt="Grace Garden School" style={{ maxHeight: '60px', width: 'auto' }} />
                    </Link>
                </div>
                <p>Grace Garden School is a forward-thinking educational institution dedicated to fostering a learning environment where students are encouraged to explore their full potential. Established in 2023 in Green Town, Lahore.</p>
                <div className="header__area-menubar-right-box-sidebar-popup-contact">
                    <h4 className="mb-30">Get In Touch</h4>
                    <div className="header__area-menubar-right-box-sidebar-popup-contact-item">
                        <div className="header__area-menubar-right-box-sidebar-popup-contact-item-icon">
                            <i className="fal fa-phone-alt icon-animation"></i>
                        </div>
                        <div className="header__area-menubar-right-box-sidebar-popup-contact-item-content">
                            <span>Call / WhatsApp</span>
                            <h6><a href="tel:+923004066340">+92 300 406 6340</a></h6>
                        </div>
                    </div>
                    <div className="header__area-menubar-right-box-sidebar-popup-contact-item">
                        <div className="header__area-menubar-right-box-sidebar-popup-contact-item-icon">
                            <i className="fal fa-envelope"></i>
                        </div>
                        <div className="header__area-menubar-right-box-sidebar-popup-contact-item-content">
                            <span>Email Address</span>
                            <h6><a href="mailto:admin@gracegardenschool.com">admin@gracegardenschool.com</a></h6>
                        </div>
                    </div>
                    <div className="header__area-menubar-right-box-sidebar-popup-contact-item">
                        <div className="header__area-menubar-right-box-sidebar-popup-contact-item-icon">
                            <i className="fal fa-map-marker-alt"></i>
                        </div>
                        <div className="header__area-menubar-right-box-sidebar-popup-contact-item-content">
                            <span>Campus Address</span>
                            <h6>Sector C-2, Block 5, Green Town, Lahore</h6>
                        </div>
                    </div>
                </div>
                <div className="header__area-menubar-right-box-sidebar-popup-social">
                    <Social />							
                </div>
            </div>
            <div className={`sidebar-overlay ${isOpen ? 'show' : ''}`}></div>
        </>
    );
};

export default SideBar;