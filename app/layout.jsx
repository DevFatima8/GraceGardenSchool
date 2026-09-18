"use client"
import { useEffect } from 'react';
import "./globals.css";
import SwitchTab from '@/components/pages/common/dark-light';
import { usePathname } from 'next/navigation';

export default function RootLayout({ children }) {
    const pathname = usePathname();
    const isAdmin = pathname.startsWith('/ad/');
    useEffect(() => {
        require('bootstrap/dist/js/bootstrap.min.js');
    }, []);

    useEffect(() => {
        if (isAdmin) {
            document.body.classList.remove('dark-mode');
        }
    }, [isAdmin]);

    return (
        <html lang="en">
            <head>
                <link rel='icon' type='image/png' href='../favicon.ico' />
            </head>
            <body>
                {!isAdmin && <SwitchTab />}
                {children}
            </body>
        </html>
    );
}