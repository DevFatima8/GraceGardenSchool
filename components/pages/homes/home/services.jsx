import React from 'react';
import Link from 'next/link';
import servicesData from '@/components/data/services-data';

const Services = ({ data }) => {
    const servicesItem = (data?.json_data && data.json_data.length > 0) ? data.json_data : servicesData.slice(0, 4);
    const servicesContent = {
        subtitle: data?.subtitle || 'Academic Programs',
        title: data?.title || 'Academic Wings & Curriculum',
        btn_text: 'Explore Curriculum',
        btn_link: '/curriculum'
    }
    return (
        <div className="services__one section-padding pt-0">
            <div className="container">
                <div className="row align-items-end mb-45">
                    <div className="col-xl-7 col-lg-8 lg-mb-30">
                        <div className="services__one-title lg-t-center">
                            <span className="subtitle-one">{servicesContent.subtitle}</span>
                            <h2>{servicesContent.title}</h2>
                        </div>
                    </div>
                    <div className="col-xl-5 col-lg-4 t-right lg-t-center">
                        <Link className="btn-one" href={servicesContent.btn_link}>{servicesContent.btn_text}<i className="far fa-chevron-double-right"></i></Link>
                    </div>
                </div>
                <div className="row">
                    {servicesItem?.map((dataItem, id) => (
                        <div className="col-xl-3 col-lg-4 col-md-6 mt-25" key={id}>
                            <div className="services__one-item h-100 d-flex flex-column">
                                <div className="services__one-item-icon">
                                    {dataItem.image_url ? <img src={dataItem.image_url} alt={dataItem.title} style={{width: '50px', height: '50px', objectFit: 'contain'}} /> : dataItem.icon}
                                </div>
                                <h4><Link href={dataItem.link || "/academics"}>{dataItem.title}</Link></h4>
                                <p className="flex-grow-1">{dataItem.description}</p>
                                <Link className="simple-btn-2 mt-auto align-self-start" href={dataItem.link || "/academics"}>Learn More<i className="far fa-chevron-double-right"></i></Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Services;