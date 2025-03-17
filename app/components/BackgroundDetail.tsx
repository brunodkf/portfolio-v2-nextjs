"use client";

import Image from 'next/image'
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const BackgroundDetail = () => {

    const pathname = usePathname();

    const [on, setOn] = useState(false)

    useEffect(() => {
        pathname === '/pt' || pathname === '/en' ?
            setOn(false) : setOn(true)
    }, [pathname])


    if (on) {
        return (
            <div className='bg-transparent -z-10 w-1/2 h-1/2 hidden lg:flex absolute right-0 bottom-0 overflow-hidden'>
                <Image src='/poligons.svg' alt="Poligonos Background"
                    width={450} height={50}
                    className={`hidden lg:block absolute -z-10 bottom-[-190px] right-[-70px] opacity-50`} />
            </div>
        )
    }

}

export default BackgroundDetail