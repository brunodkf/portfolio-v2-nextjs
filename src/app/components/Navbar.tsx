import React from 'react'
import Image from 'next/image'
import { IoEarthOutline } from "react-icons/io5";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { HiSun } from "react-icons/hi2";

import { MdMenu } from "react-icons/md";

export const Navbar = () => {
    return (
        <header className="navbar w-full z-50 absolute top-0 px-4 sm:px-0">
            <nav className='navbar__container container m-auto py-6 flex items-center justify-between' id="navbar">
                <Image src='/logo.webp' alt="Logo Image" className="max-w-16" width={100} height={50} />

                <div className="flex gap-3">
                    <button className='text-laranja flex items-center'>
                        <IoEarthOutline className='text-xl mr-1' />
                        <p>PT</p>
                        <MdOutlineKeyboardArrowDown />
                    </button>
                    <button className='hidden sm:block bg-laranja rounded-full w-12 px-1'>
                        <HiSun className='bg-preto text-laranja rounded-full text-xl'/>
                    </button>

                    <MdMenu className='sm:hidden text-laranja text-4xl' />
                </div>
            </nav>

        </header>
    )
}

