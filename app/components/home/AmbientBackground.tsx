'use client';

import { motion, useReducedMotion } from 'framer-motion';

const noiseDataUri =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>";

const AmbientBackground = () => {
  const reduceMotion = useReducedMotion();

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden="true">
      <div className="absolute inset-0 opacity-0 dark:opacity-[0.05] bg-dot-grid" />

      <motion.div
        className="absolute w-[900px] h-[900px] rounded-full opacity-[0.07] dark:opacity-[0.10]"
        style={{
          background: 'radial-gradient(circle, #df8e3a 0%, transparent 70%)',
          filter: 'blur(120px)',
          top: '-15%',
          left: '-10%',
        }}
        animate={
          reduceMotion
            ? undefined
            : { x: [0, 60, -20, 0], y: [0, 40, 80, 0] }
        }
        transition={{ duration: 42, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute w-[700px] h-[700px] rounded-full opacity-[0.05] dark:opacity-[0.08]"
        style={{
          background: 'radial-gradient(circle, #dfa47d 0%, transparent 70%)',
          filter: 'blur(140px)',
          bottom: '-10%',
          right: '-8%',
        }}
        animate={
          reduceMotion
            ? undefined
            : { x: [0, -50, 30, 0], y: [0, -30, -60, 0] }
        }
        transition={{ duration: 50, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute w-[620px] h-[620px] rounded-full opacity-0 dark:opacity-[0.12]"
        style={{
          background: 'radial-gradient(circle, #dfa47d 0%, transparent 65%)',
          filter: 'blur(90px)',
          top: '-6%',
          right: '2%',
        }}
        animate={
          reduceMotion
            ? undefined
            : { opacity: [0.08, 0.16, 0.08] }
        }
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div
        className="absolute inset-0 opacity-[0.025] dark:opacity-[0.04] mix-blend-overlay"
        style={{ backgroundImage: `url("${noiseDataUri}")` }}
      />
    </div>
  );
};

export default AmbientBackground;
