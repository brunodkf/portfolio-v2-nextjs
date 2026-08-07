'use client';

import { motion, useReducedMotion } from 'framer-motion';

interface HexLogoProps {
  width?: number;
  height?: number;
  showText?: boolean;
  className?: string;
  animated?: boolean;
}

const HexLogo: React.FC<HexLogoProps> = ({ width = 30, height = 34, showText = true, className, animated = false }) => {
  const reduceMotion = useReducedMotion();
  const shouldAnimate = animated && !reduceMotion;

  return (
    <svg width={width} height={height} viewBox="0 0 30 34" fill="none" className={className}>
      <motion.path
        d="M15 1.5 L28 9 V25 L15 32.5 L2 25 V9 Z"
        stroke="#dfa47d"
        strokeWidth="1.5"
        style={{ transformOrigin: '15px 17px' }}
        animate={shouldAnimate ? { rotate: 360 } : undefined}
        transition={shouldAnimate ? { duration: 60, repeat: Infinity, ease: 'linear' } : undefined}
      />
      {showText && (
        <text x="15" y="21" textAnchor="middle" fontFamily="var(--font-antonio)" fontSize="13" fontWeight="700" fill="currentColor">
          BF
        </text>
      )}
    </svg>
  );
};

export default HexLogo;
