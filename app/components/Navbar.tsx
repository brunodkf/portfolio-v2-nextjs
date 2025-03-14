'use client';

import React, { useEffect, useState } from 'react'
import { usePathname, useRouter } from '@/i18n/routing';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useTheme } from "next-themes";

import Image from 'next/image'

import { IoEarthOutline } from "react-icons/io5";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { HiSun } from "react-icons/hi2";
import { FaMoon } from "react-icons/fa6";
import { MdMenu } from "react-icons/md";


import Link from 'next/link';
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

    const { theme, setTheme } = useTheme();

    const toggleSwitch = () => {
        setIsOn(!isOn)
        setTheme(theme === "dark" ? "light" : "dark")
    }

    const container = {
        width: 55,
        height: 28,
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

    const menuItems = [
        { name: 'home', path: `/` },
        { name: 'about', path: '/sobre' },
        { name: 'projects', path: '/projetos' },
        { name: 'resume', path: '/docs/BrunoCurriculo.pdf' },
        { name: 'experience', path: '/experiencia' },
        { name: 'contact', path: '/contato' }
    ]

    const t = useTranslations('Navbar')

    const [isOpen, setIsOpen] = useState(false);

 
    return (
        <header className="navbar w-full z-50 absolute top-0 px-4 sm:px-0" >
            <nav className='navbar__container container m-auto py-6 flex items-center justify-between' id="navbar">

                <Link href={`/${locale}/`} className='z-50' onClick={() => setIsOpen(false)}>
                    <Image src='/logo.webp' alt="Logo Image" className="max-w-16 brightness-0 dark:filter-none" width={100} height={50} />
                </Link>

                <div className="flex items-center gap-3">
                    <button className=' dark:text-laranja flex items-center' onClick={() => ToggleLanguage(language)} aria-label="Toggle language">
                        <IoEarthOutline className='text-xl mr-1' />
                        <p className='uppercase'>{language}</p>
                        <MdOutlineKeyboardArrowDown />
                    </button>


                    <button className='toggle-container bg-cinza dark:bg-laranja'
                        style={{
                            ...container,
                            justifyContent: "flex-" + (isOn ? "end" : "start"),
                        }} onClick={toggleSwitch} aria-label="Toggle Theme">

                        <motion.div className="toggle-handle"
                            style={handle} layout
                            transition={{ type: "spring", visualDuration: 0.2, bounce: 0.2, }}>

                                {
                                    isOn ?  <FaMoon className='bg-laranja text-cinza rounded-full text-2xl p-1' /> : <HiSun className='bg-preto text-laranja rounded-full text-2xl ' />
                                }
                        
                            

                        </motion.div>
                    </button>

                    <MdMenu className='lg:hidden dark:text-laranja text-4xl cursor-pointer z-50' aria-label="Open Menu" onClick={() => setIsOpen(!isOpen)} />

                    <motion.div
                        className={`fixed top-0 right-0 w-full h-screen dark:text-branco bg-laranja dark:bg-dark-global
                        transform ${isOpen ? "-translate-x-0" : "translate-x-full"}
                        transition-transform duration-300 ease-in-out`}
                    >
                        <ul className="flex flex-col items-center justify-center h-full gap-8 text-lg font-medium">
                            {menuItems.map((item, index) => (
                                <motion.li
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1, duration: 0.4 }}
                                    className="relative group"
                                >
                                    <Link href={item.name === 'resume' ? item.path : `/${locale}` + item.path}  aria-label={`Ir para ${item.name}`} className='uppercase  text-lg ' onClick={() => setIsOpen(false)}>
                                        {t(item.name)}
                                        <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-laranja transition-all duration-300 group-hover:w-full"></span>
                                    </Link>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>


                </div>
            </nav>

        </header>
    )
}

