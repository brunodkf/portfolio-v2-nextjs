'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import React from 'react'

const menuItems = [
  { name: 'Início', path: '/' },
  { name: 'Sobre', path: '/sobre' },
  { name: 'Projetos', path: '/projetos' },
  { name: 'Resumo', path: '/resumo' },
  { name: 'Experiência', path: '/experiencia' },
  { name: 'Contato', path: '/contato' }
]

const MenuLateral = () => {
  return (
    <aside className="w-28 flex flex-col justify-center items-center fixed h-full  text-white z-50
     ">
      <ul className="space-y-2 tec">
        {menuItems.map((item, index) => (
          <motion.li
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            className="relative group"
          >
            <Link href={item.path} aria-label={`Ir para ${item.name}`} className='uppercase  text-sm '>
              {item.name}
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-laranja transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </motion.li>
        ))}
      </ul>
    </aside>
  )
}

export default MenuLateral
