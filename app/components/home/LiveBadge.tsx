'use client';

import { motion, useReducedMotion } from 'framer-motion';

interface LiveBadgeProps {
    label: string;
    size?: 'desktop' | 'mobile';
}

// A soft pulsing "available now" indicator — communicates live status,
// not just decoration. Reused anywhere the site signals availability.
const LiveBadge: React.FC<LiveBadgeProps> = ({ label, size = 'desktop' }) => {
    const reduceMotion = useReducedMotion();
    const dotSize = size === 'desktop' ? 'w-2 h-2' : 'w-[7px] h-[7px]';
    return (
        <span className={`relative inline-flex items-center justify-center ${dotSize}`}>
            {!reduceMotion && (
                <motion.span
                    className="absolute inline-flex h-full w-full rounded-full bg-verde"
                    animate={{ scale: [1, 2.4, 1], opacity: [0.55, 0, 0.55] }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                />
            )}
            <span className={`relative rounded-full bg-verde ${dotSize}`} style={{ boxShadow: '0 0 8px #7ec98f' }} />
            <span className="sr-only">{label}</span>
        </span>
    );
};

export default LiveBadge;
