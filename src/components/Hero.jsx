import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import HeroAmbient from './HeroAmbient'
import ConvergenceMotif from './ConvergenceMotif'

const DISCIPLINES = [
  { label: 'Healthcare', slug: 'still-here' },
  { label: 'Automotive', slug: 'stellantis-ivi' },
  { label: 'Commerce', slug: 'zingerman-deli' },
  { label: 'Game design', slug: 'echoes-you-can-touch' },
]

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
  return (
    <section className="hero-cinematic relative flex min-h-screen flex-col overflow-visible">
      <HeroAmbient />

      <div className="relative z-10 flex min-h-screen flex-col justify-center px-6 pt-32 pb-16 sm:pt-36 sm:pb-20">
        <div className="hero-split mx-auto flex w-full max-w-7xl flex-1 flex-col-reverse items-center gap-10 lg:flex-row lg:items-center lg:gap-4">
          <div className="hero-motif-wrap w-full max-w-md opacity-90 lg:max-w-none lg:flex-[1.1]">
            <ConvergenceMotif className="hero-motif h-auto w-full" />
          </div>

          <div className="flex w-full flex-1 flex-col items-center text-center lg:items-start lg:text-left">
            <HeroReveal>
              <p className="type-eyebrow text-ink-secondary/70">I work where</p>
              <h1 className="hero-cinematic__title mt-1 max-w-xl">
                <span className="type-display type-display-xl block uppercase">Research</span>
                <span className="type-display type-display-sm mt-1 block text-ink-secondary/70">meets</span>
                <span className="type-display type-display-xl mt-1 block uppercase">Interaction,</span>
              </h1>
            </HeroReveal>

            <HeroReveal delay={0.15}>
              <p className="hero-intro hero-muted mt-7 max-w-lg">
                Hi, I&apos;m Hazel — a UX and product designer working across healthcare, automotive,
                and complex systems. I turn research into interfaces people can trust.
              </p>
            </HeroReveal>

            <HeroReveal delay={0.3} className="mt-10">
              <Link
                to="/#work"
                className="liquid-glass inline-block rounded-full px-14 py-5 text-base text-ink"
              >
                View work
              </Link>
            </HeroReveal>

            <HeroReveal delay={0.42} className="mt-12 w-full max-w-lg">
              <p className="type-eyebrow text-ink-secondary/45">Focus</p>
              <ul className="mt-4 flex flex-wrap justify-center gap-2 lg:justify-start">
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
      </div>
    </section>
  )
}
