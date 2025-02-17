import React from 'react'
import { FaReact } from "react-icons/fa";
import { SiNextdotjs } from "react-icons/si";
import { RiTailwindCssFill } from "react-icons/ri";
import { IoLogoJavascript } from "react-icons/io5";
import { FaSass } from "react-icons/fa";
import { SiTypescript } from "react-icons/si";
import { FaHtml5 } from "react-icons/fa";
import { FaCss3Alt } from "react-icons/fa";
import { FaGitAlt } from "react-icons/fa6";
import { FiFigma } from "react-icons/fi";


const hardSkills = [
    {name: 'React', icon: <FaReact />},
    {name: 'Next', icon: <SiNextdotjs />},
    {name: 'Tailwind', icon: <RiTailwindCssFill /> },
    {name: 'Javascript', icon: <IoLogoJavascript />},
    {name: 'Sass', icon: <FaSass /> },
    {name: 'TypeScript', icon: <SiTypescript />},
    {name: 'HTML', icon:<FaHtml5 /> },
    {name: 'CSS', icon: <FaCss3Alt />},
    {name: 'GIT', icon: <FaGitAlt />},
    {name: 'Figma', icon: <FiFigma /> },
]

const ListaDeHabilidades = () => {
  return (
    <ul className='flex gap-4 text-branco'>
        {hardSkills?.map((item, index) => (
            <li key={index} className='text-2xl'>
                {item.icon}
            </li>
        ))}
    </ul>
  )
}

export default ListaDeHabilidades