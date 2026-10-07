import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { SITE } from '../../data/projects'

const EASE = [0.22, 1, 0.36, 1]

// Real projects from the repo — each tag links to its existing case study route.
const TAGS = [
  {
    slug: 'surveys-of-consumers',
    label: 'UX Research',
    title: 'Surveys of Consumers',
    descriptor: 'Search-first redesign for journalists, researchers, and policymakers.',
    shape: 'shape-rect',
    rotate: -9,
    x: '-34%',
    y: '8%',
  },
  {
    slug: 'luminipet-shopify',
    label: 'E-commerce',
    title: 'LuminiPet',
    descriptor: 'Information architecture and PDP system for a live Shopify storefront.',
    shape: 'shape-notch',
    rotate: 6,
    x: '-9%',
    y: '32%',
  },
  {
    slug: 'stellantis-ivi',
    label: 'Automotive',
    title: 'Alfa Romeo IVI',
    descriptor: 'An AI-HUD that extends the driver\u2019s senses without adding workload.',
    shape: 'shape-hex',
    rotate: -5,
    x: '17%',
    y: '6%',
  },
  {
    slug: 'still-here',
    label: 'Healthcare',
    title: 'Still Here',
    descriptor: 'A wearable that detects stress early and responds with dignity.',
    shape: 'shape-disc',
    rotate: 8,
    x: '38%',
    y: '30%',
  },
]

const MotionLink = motion(Link)

export default function KeyringHero() {
  const prefersReducedMotion = useReducedMotion()
  const [active, setActive] = useState(null)

  return (
    <section className="fn-hero">
      <div className="fn-hero__intro">
        <p className="fn-hero__eyebrow">Field notes —</p>
        <h1 className="fn-hero__name">Hazel Jiang</h1>
        <p className="fn-hero__role">UX / Product Designer</p>
        <p className="fn-hero__sentence">{SITE.tagline}</p>
      </div>

      <div className="fn-ring-stage">
        <div className="fn-ring" aria-hidden="true" />
        <div className="fn-tag-field">
          {TAGS.map((tag, index) => {
            const isActive = active === tag.slug

            const sharedProps = {
              to: `/projects/${tag.slug}`,
              className: `fn-tag fn-tag--${tag.shape}`,
              'aria-label': `${tag.title} — view case study`,
              onMouseEnter: () => setActive(tag.slug),
              onMouseLeave: () => setActive((current) => (current === tag.slug ? null : current)),
              onFocus: () => setActive(tag.slug),
              onBlur: () => setActive((current) => (current === tag.slug ? null : current)),
            }

            if (prefersReducedMotion) {
              return (
                <Link
                  key={tag.slug}
                  {...sharedProps}
                  style={{
                    left: `calc(50% + ${tag.x})`,
                    top: tag.y,
                    transform: `rotate(${tag.rotate}deg)`,
                    zIndex: isActive ? 20 : index + 1,
                  }}
                >
                  {tag.shape !== 'shape-disc' && <span className="fn-tag__hole" />}
                  <span className="fn-tag__label">{tag.label}</span>
                  <span className="fn-tag__title">{tag.title}</span>
                </Link>
              )
            }

            return (
              <MotionLink
                key={tag.slug}
                {...sharedProps}
                initial={{ opacity: 0, y: 28, rotate: tag.rotate * 1.6, scale: 0.92 }}
                animate={{ opacity: 1, y: 0, rotate: tag.rotate, scale: 1 }}
                whileHover={{ rotate: 0, scale: 1.07, y: -10 }}
                whileFocus={{ rotate: 0, scale: 1.07, y: -10 }}
                transition={{ duration: 0.7, delay: 0.5 + index * 0.1, ease: EASE }}
                style={{
                  left: `calc(50% + ${tag.x})`,
                  top: tag.y,
                  zIndex: isActive ? 20 : index + 1,
                }}
              >
                {tag.shape !== 'shape-disc' && <span className="fn-tag__hole" />}
                <span className="fn-tag__label">{tag.label}</span>
                <span className="fn-tag__title">{tag.title}</span>
              </MotionLink>
            )
          })}
        </div>
      </div>

      <div className="fn-caption" aria-live="polite">
        {prefersReducedMotion ? (
          <p className="fn-caption__placeholder">Select a tag to open its case study</p>
        ) : (
          <AnimatePresence mode="wait">
            {active ? (
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25, ease: EASE }}
              >
                <p className="fn-caption__title">{TAGS.find((t) => t.slug === active)?.title}</p>
                <p className="fn-caption__desc">{TAGS.find((t) => t.slug === active)?.descriptor}</p>
              </motion.div>
            ) : (
              <motion.p
                key="placeholder"
                className="fn-caption__placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                Hover or tab to a tag to preview it
              </motion.p>
            )}
          </AnimatePresence>
        )}
      </div>

      <div style={{ textAlign: 'center' }}>
        <a href="#fn-work" className="fn-view-work">
          View selected work ↓
        </a>
      </div>
    </section>
  )
}
