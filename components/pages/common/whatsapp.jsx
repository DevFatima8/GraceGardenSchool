import React from 'react';

const WhatsAppFloat = () => {
    return (
        <a 
            href="https://wa.me/923004066340" 
            className="whatsapp-float" 
            target="_blank" 
            rel="noopener noreferrer"
        >
            <i className="fab fa-whatsapp"></i>
            <style jsx>{`
                .whatsapp-float {
                    position: fixed;
                    width: 60px;
                    height: 60px;
                    bottom: 90px;
                    right: 40px;
                    background-color: #25d366;
                    color: #FFF;
                    border-radius: 50px;
                    text-align: center;
                    font-size: 30px;
                    box-shadow: 2px 2px 3px #999;
                    z-index: 100;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.3s ease;
                }
                .whatsapp-float:hover {
                    background-color: #1ebe5d;
                    color: #fff;
                    transform: scale(1.1);
                }
                @media screen and (max-width: 767px) {
                    .whatsapp-float {
                        width: 50px;
                        height: 50px;
                        bottom: 80px;
                        right: 20px;
                        font-size: 25px;
                    }
                }
            `}</style>
        </a>
    );
};

export default WhatsAppFloat;
