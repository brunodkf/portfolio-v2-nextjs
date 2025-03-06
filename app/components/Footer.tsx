"use client";

import React from 'react'
import ListaDeHabilidades from './ListaDeHabilidades'
import { Antonio } from 'next/font/google';
import { usePathname } from 'next/navigation';

const antonio = Antonio({
    subsets: ['latin']
});

const Footer = () => {

    const pathname = usePathname();

    return (
        <footer className=" w-screen h-[50px] absolute bottom-0">
            <div className="">
                
            </div>
            <div className="hidden container m-auto lg:flex items-center justify-between">
                <h1 className={`${antonio.className} text-branco `}>Memento Mori | Memento Vivere</h1>

                {
                    pathname === '/pt' || pathname === '/en' ?
                        <ListaDeHabilidades view='block' /> :
                        <ListaDeHabilidades view='hidden' />
                }
            </div>
        </footer>
    )
}

export default Footer