import React from 'react';
import Link from 'next/link';
import { socials } from '@/data/socials';
import HexLogo from './home/HexLogo';

const socialLinks = [
    { name: 'GitHub', href: socials.github },
    { name: 'LinkedIn', href: socials.linkedin },
    { name: 'Instagram', href: socials.instagram },
    { name: 'WhatsApp', href: socials.whatsapp },
];

const linkClass =
    'group relative py-1 hover:text-laranja focus-visible:text-laranja transition-colors duration-200';

const Footer = () => {
    return (
        <footer className="border-t border-black/[0.06] dark:border-white/[0.06]">

            {/* Desktop */}
            <div className="hidden lg:flex items-center justify-between px-14 py-8">
                <span className="font-title text-base tracking-[0.05em] uppercase text-preto/55 dark:text-branco/55">
                    Memento Mori | Memento Vivere
                </span>
                <div className="flex items-center gap-[22px] font-mono text-xs text-preto/55 dark:text-branco/55">
                    {socialLinks.map((item) => (
                        <Link key={item.name} href={item.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                            {item.name}
                            <span className="absolute left-0 -bottom-0.5 h-px w-0 bg-laranja transition-all duration-300 ease-out group-hover:w-full group-focus-visible:w-full" />
                        </Link>
                    ))}
                    <HexLogo width={20} height={23} showText={false} animated className="ml-1.5 opacity-70 hover:opacity-100 transition-opacity duration-300" />
                </div>
            </div>

            {/* Mobile */}
            <div className="lg:hidden px-[22px] py-6 text-center">
                <div className="flex justify-center gap-5 font-mono text-xs text-preto/55 dark:text-branco/55 mb-3.5">
                    {socialLinks.filter((item) => item.name !== 'Instagram').map((item) => (
                        <Link key={item.name} href={item.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                            {item.name}
                            <span className="absolute left-0 -bottom-0.5 h-px w-0 bg-laranja transition-all duration-300 ease-out group-hover:w-full group-focus-visible:w-full" />
                        </Link>
                    ))}
                </div>
                <span className="font-title text-[13px] tracking-[0.05em] uppercase text-preto/50 dark:text-branco/50">
                    Memento Mori | Memento Vivere
                </span>
            </div>
        </footer>
    );
};

export default Footer;
