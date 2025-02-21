'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import React from 'react'

import { FaInstagramSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaWhatsappSquare } from "react-icons/fa";
import { FaGithubSquare } from "react-icons/fa";


const menuSocials = [
  { name: 'instagram', path: 'https://www.instagram.com/brunodkf', icon: <FaInstagramSquare /> },
  { name: 'linkedin', path: 'https://www.linkedin.com/in/brunodkf/', icon: <FaLinkedin /> },
  { name: 'whatsapp', path: 'https://api.whatsapp.com/send?phone=5521971564659&text=', icon: <FaWhatsappSquare /> },
  { name: 'github', path: 'https://github.com/brunodkf', icon: <FaGithubSquare /> }
]


const SocialLateral = () => {
  return (
    <aside className="hidden w-10 lg:flex flex-col justify-center items-center absolute h-full right-0 text-white">
      <ul className="space-y-2 line before:right-2.5 after:right-2.5">
        {menuSocials.map((item, index) => (
          <motion.li
            key={index}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            className="relative group hover:bg-laranja hover:text-preto rounded"
          >
            <Link href={item.path} aria-label={`Ir para ${item.name}`} className='uppercase text-2xl'>
              {item.icon}
            </Link>
          </motion.li>
        ))}
      </ul>
    </aside>
  )
}

export default SocialLateral