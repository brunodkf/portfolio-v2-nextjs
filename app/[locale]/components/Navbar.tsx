'use client';

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { IoEarthOutline } from "react-icons/io5";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { HiSun } from "react-icons/hi2";

import { MdMenu } from "react-icons/md";


import { Link, usePathname, useRouter } from '@/i18n/routing';
import { useParams } from 'next/navigation';


import { motion } from 'framer-motion';

export const Navbar = () => {

    const pathname = usePathname();
    const router = useRouter();
    const params = useParams();
    const locale = params.locale as 'pt' | 'en';

    const [language, setLanguage] = useState<'pt' | 'en'>(locale);

    useEffect(() => {
        setLanguage(locale);
    }, [locale]);

    function ToggleLanguage(i: string) {
        const newLanguage = i === 'pt' ? 'en' : 'pt';;
        router.push(pathname, { locale: newLanguage })
    }

    const [isOn, setIsOn] = useState(false)

    const toggleSwitch = () => setIsOn(!isOn)

    const container = {
        width: 55,
        height: 28,
        backgroundColor: "#dfa47d",
        borderRadius: 50,
        cursor: "pointer",
        display: "flex",
        padding: 2,
        paddingRight: 6,
    }

    const handle = {
        width: 20,
        height: 20,
    }

    return (
        <header className="navbar w-full z-50 absolute top-0 px-4 sm:px-0" >
            <nav className='navbar__container container m-auto py-6 flex items-center justify-between' id="navbar">
                <Image src='/logo.webp' alt="Logo Image" className="max-w-16" width={100} height={50} />

                <div className="flex items-center gap-3">
                    <button className='text-laranja flex items-center' onClick={() => ToggleLanguage(language)} aria-label="Toggle language">
                        <IoEarthOutline className='text-xl mr-1' />
                        <p className='uppercase'>{language}</p>
                        <MdOutlineKeyboardArrowDown />
                    </button>

                    <button className='toggle-container'
                        style={{
                            ...container,
                            justifyContent: "flex-" + (isOn ? "end" : "start"),
                        }}  onClick={toggleSwitch} aria-label="Toggle Theme">

                        <motion.div className="toggle-handle"
                        style={handle} layout
                        transition={{ type: "spring", visualDuration: 0.2, bounce: 0.2, }}>

                            <HiSun className='bg-preto text-laranja rounded-full text-2xl ' />
                            
                        </motion.div>
                    </button>

                    <MdMenu className='sm:hidden text-laranja text-4xl' aria-label="Open Menu" />
                </div>
            </nav>

        </header>
    )
}

