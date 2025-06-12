"use client"

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';

const HomeAnimation = () => {

    const [colorLine, setColorLine] = useState('#dfa47d');

    const { theme, setTheme } = useTheme();

    useEffect(() => {
        theme === 'light' ? setColorLine('#1e1e1e') : setColorLine('#dfa47d')
    }, [theme])


    return (
        <motion.svg
            width="600"
            height="600"
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            initial={{ strokeDashoffset: 300 }}
            animate={{ strokeDashoffset: 1 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        >
            <motion.path
                d="M100 10 L190 55 L190 145 L100 190 L10 145 L10 55 Z"
                stroke={colorLine}
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="150"
                strokeDashoffset="300"
                filter="drop-shadow(0px 0px 10px rgba(255, 255, 255, 0.1))"
                animate={{
                    strokeDashoffset: [80, 0, 900],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
        </motion.svg>
    )
}

export default HomeAnimation