import { motion, useReducedMotion } from 'framer-motion'
import IPhoneMockup from './case-study/IPhoneMockup'

const LIFESTYLE = [
  {
    src: '/assets/still-here/cover/lifestyle-tasks.png',
    alt: 'Adult using Still Here for daily task guidance at home',
    label: 'Daily guidance',
    className: 'still-here-cover__photo still-here-cover__photo--tasks',
  },
  {
    src: '/assets/still-here/cover/lifestyle-call.png',
    alt: 'Caregiver on a Still Here live support video call',
    label: 'Live support',
    className: 'still-here-cover__photo still-here-cover__photo--call',
  },
  {
    src: '/assets/still-here/cover/lifestyle-walk.png',
    alt: 'User walking with Still Here co-pilot navigation',
    label: 'Co-pilot walk',
    className: 'still-here-cover__photo still-here-cover__photo--walk',
  },
]

const SCREEN_GRID = [
  { src: '/assets/still-here/figma/task-list.png', alt: 'Task list screen' },
  { src: '/assets/still-here/figma/social-support.png', alt: 'Social support screen' },
  { src: '/assets/still-here/figma/mood-patterns.png', alt: 'Mood patterns screen' },
  { src: '/assets/still-here/figma/personal-center.png', alt: 'Personal center screen' },
]

const HERO_PHONES = [
  {
    src: '/assets/still-here/figma/co-pilot-nav.png',
    alt: 'Co-Pilot navigation screen',
    size: 'lg',
    tilt: -8,
    className: 'still-here-cover__phone still-here-cover__phone--hero',
  },
  {
    src: '/assets/still-here/figma/live-support-call.png',
    alt: 'Live support call screen',
    size: 'md',
    tilt: 6,
    className: 'still-here-cover__phone still-here-cover__phone--secondary',
  },
]

function LifestyleCard({ photo, delay = 0 }) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <div className={photo.className}>
      <motion.div
        className="still-here-cover__photo-frame"
        initial={prefersReducedMotion ? false : { opacity: 0, y: 12, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        <img src={photo.src} alt={photo.alt} className="still-here-cover__photo-img" loading="lazy" />
        <span className="still-here-cover__photo-label">{photo.label}</span>
      </motion.div>
    </div>
  )
}

function ScreenGrid() {
  return (
    <div className="still-here-cover__grid" aria-hidden="true">
      <div className="still-here-cover__grid-chrome">
        <div className="still-here-cover__grid-dots">
          <span />
          <span />
          <span />
        </div>
        <span className="still-here-cover__grid-url">stillhere.app</span>
      </div>
      <div className="still-here-cover__grid-screens">
        {SCREEN_GRID.map((screen) => (
          <img key={screen.src} src={screen.src} alt="" className="still-here-cover__grid-screen" />
        ))}
      </div>
    </div>
  )
}

export default function StillHereCover({ className = '', compact = false }) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <div
      className={`still-here-cover ${compact ? 'still-here-cover--compact' : ''} ${className}`}
      role="img"
      aria-label="Still Here portfolio cover — lifestyle users with app interface mockups for dementia care"
    >
      <div className="still-here-cover__ambient" aria-hidden="true">
        <div className="still-here-cover__glow still-here-cover__glow--violet" />
        <div className="still-here-cover__glow still-here-cover__glow--cyan" />
        <div className="still-here-cover__grid-bg" />
      </div>

      <div className="still-here-cover__stage">
        <ScreenGrid />

        {LIFESTYLE.map((photo, i) => (
          <LifestyleCard key={photo.src} photo={photo} delay={0.08 + i * 0.06} />
        ))}

        {HERO_PHONES.map((phone, i) => (
          <div key={phone.src} className={phone.className}>
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              style={{ transform: `rotate(${phone.tilt}deg)` }}
            >
              <IPhoneMockup
                src={phone.src}
                alt={phone.alt}
                size={phone.size}
                tilt={0}
                float={!compact && !prefersReducedMotion}
                priority={i === 0}
              />
            </motion.div>
          </div>
        ))}

        <div className="still-here-cover__badge still-here-cover__badge--wearable">
          <span className="still-here-cover__badge-dot" />
          <span>Wearable + App</span>
        </div>

        <div className="still-here-cover__badge still-here-cover__badge--yod">
          <span className="still-here-cover__badge-title">4 workflows</span>
          <span className="still-here-cover__badge-sub">Tasks · Social · Insights · Profile</span>
        </div>
      </div>
    </div>
  )
}

