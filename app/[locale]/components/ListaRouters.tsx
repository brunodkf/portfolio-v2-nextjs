import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import React from 'react'
import Link from 'next/link';

const menuItems = [
    { name: 'home', path: `/` },
    { name: 'about', path: '/sobre' },
    { name: 'projects', path: '/projetos' },
    { name: 'resume', path: '/docs/BrunoCurriculo.pdf' },
    { name: 'experience', path: '/experiencia' },
    { name: 'contact', path: '/contato' }
  ]
  

const ListaRouters = () => {

    const t = useTranslations('Navbar')

    const { locale } = useParams();

    return (
        <ul className="space-y-2 line">
        {menuItems.map((item, index) => (
          <motion.li
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            className="relative group"
          >
            <Link href={`/${locale}` + item.path} aria-label={`Ir para ${item.name}`} className='uppercase  text-sm '>
              {t(item.name)}
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-laranja transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </motion.li>
        ))}
      </ul>
    )
}

export default ListaRouters