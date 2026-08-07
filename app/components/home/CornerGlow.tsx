'use client';

import { motion, useReducedMotion } from 'framer-motion';

/**
 * Small-scale echo of the hero's diagonal beam + flare — the corner accent
 * repeated on the testimonial card and contact panel in the reference.
 */
const CornerGlow = ({ className }: { className?: string }) => {
    const reduceMotion = useReducedMotion();

    return (
        <div className={className} aria-hidden="true">
            <svg width="220" height="170" viewBox="0 0 220 170" fill="none">
                <defs>
                    <linearGradient id="cornerBeam" x1="10" y1="150" x2="150" y2="18" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#df8e3a" stopOpacity="0" />
                        <stop offset="60%" stopColor="#dfa47d" stopOpacity="0.45" />
                        <stop offset="100%" stopColor="#fff3e6" stopOpacity="0.85" />
                    </linearGradient>
                </defs>
                <line x1="10" y1="150" x2="150" y2="18" stroke="url(#cornerBeam)" strokeWidth="1" strokeLinecap="round" />
                <line x1="150" y1="18" x2="210" y2="70" stroke="url(#cornerBeam)" strokeWidth="1" strokeLinecap="round" opacity={0.6} />
                <motion.circle
                    cx="150"
                    cy="18"
                    r="3"
                    fill="#fff3e6"
                    animate={reduceMotion ? undefined : { opacity: [0.6, 0.95, 0.6] }}
                    transition={reduceMotion ? undefined : { duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
                />
            </svg>
            <motion.div
                className="absolute rounded-full"
                style={{
                    width: 110,
                    height: 110,
                    left: 150 - 55,
                    top: 18 - 55,
                    background: 'radial-gradient(circle, rgba(255,243,230,0.3) 0%, rgba(223,142,58,0.12) 45%, transparent 75%)',
                    filter: 'blur(12px)',
                }}
                animate={reduceMotion ? undefined : { opacity: [0.55, 0.9, 0.55] }}
                transition={reduceMotion ? undefined : { duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
            />
        </div>
    );
};

export default CornerGlow;
