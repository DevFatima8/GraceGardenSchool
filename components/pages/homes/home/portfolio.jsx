import portfolioData from "@/components/data/portfolio-data";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay} from 'swiper/modules';
import Link from "next/link";

const portfolioItem = portfolioData.slice(0, 6);
const slideControl = {
    loop: true,
	speed: 2000,
	spaceBetween: 30,
	autoplay: {
		delay: 4500,
		reverseDirection: false,
		disableOnInteraction: false,
	},
    breakpoints: {
        0: {
            slidesPerView: 1
        },
        750: {
            slidesPerView: 2
        },
        1138: {
            slidesPerView: 3
        },
        1600: {
            slidesPerView: 4
        },
    }
};

const Portfolio = ({ data }) => {
    const portfolioItem = (data?.json_data && data.json_data.length > 0) ? data.json_data : portfolioData.slice(0, 6);
    return (
        <div className="portfolio__area dark__image section-padding pb-0 overflow-hidden">
            <div className="container-fluid p-0">
                <div className="row mb-60">
                    <div className="col-xl-12">
                        <div className="portfolio__area-title t-center">
                            <span className="subtitle-one">{data?.subtitle || "Facilities & Resources"}</span>
                            <h2>{data?.title || "Enriching Campus Environment"}</h2>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xl-12">
                        <Swiper modules={[EffectFade, Autoplay]} {...slideControl} className="h-100">
                            {portfolioItem?.map((dataItem, id) => {
                                const imgSrc = dataItem.image_url || (dataItem.image && dataItem.image.src);
                                return (
                                <SwiperSlide key={id} className="h-auto d-flex">
                                    <div className="portfolio__area-item h-100 w-100 d-flex flex-column justify-content-between">
                                        <img src={imgSrc} alt={dataItem.title} style={{ height: '350px', width: '100%', objectFit: 'cover' }} />
                                        <div className="portfolio__area-item-content">
                                            <div className="portfolio__area-item-content-title">
                                                <h4><Link href={dataItem.link || "/facilities"}>{dataItem.title}</Link></h4>
                                                <span className="text-eight">{dataItem.subtitle}</span>
                                            </div>
                                            <div className="portfolio__area-item-content-icon">
                                                <Link href={dataItem.link || "/facilities"}><img src="assets/img/icon/up-arrow.png" alt="icon" /></Link>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                                );
                            })}
                        </Swiper>                
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Portfolio;