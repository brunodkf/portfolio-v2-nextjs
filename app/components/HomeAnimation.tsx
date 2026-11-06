"use client"

import { motion, useReducedMotion } from 'framer-motion';

const HEXAGON = "M100 10 L190 55 L190 145 L100 190 L10 145 L10 55 Z";

const HomeAnimation = () => {
    const reduceMotion = useReducedMotion();

    return (
        <svg
            aria-hidden="true"
            width="600"
            height="600"
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="max-w-none shrink-0"
        >
            <motion.path
                d={HEXAGON}
                className="stroke-preto dark:stroke-laranja"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="150"
                // Static outline segment when the user prefers reduced motion.
                animate={reduceMotion ? { strokeDashoffset: 0 } : { strokeDashoffset: [80, 0, 900] }}
                transition={reduceMotion ? { duration: 0 } : { duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
        </svg>
    )
}

export default HomeAnimation
