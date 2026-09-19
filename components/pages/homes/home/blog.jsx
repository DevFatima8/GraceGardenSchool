import React from 'react';
import blogData from '@/components/data/blog-data';
import Link from 'next/link';

const Blog = ({ data }) => {
    const blogItem = (data?.json_data && data.json_data.length > 0) ? data.json_data : blogData.slice(0, 3);
    const blogContent = {
        subtitle: data?.subtitle || 'Future Plans & Vision',
        title: data?.title || 'Continuous Innovation & Growth',
        btn_text: 'School News & Events',
        btn_url: '/events'
    }
    return (
        <div className="blog__one dark__image section-padding">
            <div className="container">
                <div className="row align-items-end mb-45">
                    <div className="col-xl-7 col-lg-8 lg-mb-30">
                        <div className="blog__one-title lg-t-center">
                            <span className="subtitle-one">{blogContent.subtitle}</span>
                            <h2>{blogContent.title}</h2>
                        </div>
                    </div>
                    <div className="col-xl-5 col-lg-4 t-right lg-t-center">
                        <Link className="btn-two" href={blogContent.btn_url}>{blogContent.btn_text}<i className="far fa-chevron-double-right"></i></Link>
                    </div>
                </div>
                <div className="row">
                    {blogItem?.map((dataItem, id) => {
                        const imgSrc = dataItem.image_url || (dataItem.image && dataItem.image.src);
                        return (
                        <div className="col-xl-4 col-lg-6 mt-25" key={id}>
                            <div className="blog__one-item h-100 d-flex flex-column">
                                <div className="blog__one-item-image">
                                    <Link href={dataItem.link || "/events"}>
                                        <img src={imgSrc} alt={dataItem.title} style={{height: '250px', width: '100%', objectFit: 'cover'}} />
                                    </Link>
                                    <div className="blog__one-item-image-date">
                                        <span className="text-three">{dataItem.date || "Now"}</span>
                                        <span className="text-five">{dataItem.subtitle || "Vision"}</span>
                                    </div>
                                </div>
                                <div className="blog__one-item-content flex-grow-1 d-flex flex-column">
                                    <div className="blog__one-item-content-meta">
                                        <ul>
                                            <li><Link href="#"><i className="far fa-user"></i>By Admin</Link></li>
                                            <li><Link href={dataItem.link || "/events"}><i className="far fa-calendar"></i>Grace Garden</Link></li>
                                        </ul>
                                    </div>
                                    <h4><Link href={dataItem.link || "/events"}>{dataItem.title}</Link></h4>
                                    <p className="flex-grow-1">{dataItem.description || dataItem.des}</p>
                                </div>
                            </div>
                        </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Blog;