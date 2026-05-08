"use client";

import React from 'react'
import ListaDeHabilidades from './ListaDeHabilidades'
import { Antonio } from 'next/font/google';
import { usePathname } from 'next/navigation';
import { useParams } from 'next/navigation';

const antonio = Antonio({
    subsets: ['latin']
});

const Footer = () => {

    const pathname = usePathname();
    const { locale } = useParams();

    const isHome = pathname.replace(/\/$/, '') === `/${locale}`;

    return (
        <footer className="w-screen h-[50px] absolute bottom-0">
            <div className="hidden container m-auto lg:flex items-center justify-between">
                <h1 className={`${antonio.className} text-cinza dark:text-branco`}>Memento Mori | Memento Vivere</h1>

                <ListaDeHabilidades view={isHome ? 'block' : 'hidden'} />
            </div>
        </footer>
    )
}

export default Footer
