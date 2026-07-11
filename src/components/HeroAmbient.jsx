import { motion, useReducedMotion } from 'framer-motion'

const ORBS = [
  {
    className: 'hero-ambient__orb hero-ambient__orb--a',
    duration: 28,
    x: ['0%', '8%', '-4%', '0%'],
    y: ['0%', '-10%', '6%', '0%'],
    scale: [1, 1.12, 0.94, 1],
  },
  {
    className: 'hero-ambient__orb hero-ambient__orb--b',
    duration: 34,
    x: ['0%', '-10%', '6%', '0%'],
    y: ['0%', '8%', '-6%', '0%'],
    scale: [1, 0.9, 1.14, 1],
  },
  {
    className: 'hero-ambient__orb hero-ambient__orb--c',
    duration: 40,
    x: ['0%', '5%', '-8%', '0%'],
    y: ['0%', '-5%', '10%', '0%'],
    scale: [1, 1.08, 0.96, 1],
  },
]

/**
 * Soft drifting light fields behind hero copy — presence without noise.
 * Disabled when prefers-reduced-motion is set.
 */
export default function HeroAmbient() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <div className="hero-ambient" aria-hidden="true">
      <div className="hero-ambient__haze" />
      {ORBS.map((orb) =>
        prefersReducedMotion ? (
          <div key={orb.className} className={orb.className} />
        ) : (
          <motion.div
            key={orb.className}
            className={orb.className}
            animate={{ x: orb.x, y: orb.y, scale: orb.scale }}
            transition={{
              duration: orb.duration,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        )
      )}
      {!prefersReducedMotion && <div className="hero-ambient__shimmer" />}
    </div>
  )
}
