import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay, Pagination} from 'swiper/modules';
import bannerBg1 from "../../../../public/assets/img/banner/banner-1.jpg";
import bannerBg2 from "../../../../public/assets/img/banner/banner-2.jpg";
import Link from "next/link";

const slideControl = {
    loop: true,
    slidesPerView: 1,
    effect: "fade",
    autoplay: {
        delay: 4000,
        reverseDirection: false,
        disableOnInteraction: false,
    }, 
    pagination: {
        el: ".banner_pagination",
        clickable: true,
    },
};

const BannerOne = ({ data }) => {
    // If no json_data array exists, fallback to a single slide based on the main data
    const slides = data?.json_data && data.json_data.length > 0 
        ? data.json_data 
        : [{
            title: data?.title || "Grace Garden School",
            subtitle: data?.subtitle || "Welcome to Grace Garden School",
            description: data?.description || "",
            image_url: data?.image_url || bannerBg1.src
        }];

    return (
        <div className="custom-hero-slider position-relative">
            <Swiper modules={[EffectFade, Autoplay, Pagination]} {...slideControl} className="h-100">
                {slides.map((slide, index) => (
                    <SwiperSlide key={index}>
                        <div 
                            className="d-flex align-items-center position-relative" 
                            style={{
                                minHeight: '85vh',
                                backgroundImage: `url(${slide.image_url || bannerBg1.src})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat'
                            }}
                        >
                            {/* Dark Overlay for better text readability */}
                            <div style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                                zIndex: 1
                            }}></div>

                            <div className="container position-relative" style={{ zIndex: 2 }}>
                                <div className="row justify-content-center">
                                    <div className="col-xl-9 text-center">
                                        <div className="custom-hero-content text-white"> 
                                            {slide.subtitle && (
                                                <span className="d-block mb-3 fw-bold text-uppercase" style={{ color: 'var(--primary-color-1)', letterSpacing: '2px', fontSize: '16px' }}>
                                                    {slide.subtitle}
                                                </span>
                                            )}
                                            {slide.title && (
                                                <h1 className="display-3 fw-bold mb-4 text-white">
                                                    {slide.title}
                                                </h1>
                                            )}
                                            {slide.description && (
                                                <p className="lead mx-auto mb-5 text-light" style={{ maxWidth: '750px', fontSize: '18px' }}>
                                                    {slide.description}
                                                </p>
                                            )}
                                            <div className="d-flex justify-content-center align-items-center gap-4 mt-4">
                                                <Link className="btn btn-primary btn-lg rounded-pill px-5 py-3 fw-bold shadow" style={{ backgroundColor: 'var(--primary-color-1)', border: 'none' }} href={slide.link || "/about"}>
                                                    Read More <i className="far fa-chevron-double-right ms-2"></i>
                                                </Link>
                                                <a href="https://www.youtube.com/@Gracegarden-d8j" target="_blank" rel="noopener noreferrer" className="d-inline-flex align-items-center justify-content-center bg-white text-dark rounded-circle shadow-lg" style={{ width: '60px', height: '60px', transition: 'all 0.3s ease' }}>
                                                    <i className="fas fa-play" style={{ marginLeft: '4px', color: 'var(--primary-color-1)' }}></i>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            
            <div className="container position-absolute bottom-0 start-50 translate-middle-x pb-4" style={{ zIndex: 10 }}>
                <div className="banner_pagination d-flex justify-content-center"></div>
            </div>
        </div>
    );
};

export default BannerOne;