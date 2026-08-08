// Shared motion vocabulary — keeps easing/timing consistent across the site.
// Curves lean on expo/soft-out shapes (natural acceleration, gentle settle)
// rather than default linear/ease, per the site's premium-product motion language.

export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;
export const EASE_OUT_SOFT = [0.22, 1, 0.36, 1] as const;
export const EASE_IN_OUT_SOFT = [0.45, 0, 0.2, 1] as const;

export const DURATION = {
  micro: 0.15,
  hover: 0.25,
  reveal: 0.6,
  slow: 1.2,
} as const;

export const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export const fadeUpTransition = (delay = 0) => ({
  duration: DURATION.reveal,
  delay,
  ease: EASE_OUT_EXPO,
});

export const staggerContainer = (staggerChildren = 0.1, delayChildren = 0) => ({
  hidden: {},
  show: {
    transition: { staggerChildren, delayChildren },
  },
});

export const viewportOnce = { once: true, amount: 0.2, margin: '0px 0px -80px 0px' };
