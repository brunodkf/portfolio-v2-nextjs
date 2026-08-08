'use client';

import { useEffect, useRef, useState } from 'react';
import { animate, useInView, useReducedMotion } from 'framer-motion';
import { EASE_OUT_EXPO } from '@/lib/motion';

interface CountUpProps {
    value: string;
    duration?: number;
    className?: string;
}

// Animates the leading numeric portion of a stat string (e.g. "200+", "1.1s",
// "1ª pág.") from 0 up to its real value once scrolled into view; any
// non-numeric prefix/suffix (units, arrows, symbols) is preserved as-is.
const CountUp: React.FC<CountUpProps> = ({ value, duration = 1.3, className }) => {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, margin: '0px 0px -80px 0px' });
    const reduceMotion = useReducedMotion();

    const match = value.match(/^(\d+(?:\.\d+)?)/);
    const target = match ? parseFloat(match[1]) : null;
    const decimals = match && match[1].includes('.') ? match[1].split('.')[1].length : 0;
    const suffix = match ? value.slice(match[0].length) : '';

    const [display, setDisplay] = useState(() =>
        target === null ? value : (decimals ? (0).toFixed(decimals) : '0')
    );

    useEffect(() => {
        if (target === null || reduceMotion || !isInView) return;
        const controls = animate(0, target, {
            duration,
            ease: EASE_OUT_EXPO,
            onUpdate: (v) => setDisplay(decimals ? v.toFixed(decimals) : Math.round(v).toString()),
        });
        return () => controls.stop();
    }, [isInView, target, duration, decimals, reduceMotion]);

    useEffect(() => {
        if (reduceMotion && target !== null) {
            setDisplay(decimals ? target.toFixed(decimals) : target.toString());
        }
    }, [reduceMotion, target, decimals]);

    if (target === null) {
        return <span className={className}>{value}</span>;
    }

    return (
        <span ref={ref} className={className}>
            {display}{suffix}
        </span>
    );
};

export default CountUp;
