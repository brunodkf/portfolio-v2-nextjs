'use client';

import { motion, useReducedMotion } from 'framer-motion';

interface DecorativeHexagonProps {
  width: number;
  height: number;
  opacity: number;
  strokeWidth?: number;
  className?: string;
}

const DecorativeHexagon: React.FC<DecorativeHexagonProps> = ({ width, height, opacity, strokeWidth = 1.5, className }) => {
  const reduceMotion = useReducedMotion();

  return (
    <motion.svg
      width={width}
      height={height}
      viewBox="0 0 200 220"
      fill="none"
      className={className}
      style={{ opacity }}
      animate={reduceMotion ? undefined : { scale: [1, 1.02, 1], rotate: [0, 1, 0] }}
      transition={reduceMotion ? undefined : { duration: 11, repeat: Infinity, ease: 'easeInOut' }}
    >
      <path d="M100 12 L176 56 V144 L100 188 L24 144 V56 Z" stroke="#dfa47d" strokeWidth={strokeWidth} />
    </motion.svg>
  );
};

export default DecorativeHexagon;
