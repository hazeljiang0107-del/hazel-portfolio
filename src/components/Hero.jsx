import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import HeroAmbient from './HeroAmbient'
import FallingStars from './FallingStars'

const DISCIPLINES = [
  { label: 'Healthcare', slug: 'still-here' },
  { label: 'Automotive', slug: 'stellantis-ivi' },
  { label: 'Commerce', slug: 'zingerman-deli' },
  { label: 'Game design', slug: 'echoes-you-can-touch' },
]

const HERO_VIDEO =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4'

const HERO_EASE = [0.22, 1, 0.36, 1]

function HeroReveal({ children, delay = 0, className = '' }) {
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay, ease: HERO_EASE }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default function Hero() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section
      className="hero-cinematic relative flex min-h-screen flex-col overflow-visible"
      data-falling-stars-root
    >
      <div className="absolute inset-0 z-0 overflow-hidden">
        {prefersReducedMotion ? (
          <video
            className="h-full w-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            aria-hidden="true"
          >
            <source src={HERO_VIDEO} type="video/mp4" />
          </video>
        ) : (
          <motion.div
            className="h-full w-full origin-center"
            animate={{ scale: [1, 1.045, 1] }}
            transition={{ duration: 36, repeat: Infinity, ease: 'easeInOut' }}
          >
            <video
              className="h-full w-full object-cover"
              autoPlay
              loop
              muted
              playsInline
              aria-hidden="true"
            >
              <source src={HERO_VIDEO} type="video/mp4" />
            </video>
          </motion.div>
        )}
      </div>

      <HeroAmbient />
      <FallingStars className="z-[2]" interactive starCount={220} shootingInterval={3600} />
      <div className="hero-dissolve" aria-hidden="true" />

      <div className="relative z-10 flex min-h-screen flex-col px-6 pt-32 pb-16 sm:pt-36 sm:pb-20">
        <div className="flex flex-1 flex-col items-center justify-center py-12 text-center sm:py-16">
          <HeroReveal>
            <h1 className="hero-cinematic__title mx-auto max-w-5xl text-center">
              <span className="type-display type-display-sm block text-white/60">I work where</span>
              <span className="type-display type-display-xl mt-1 block uppercase text-white">Research</span>
              <span className="type-display type-display-sm mt-1 block text-white/50">meets</span>
              <span className="type-display type-display-xl mt-1 block uppercase text-white">Interaction,</span>
              <span className="type-display type-display-sm mx-auto mt-8 block max-w-xl text-white/70">
                designing for moments where clarity and trust matter.
              </span>
            </h1>
          </HeroReveal>

          <HeroReveal delay={0.15}>
            <p className="hero-intro hero-muted mx-auto mt-8 max-w-2xl text-center">
              Hi, I&apos;m Hazel — a UX and product designer working across healthcare, automotive,
              and complex systems. I turn research into interfaces people can trust.
            </p>
          </HeroReveal>

          <HeroReveal delay={0.3}>
            <Link
              to="/#work"
              className="liquid-glass mt-12 inline-block rounded-full px-14 py-5 text-base text-white"
            >
              View work
            </Link>
          </HeroReveal>

          <HeroReveal delay={0.42} className="mt-14 w-full max-w-3xl">
            <p className="type-eyebrow text-white/45">Focus</p>
            <ul className="mt-4 flex flex-wrap justify-center gap-2 md:mt-5">
              {DISCIPLINES.map(({ label, slug }) => (
                <li key={slug}>
                  <Link
                    to={`/projects/${slug}`}
                    className="hero-focus-chip liquid-glass rounded-full"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </HeroReveal>
        </div>
      </div>
    </section>
  )
}
