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
        delay: 6000,
        reverseDirection: false,
        disableOnInteraction: false,
    }, 
    pagination: {
        el: ".banner_pagination",
        clickable: true,
    },
};

const BannerOne = ({ data }) => {
    return (
            <>
            <div className="banner__one">
                <Swiper modules={[EffectFade, Autoplay, Pagination]} {...slideControl} >
                    <SwiperSlide>
                    <div className="banner__one-image" style={{backgroundImage: `url(${data?.image_url || bannerBg1.src})`}}>
                        <div className="container">
                            <div className="row">
                                <div className="col-xl-12">
                                    <div className="banner__one-content"> 
                                        <span>{data?.subtitle || "Welcome to Grace Garden School"}</span>
                                        <h1>{data?.title || "Grace Garden School"}</h1>
                                        <p className="text-white mb-4" style={{ fontSize: '18px', maxWidth: '600px' }}>{data?.description}</p>
                                        <div className="banner__one-content-button">
                                            <div className="banner__one-content-button-item">
                                                <Link className="btn-one" href="/about">Read More<i className="far fa-chevron-double-right"></i></Link>
                                            </div>
                                            <div className="banner__one-content-video-icon">
                                                <a href="https://www.youtube.com/@Gracegarden-d8j" target="_blank" rel="noopener noreferrer">
                                                    <i className="fas fa-play"></i>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    </SwiperSlide>                    
                </Swiper>
                <div className="banner__one-pagination">
                    <div className="container">
                        <div className="area">
                            <div className="banner_pagination"></div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
};

export default BannerOne;