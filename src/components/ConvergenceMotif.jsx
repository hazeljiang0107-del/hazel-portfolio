import { motion, useReducedMotion } from 'framer-motion'

/**
 * Signature hero motif — "Research meets Interaction."
 * An organic, searching line (research) converges through a UI frame
 * into a precise, geometric line (interaction). Replaces the generic
 * stock hero video with something that actually encodes the site's
 * stated identity.
 */

const EASE = [0.22, 1, 0.36, 1]

const ORGANIC_PATH =
  'M-10,200 C40,150 70,120 115,135 C160,150 150,205 115,225 C85,242 55,225 62,195 C68,168 110,150 150,185 C195,224 235,260 285,235 C320,218 345,195 375,208'

const GEOMETRIC_PATH =
  'M475,220 L560,220 L560,160 L620,160 L620,220 L680,220 L680,280 L740,280 L740,220 L910,220'

const MARKERS = [
  { x: 560, y: 220 },
  { x: 620, y: 160 },
  { x: 740, y: 280 },
]

export default function ConvergenceMotif({ className = '' }) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <svg
      viewBox="0 0 900 420"
      className={className}
      fill="none"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <radialGradient id="convergence-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--color-accent-warm)" stopOpacity="0.55" />
          <stop offset="100%" stopColor="var(--color-accent-warm)" stopOpacity="0" />
        </radialGradient>
      </defs>

      {prefersReducedMotion ? (
        <circle cx="420" cy="220" r="70" fill="url(#convergence-glow)" />
      ) : (
        <motion.circle
          cx="420"
          cy="220"
          r="70"
          fill="url(#convergence-glow)"
          initial={{ opacity: 0.25, scale: 0.9 }}
          animate={{ opacity: [0.25, 0.5, 0.25], scale: [0.9, 1.08, 0.9] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1.6 }}
          style={{ transformOrigin: '420px 220px' }}
        />
      )}

      {prefersReducedMotion ? (
        <path
          d={ORGANIC_PATH}
          stroke="var(--color-ink)"
          strokeWidth="1.6"
          strokeLinecap="round"
          opacity="0.85"
        />
      ) : (
        <motion.path
          d={ORGANIC_PATH}
          stroke="var(--color-ink)"
          strokeWidth="1.6"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.85 }}
          transition={{ duration: 1.3, ease: EASE }}
        />
      )}

      {prefersReducedMotion ? (
        <rect
          x="365"
          y="182"
          width="110"
          height="76"
          rx="16"
          stroke="var(--color-accent-warm)"
          strokeWidth="1.6"
        />
      ) : (
        <motion.rect
          x="365"
          y="182"
          width="110"
          height="76"
          rx="16"
          stroke="var(--color-accent-warm)"
          strokeWidth="1.6"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.65, delay: 1.05, ease: EASE }}
        />
      )}

      {prefersReducedMotion ? (
        <circle cx="420" cy="220" r="5" fill="var(--color-accent-warm)" />
      ) : (
        <motion.circle
          cx="420"
          cy="220"
          r="5"
          fill="var(--color-accent-warm)"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.45, delay: 1.5, ease: EASE }}
          style={{ transformOrigin: '420px 220px' }}
        />
      )}

      {prefersReducedMotion ? (
        <path
          d={GEOMETRIC_PATH}
          stroke="var(--color-ink-secondary)"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.7"
        />
      ) : (
        <motion.path
          d={GEOMETRIC_PATH}
          stroke="var(--color-ink-secondary)"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.7 }}
          transition={{ duration: 1, delay: 1.65, ease: EASE }}
        />
      )}

      {MARKERS.map((m, i) =>
        prefersReducedMotion ? (
          <rect
            key={`${m.x}-${m.y}`}
            x={m.x - 4}
            y={m.y - 4}
            width="8"
            height="8"
            stroke="var(--color-ink-secondary)"
            strokeWidth="1.2"
            opacity="0.7"
          />
        ) : (
          <motion.rect
            key={`${m.x}-${m.y}`}
            x={m.x - 4}
            y={m.y - 4}
            width="8"
            height="8"
            stroke="var(--color-ink-secondary)"
            strokeWidth="1.2"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.7, scale: 1 }}
            transition={{ duration: 0.35, delay: 1.95 + i * 0.12, ease: EASE }}
            style={{ transformOrigin: `${m.x}px ${m.y}px` }}
          />
        )
      )}
    </svg>
  )
}
