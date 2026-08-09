import React from 'react'
import { FaReact } from "react-icons/fa";
import { SiNextdotjs, SiSvelte } from "react-icons/si";
import { RiTailwindCssFill } from "react-icons/ri";
import { IoLogoJavascript } from "react-icons/io5";
import { FaSass } from "react-icons/fa";
import { SiTypescript } from "react-icons/si";
import { FaHtml5 } from "react-icons/fa";
import { FaCss3Alt } from "react-icons/fa";
import { FaGitAlt } from "react-icons/fa6";
import { FiFigma } from "react-icons/fi";


const hardSkills = [
  { name: 'React',      icon: <FaReact /> },
  { name: 'Next.js',    icon: <SiNextdotjs /> },
  { name: 'Svelte',     icon: <SiSvelte /> },
  { name: 'Tailwind',   icon: <RiTailwindCssFill /> },
  { name: 'TypeScript', icon: <SiTypescript /> },
  { name: 'JavaScript', icon: <IoLogoJavascript /> },
  { name: 'Sass',       icon: <FaSass /> },
  { name: 'HTML5',      icon: <FaHtml5 /> },
  { name: 'CSS3',       icon: <FaCss3Alt /> },
  { name: 'Git',        icon: <FaGitAlt /> },
  { name: 'Figma',      icon: <FiFigma /> },
]

interface ListaDeHabilidadesProps {
  view: string
}

const ListaDeHabilidades: React.FC<ListaDeHabilidadesProps> = ({ view }) => {
  return (
    <ul className={`flex gap-4 text-cinza dark:text-branco ${view}`}>
      {hardSkills?.map((item, index) => (
        <li key={index} className='text-2xl group relative cursor-default' title={item.name}>
          {item.icon}
          <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-cinza px-2 py-1 text-xs text-branco opacity-0 transition-opacity group-hover:opacity-100">
            {item.name}
          </span>
        </li>
      ))}
    </ul>
  )
}

export default ListaDeHabilidades
