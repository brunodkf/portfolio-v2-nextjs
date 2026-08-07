'use client';

import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useScroll, useTransform, useReducedMotion } from 'framer-motion';

/**
 * The hero's right side as a monumental architectural blueprint — a mass
 * that rivals the editorial block on the left, not a small icon beside it.
 * The composition spans the full right half (top-right corner, center,
 * bottom-right corner) as one continuous structure, with three depth levels
 * (far/mid/near) at different scales. It deliberately bleeds past the
 * viewBox — and past the viewport edge, clipped by the section — so parts
 * of hexagons, lines and planes are cropped. That cropping is the point:
 * it reads as a fragment of something larger than the frame.
 *
 * The base hexagon vertex geometry (200x220 local box, flat left/right edges,
 * pointed top/bottom) matches the mark used in HexLogo/Navbar/Footer, so every
 * hex fragment here reads as the same identity, just at a different depth.
 */

const HEX_FULL = 'M100 12 L176 56 V144 L100 188 L24 144 V56 Z';
// only the two edges meeting at the top vertex — a hexagon "suggested", not drawn
const HEX_ROOF = 'M24 56 L100 12 L176 56';

const HeroScene = ({ className }: { className?: string }) => {
    const reduceMotion = useReducedMotion();
    const wrapRef = useRef<HTMLDivElement>(null);

    const rawX = useMotionValue(0);
    const rawY = useMotionValue(0);
    const tiltX = useSpring(rawY, { stiffness: 30, damping: 18, mass: 0.7 });
    const tiltY = useSpring(rawX, { stiffness: 30, damping: 18, mass: 0.7 });

    const drift = useSpring(rawX, { stiffness: 35, damping: 20, mass: 0.7 });
    const driftV = useSpring(rawY, { stiffness: 35, damping: 20, mass: 0.7 });
    const nearX = useTransform(drift, (v) => v * 1.1);
    const nearY = useTransform(driftV, (v) => v * 1.1);
    const midX = useTransform(drift, (v) => v * 0.5);
    const midY = useTransform(driftV, (v) => v * 0.5);
    const farX = useTransform(drift, (v) => v * 0.18);
    const farY = useTransform(driftV, (v) => v * 0.18);

    const { scrollYProgress } = useScroll({ target: wrapRef, offset: ['start start', 'end start'] });
    const scrollY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : -30]);

    const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
        if (reduceMotion) return;
        const rect = wrapRef.current?.getBoundingClientRect();
        if (!rect) return;
        const relX = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
        const relY = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
        rawX.set(Math.max(-1, Math.min(1, relX)) * 6);
        rawY.set(Math.max(-1, Math.min(1, relY)) * 6);
    };

    const handlePointerLeave = () => {
        rawX.set(0);
        rawY.set(0);
    };

    return (
        <div
            ref={wrapRef}
            className={className}
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
            style={{ perspective: 1100 }}
        >
            <motion.div
                className="w-full h-full"
                style={{
                    y: scrollY,
                    rotateX: reduceMotion ? 0 : tiltX,
                    rotateY: reduceMotion ? 0 : tiltY,
                    transformStyle: 'preserve-3d',
                }}
            >
                <svg
                    width="100%"
                    height="100%"
                    viewBox="0 0 1150 950"
                    fill="none"
                    preserveAspectRatio="xMaxYMid slice"
                    style={{ overflow: 'visible' }}
                >
                    <defs>
                        <linearGradient id="lineFade" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="#df8e3a" stopOpacity="0" />
                            <stop offset="50%" stopColor="#dfa47d" stopOpacity="0.5" />
                            <stop offset="100%" stopColor="#df8e3a" stopOpacity="0" />
                        </linearGradient>
                        <linearGradient id="hexFadeV" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#dfa47d" stopOpacity="0.5" />
                            <stop offset="70%" stopColor="#dfa47d" stopOpacity="0.15" />
                            <stop offset="100%" stopColor="#dfa47d" stopOpacity="0" />
                        </linearGradient>
                        <pattern id="isoA" width="56" height="56" patternUnits="userSpaceOnUse" patternTransform="rotate(28)">
                            <line x1="0" y1="0" x2="0" y2="56" stroke="rgba(223,142,58,0.5)" strokeWidth="0.5" />
                        </pattern>
                        <pattern id="isoB" width="56" height="56" patternUnits="userSpaceOnUse" patternTransform="rotate(-28)">
                            <line x1="0" y1="0" x2="0" y2="56" stroke="rgba(223,142,58,0.5)" strokeWidth="0.5" />
                        </pattern>
                        <clipPath id="floorClip">
                            <path d="M400 420 L1150 280 L1150 950 L480 950 Z" />
                        </clipPath>
                    </defs>

                    {/* far layer — isometric floor plane, the two farthest "bone" lines, and the biggest/faintest hexes bleeding off the top-right and bottom-right corners */}
                    <motion.g style={{ x: reduceMotion ? 0 : farX, y: reduceMotion ? 0 : farY }}>
                        <g clipPath="url(#floorClip)" opacity={0.45}>
                            <rect x="0" y="0" width="1150" height="950" fill="url(#isoA)" />
                            <rect x="0" y="0" width="1150" height="950" fill="url(#isoB)" />
                        </g>

                        <path d="M-187 996 L1337 -156" stroke="rgba(223,142,58,0.12)" strokeWidth="1" strokeLinecap="round" />
                        <path d="M143 -60 L788 420" stroke="rgba(223,142,58,0.09)" strokeWidth="1" strokeLinecap="round" />
                        <path d="M180 1000 L1380 760" stroke="rgba(223,142,58,0.07)" strokeWidth="1" strokeLinecap="round" />

                        {/* bleeds off the top-right corner */}
                        <path
                            d={HEX_FULL}
                            transform="translate(872 -219) scale(2.08) rotate(6 100 100)"
                            stroke="rgba(223,142,58,0.1)"
                            strokeWidth="1"
                            strokeLinejoin="round"
                            style={{ filter: 'blur(0.5px)' }}
                        />

                        {/* bleeds off the bottom-right corner */}
                        <path
                            d={HEX_FULL}
                            transform="translate(931 694) scale(1.69) rotate(-5 100 100)"
                            stroke="rgba(223,142,58,0.09)"
                            strokeWidth="1"
                            strokeLinejoin="round"
                            style={{ filter: 'blur(0.5px)' }}
                        />

                        {/* faint satellite drifting toward the editorial column, tying the two halves together */}
                        <path
                            d={HEX_FULL}
                            transform="translate(-119 348) scale(1.34) rotate(-6 100 100)"
                            stroke="rgba(223,142,58,0.07)"
                            strokeWidth="1"
                            strokeLinejoin="round"
                        />
                    </motion.g>

                    {/* mid layer — the intermediate structure: a large center hex behind the near one, top-right and bottom-right supports, connecting facets, tick marks */}
                    <motion.g style={{ x: reduceMotion ? 0 : midX, y: reduceMotion ? 0 : midY }}>
                        <path
                            d={HEX_FULL}
                            transform="translate(420 247) scale(2.3) rotate(-4 100 100)"
                            stroke="url(#hexFadeV)"
                            strokeWidth="1.15"
                            strokeLinejoin="round"
                        />

                        <path
                            d={HEX_FULL}
                            transform="translate(800 7) scale(1.3) rotate(10 100 100)"
                            stroke="rgba(223,142,58,0.28)"
                            strokeWidth="1.15"
                            strokeLinejoin="round"
                        />

                        <path
                            d={HEX_ROOF}
                            transform="translate(780 605) scale(1.5)"
                            stroke="rgba(223,142,58,0.3)"
                            strokeWidth="1.15"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />

                        <path d="M648 183 L1103 508" stroke="rgba(223,142,58,0.2)" strokeWidth="1.15" strokeLinecap="round" />
                        <path d="M644 545 L787 675" stroke="rgba(223,142,58,0.16)" strokeWidth="1.15" strokeLinecap="round" />
                        <path d="M879 741 L1061 650" stroke="rgba(223,142,58,0.14)" strokeWidth="1.15" strokeLinecap="round" />

                        {/* blueprint reference ticks, spread across all three zones */}
                        {[
                            [930, 150],
                            [640, 540],
                            [930, 800],
                            [850, 380],
                        ].map(([x, y]) => (
                            <g key={`${x}-${y}`} stroke="rgba(223,142,58,0.3)" strokeWidth="1">
                                <line x1={x - 6} y1={y} x2={x + 6} y2={y} />
                                <line x1={x} y1={y - 6} x2={x} y2={y + 6} />
                            </g>
                        ))}
                    </motion.g>

                    {/* near layer — the most legible hex (center, the composition's anchor) + crisp corner hexes + the main structural line + quiet intersection glints */}
                    <motion.g style={{ x: reduceMotion ? 0 : nearX, y: reduceMotion ? 0 : nearY }}>
                        <path
                            d="M-187 996 L1337 -156"
                            stroke="url(#lineFade)"
                            strokeWidth="1.4"
                            strokeLinecap="round"
                        />

                        <path
                            d={HEX_FULL}
                            transform="translate(440 320) scale(2) rotate(-2 100 100)"
                            stroke="rgba(223,142,58,0.55)"
                            strokeWidth="1.4"
                            strokeLinejoin="round"
                            className="hex-draw"
                        />

                        <path
                            d={HEX_ROOF}
                            transform="translate(983 24) scale(0.77)"
                            stroke="rgba(223,142,58,0.4)"
                            strokeWidth="1.15"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />

                        <path
                            d={HEX_FULL}
                            transform="translate(821 681) scale(1.09) rotate(4 100 100)"
                            stroke="rgba(223,142,58,0.42)"
                            strokeWidth="1.25"
                            strokeLinejoin="round"
                        />

                        {[
                            { cx: 930, cy: 150, delay: 0 },
                            { cx: 640, cy: 540, delay: 1.6 },
                            { cx: 930, cy: 800, delay: 3.1 },
                            { cx: 850, cy: 380, delay: 4.5 },
                        ].map((p) => (
                            <motion.circle
                                key={`${p.cx}-${p.cy}`}
                                cx={p.cx}
                                cy={p.cy}
                                r="2.2"
                                fill="#fff3e6"
                                animate={reduceMotion ? undefined : { opacity: [0.25, 0.65, 0.25] }}
                                transition={reduceMotion ? undefined : { duration: 6, repeat: Infinity, ease: 'easeInOut', delay: p.delay }}
                            />
                        ))}

                        {/* a single point of light traveling slowly along the main structural line */}
                        {!reduceMotion && (
                            <motion.circle
                                r="2.6"
                                fill="#fff3e6"
                                animate={{
                                    cx: [-187, 575, 1337],
                                    cy: [996, 420, -156],
                                    opacity: [0, 0.75, 0],
                                }}
                                transition={{ duration: 18, repeat: Infinity, ease: 'linear', repeatDelay: 3 }}
                            />
                        )}
                    </motion.g>
                </svg>

                {/* ambient wash — general room light centered on the composition, not a spotlight on any single point */}
                <motion.div
                    className="absolute rounded-full"
                    style={{
                        width: '62%',
                        height: '62%',
                        left: '38%',
                        top: '38%',
                        background: 'radial-gradient(circle, rgba(223,142,58,0.07) 0%, transparent 70%)',
                        filter: 'blur(60px)',
                    }}
                    animate={reduceMotion ? undefined : { opacity: [0.7, 1, 0.7] }}
                    transition={reduceMotion ? undefined : { duration: 16, repeat: Infinity, ease: 'easeInOut' }}
                />
            </motion.div>
        </div>
    );
};

export default HeroScene;
