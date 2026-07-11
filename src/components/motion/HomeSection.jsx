import { motion, useReducedMotion } from 'framer-motion'
import { HOME_VIEWPORT, sectionEntrance } from '../../motion/homeMotion'

export default function HomeSection({ children, className = '', delay = 0, as: Tag = 'div' }) {
  const prefersReducedMotion = useReducedMotion()
  const Component = motion[Tag] || motion.div

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <Component
      initial={sectionEntrance.initial}
      whileInView={sectionEntrance.animate}
      viewport={HOME_VIEWPORT}
      transition={{ ...sectionEntrance.transition, delay }}
      className={className}
    >
      {children}
    </Component>
  )
}
