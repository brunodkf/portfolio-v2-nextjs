'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import React from 'react'

const menuSocials = [
  { name: 'instagram', path: '', icon: '' },
  { name: 'linkedin', path: '', icon: '' },
  { name: 'whatsapp', path: '', icon: '' },
  { name: 'github', path: '', icon: '' }
]


const SocialLateral = () => {
  return (
    <aside className="w-20 flex flex-col justify-center items-center absolute h-full right-0 text-white">
      <ul className="space-y-2 tec">
        {menuSocials.map((item, index) => (
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

export default SocialLateral