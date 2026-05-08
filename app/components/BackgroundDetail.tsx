"use client";

import Image from 'next/image'
import { usePathname } from 'next/navigation';
import { useParams } from 'next/navigation';
import React from 'react'

const BackgroundDetail = () => {

    const pathname = usePathname();
    const { locale } = useParams();

    const isHome = pathname.replace(/\/$/, '') === `/${locale}`;

    if (isHome) return null;

    return (
        <div className='bg-transparent -z-10 w-1/2 h-1/2 hidden lg:flex absolute right-0 bottom-0 overflow-hidden'>
            <Image
                src='/poligons.svg'
                alt=""
                role="presentation"
                width={450}
                height={50}
                className='hidden lg:block absolute -z-10 bottom-[-190px] right-[-70px] opacity-50'
            />
        </div>
    )
}

export default BackgroundDetail
