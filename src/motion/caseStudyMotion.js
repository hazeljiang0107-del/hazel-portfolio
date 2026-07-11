/**
 * Case-study motion tokens — adapted from motion-anything MOTION-SPEC.md
 * Categories used: scroll-reveal, entrance, emphasis, state-transition
 */

/** ease-out — default for content entering toward the user */
export const EASE_OUT = [0.16, 1, 0.3, 1]

/** ease-in-out — moves that start and end on screen */
export const EASE_IN_OUT = [0.65, 0, 0.35, 1]

export const DURATION = {
  instant: 0.1,
  fast: 0.18,
  base: 0.28,
  slow: 0.42,
  deliberate: 0.65,
}

export const STAGGER = {
  tight: 0.05,
  base: 0.07,
  loose: 0.09,
}

export const VIEWPORT = {
  once: true,
  amount: 0.25,
  margin: '0px 0px -8% 0px',
}

/** scroll-reveal · fade + rise (~520ms ease-out) */
export const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: VIEWPORT,
  transition: { duration: DURATION.slow + 0.1, delay, ease: EASE_OUT },
})

/** fade-in-up · slightly stronger hero entrance */
export const fadeInUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: DURATION.slow, delay, ease: EASE_OUT },
})

/** stagger-list — parent drives children via variants (motion-anything stagger-list) */
export const staggerContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: STAGGER.base, delayChildren: 0.04 },
  },
}

export const staggerItem = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.44, ease: EASE_OUT },
  },
}

export const staggerInView = {
  initial: 'hidden',
  whileInView: 'show',
  viewport: VIEWPORT,
}

/** bar grow — transform only (scaleX) */
export const barGrow = (delay = 0) => ({
  initial: { scaleX: 0 },
  whileInView: { scaleX: 1 },
  viewport: VIEWPORT,
  transition: { duration: DURATION.slow, delay, ease: EASE_OUT },
})

/** count-up duration from recipe (~900ms, ease-out cubic) */
export const COUNT_DURATION_MS = 900
