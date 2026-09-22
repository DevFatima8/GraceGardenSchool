"use client"
import React, { useRef } from 'react';

const Form = () => {
    const formRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(formRef.current);
        const name = formData.get('name') || 'N/A';
        const email = formData.get('email') || 'N/A';
        const subject = formData.get('subject') || 'N/A';
        const messageText = formData.get('message') || 'N/A';
        
        const message = `*New Contact Message*\n\n` +
            `*Name:* ${name}\n` +
            `*Email:* ${email}\n` +
            `*Subject:* ${subject}\n` +
            `*Message:* ${messageText}`;
            
        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/923004066340?text=${encodedMessage}`, '_blank');
        formRef.current.reset();
    };

    return (
        <>
            <form ref={formRef} onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-md-6 mb-30">
                        <div className="contact__two-right-form-item contact-item">
                            <span className="fal fa-user"></span>
                            <input type="text" name="name" placeholder="Full Name" required="required" />
                        </div>
                    </div>
                    <div className="col-md-6 md-mb-30">
                        <div className="contact__two-right-form-item contact-item">
                            <span className="far fa-envelope-open"></span>
                            <input type="email" name="email" placeholder="Email Address" required="required" />
                        </div>
                    </div>
                    <div className="col-md-12 mb-30">
                        <div className="contact__two-right-form-item contact-item">
                            <span className="fal fa-book"></span>
                            <input type="text" name="subject" placeholder="Subject" />
                        </div>
                    </div>
                    <div className="col-md-12 mb-30">
                        <div className="contact__two-right-form-item contact-item">
                            <span className="far fa-comments"></span>
                            <textarea name="message" placeholder="Message"></textarea>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="contact__two-right-form-item">
                            <button className="btn-one" type="submit">Submit Message <i className="far fa-chevron-double-right"></i></button>
                        </div>
                    </div>
                </div>
            </form>            
        </>
    );
};

export default Form;