import Link from 'next/link';
import breadCrumbBg from "../../../public/assets/img/pages/page-banner.jpg";

const BreadCrumb = ({ title, innerTitle, bgImage }) => {
    const backgroundUrl = bgImage || breadCrumbBg.src;
    return (
        <div
            className="position-relative d-flex align-items-center justify-content-center"
            style={{
                minHeight: '83vh',
                backgroundImage: `url(${backgroundUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                marginTop: '0px'
            }}
        >
            {/* Dark Gradient Overlay */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(to top, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.2) 100%)',
                zIndex: 1
            }}></div>

            <div className="container position-relative text-center text-white" style={{ zIndex: 2 }}>
                <h1 className="display-3 fw-bold mb-4 text-white" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>{title}</h1>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb justify-content-center mb-0 bg-transparent p-0">
                        <li className="breadcrumb-item">
                            <Link href="/" className="text-white text-decoration-none" style={{ opacity: 0.9, fontWeight: '500' }}>Home</Link>
                        </li>
                        <li className="breadcrumb-item active text-white fw-bold" aria-current="page" style={{ opacity: 1 }}>
                            {innerTitle}
                        </li>
                    </ol>
                </nav>
            </div>
        </div>
    );
};

export default BreadCrumb;