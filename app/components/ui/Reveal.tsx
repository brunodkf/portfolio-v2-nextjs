'use client';

import { motion } from 'framer-motion';

const elements = { div: motion.div, li: motion.li, article: motion.article, section: motion.section };

interface RevealProps {
  as?: keyof typeof elements;
  trigger?: 'mount' | 'view';
  delay?: number;
  duration?: number;
  className?: string;
  children: React.ReactNode;
}

export function Reveal({ as = 'div', trigger = 'mount', delay = 0, duration = 0.5, className, children }: RevealProps) {
  const Element = elements[as];
  const target = { opacity: 1, y: 0 };

  return (
    <Element
      className={className}
      initial={{ opacity: 0, y: 20 }}
      {...(trigger === 'view' ? { whileInView: target, viewport: { once: true, margin: '-60px' } } : { animate: target })}
      transition={{ duration, delay, ease: 'easeOut' }}
    >
      {children}
    </Element>
  );
}
