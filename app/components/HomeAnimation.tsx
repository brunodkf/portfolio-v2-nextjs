"use client"

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeProviderClient';

const HomeAnimation = () => {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    const strokeColor = mounted && resolvedTheme === 'light' ? '#1e1e1e' : '#dfa47d';

    return (
        <motion.svg
            width="600"
            height="600"
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <motion.path
                d="M100 10 L190 55 L190 145 L100 190 L10 145 L10 55 Z"
                stroke={strokeColor}
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="150"
                animate={{ strokeDashoffset: [80, 0, 900] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
        </motion.svg>
    )
}

export default HomeAnimation
