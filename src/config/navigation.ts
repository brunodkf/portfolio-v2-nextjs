import type { IconType } from 'react-icons';
import { FaGithub, FaInstagram, FaLinkedinIn, FaWhatsapp } from 'react-icons/fa';

import { siteConfig } from './site';


export const navItems = [
  { key: 'home', href: '/' },
  { key: 'about', href: '/sobre' },
  { key: 'projects', href: '/projetos' },
  { key: 'resume', href: null },
  { key: 'experience', href: '/experiencia' },
  { key: 'feedback', href: '/depoimentos' },
  { key: 'contact', href: '/contato' },
] as const;

export type NavKey = (typeof navItems)[number]['key'];

export const pagePaths = navItems.flatMap((item) => (item.href ? [item.href] : []));

export const socialLinks: { name: string; href: string; icon: IconType }[] = [
  { name: 'Instagram', href: siteConfig.social.instagram, icon: FaInstagram },
  { name: 'LinkedIn', href: siteConfig.social.linkedin, icon: FaLinkedinIn },
  { name: 'WhatsApp', href: siteConfig.social.whatsapp, icon: FaWhatsapp },
  { name: 'GitHub', href: siteConfig.social.github, icon: FaGithub },
];

export function isActivePath(pathname: string, href: string) {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}
