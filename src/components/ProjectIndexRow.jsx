import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { HOME_VIEWPORT, indexEntrance } from '../motion/homeMotion'

function formatYear(timeline) {
  if (!timeline) return ''
  const match = timeline.match(/\b(20\d{2})\b/)
  return match ? match[1] : timeline.split('·')[0]?.trim() || ''
}

export default function ProjectIndexRow({ project, index, variant = 'default', animate = false }) {
  const prefersReducedMotion = useReducedMotion()
  const year = formatYear(project.timeline)
  const domain = project.categories?.[0] || project.type

  const motionProps = indexEntrance(animate ? Math.min((index - 1) * 0.04, 0.12) : 0)
  const Wrapper = animate && !prefersReducedMotion ? motion.article : 'article'
  const wrapperMotion = animate && !prefersReducedMotion
    ? {
        initial: motionProps.initial,
        whileInView: motionProps.animate,
        viewport: HOME_VIEWPORT,
        transition: motionProps.transition,
      }
    : {}

  if (variant === 'minimal') {
    return (
      <Wrapper className="group border-t border-line" {...wrapperMotion}>
        <Link
          to={`/projects/${project.slug}`}
          className="flex items-baseline justify-between gap-6 py-5 transition-colors duration-500 hover:text-ink-secondary md:py-6"
        >
          <div className="flex min-w-0 items-baseline gap-5 md:gap-8">
            <span className="type-index shrink-0">
              {String(index).padStart(2, '0')}
            </span>
            <h3 className="type-display truncate text-xl tracking-[-0.02em] md:text-2xl">
              {project.title}
            </h3>
          </div>
          <p className="type-meta hidden shrink-0 sm:block">
            {[domain, year].filter(Boolean).join(' · ')}
          </p>
        </Link>
      </Wrapper>
    )
  }

  return (
    <Wrapper className="group border-t border-line" {...wrapperMotion}>
      <Link
        to={`/projects/${project.slug}`}
        className="grid grid-cols-[auto_1fr_auto] items-start gap-4 py-6 md:grid-cols-[3rem_1fr_6rem] md:items-center md:gap-6 md:py-7"
      >
        <span className="type-index shrink-0 pt-0.5 md:pt-0">
          {String(index).padStart(2, '0')}
        </span>
        <div className="col-span-2 min-w-0 md:col-span-1">
          <h3 className="type-display text-xl leading-snug tracking-[-0.01em] transition-colors duration-500 group-hover:text-ink-secondary md:text-2xl">
            {project.title}
          </h3>
          {project.tagline && (
            <p className="type-body mt-2 line-clamp-1 max-w-xl">
              {project.tagline}
            </p>
          )}
        </div>
        <p className="type-meta hidden text-right md:block">{year}</p>
      </Link>
    </Wrapper>
  )
}
