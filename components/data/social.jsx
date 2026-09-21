import Link from 'next/link';
import React from 'react';

const Social = () => {
    return (
        <>
            <ul className="d-flex flex-nowrap justify-content-center m-0 p-0" style={{ gap: '10px' }}>
                <li><Link href="https://www.youtube.com/@Gracegarden-d8j" target="_blank"><i className="fab fa-youtube"></i></Link></li>
                <li><Link href="https://www.facebook.com/share/1DV3Zf2L84/" target="_blank"><i className="fab fa-facebook-f"></i></Link></li>
                <li><Link href="https://www.instagram.com/grace_garden_school?utm_source=qr&stkn=MTFrd2d0b2Q4czNtNg==" target="_blank"><i className="fab fa-instagram"></i></Link></li>
                <li><Link href="https://wa.me/923004066340" target="_blank"><i className="fab fa-whatsapp"></i></Link></li>
            </ul>            
        </>
    );
};

export default Social;