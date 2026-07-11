import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import ProjectThumbnail from './ProjectThumbnail'
import StillHereCover from './StillHereCover'
import {
  HOME_VIEWPORT,
  imageEntrance,
  copyEntrance,
  imageHover,
} from '../motion/homeMotion'

const LAYOUT_CYCLE = ['exhibit-a', 'exhibit-b', 'exhibit-c']

export function getEditorialLayout(index) {
  return LAYOUT_CYCLE[(index - 1) % LAYOUT_CYCLE.length]
}

function formatYear(timeline) {
  if (!timeline) return ''
  const match = timeline.match(/\b(20\d{2})\b/)
  return match ? match[1] : timeline.split('·')[0]?.trim() || ''
}

function stageClass(slug) {
  if (slug === 'stellantis-ivi') return 'bg-black'
  if (slug === 'surveys-of-consumers') return 'bg-[#00274c]'
  if (slug === 'zingerman-deli') return 'bg-[#1a1814]'
  if (slug === 'still-here') return 'bg-[#05071a]'
  return 'bg-surface'
}

function isPresentationCover(slug) {
  return slug === 'stellantis-ivi' || slug === 'surveys-of-consumers'
}

function MotionImage({ children, className = '' }) {
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial={imageEntrance.initial}
      whileInView={imageEntrance.animate}
      whileHover={imageHover}
      viewport={HOME_VIEWPORT}
      transition={imageEntrance.transition}
    >
      {children}
    </motion.div>
  )
}

function MotionCopy({ children, className = '', delay = 0.18 }) {
  const prefersReducedMotion = useReducedMotion()
  const motionProps = copyEntrance(delay)

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial={motionProps.initial}
      whileInView={motionProps.animate}
      viewport={HOME_VIEWPORT}
      transition={motionProps.transition}
    >
      {children}
    </motion.div>
  )
}

function ProjectMeta({ project }) {
  const year = formatYear(project.timeline)
  const discipline = project.categories?.[0] || ''
  const parts = [project.role, year, discipline].filter(Boolean)

  if (!parts.length) return null

  return <p className="type-meta">{parts.join(' · ')}</p>
}

function ProjectNumber({ index }) {
  return <p className="type-index">{String(index).padStart(2, '0')}</p>
}

function ProjectTitle({ children, className = '' }) {
  return (
    <h3
      className={`type-display transition-colors duration-500 group-hover:text-ink-secondary ${className}`}
    >
      {children}
    </h3>
  )
}

function ProjectSentence({ children }) {
  if (!children) return null
  return <p className="type-body max-w-md">{children}</p>
}

function ProjectImage({ project, aspectClass, className = '' }) {
  const isStillHere = project.slug === 'still-here'

  return (
    <MotionImage
      className={`relative overflow-hidden rounded-2xl ${stageClass(project.slug)} ${className}`}
    >
      <div className={`relative overflow-hidden ${aspectClass} ${isStillHere ? 'min-h-[280px]' : ''}`}>
        {isStillHere ? (
          <StillHereCover compact />
        ) : (
        <ProjectThumbnail
          src={project.thumbnail}
          alt={`${project.title} preview`}
          accent={project.accent}
          title={project.title}
          contain={isPresentationCover(project.slug)}
          hoverScale={false}
        />
        )}
      </div>
    </MotionImage>
  )
}

function ExhibitA({ project, index, sentence }) {
  return (
    <Link
      to={`/projects/${project.slug}`}
      className="group grid grid-cols-1 gap-8 md:grid-cols-[minmax(0,0.32fr)_minmax(0,1fr)] md:items-center md:gap-10 lg:gap-14"
    >
      <MotionCopy className="order-2 flex flex-col gap-5 md:order-1 md:gap-6 md:py-6" delay={0.2}>
        <ProjectNumber index={index} />
        <ProjectTitle className="type-display-lg">{project.title}</ProjectTitle>
        <ProjectSentence>{sentence}</ProjectSentence>
        <ProjectMeta project={project} />
      </MotionCopy>
      <ProjectImage
        project={project}
        aspectClass="aspect-[4/3] md:aspect-[16/11] lg:aspect-[16/10]"
        className="order-1 md:order-2"
      />
    </Link>
  )
}

function ExhibitB({ project, index, sentence }) {
  return (
    <Link
      to={`/projects/${project.slug}`}
      className="group grid grid-cols-1 gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,0.34fr)] md:items-end md:gap-10 lg:gap-14"
    >
      <ProjectImage
        project={project}
        aspectClass="aspect-[4/3] md:aspect-[16/11] lg:aspect-[16/10] md:order-1"
        className="md:order-1"
      />
      <MotionCopy
        className="order-2 flex flex-col gap-5 md:order-2 md:gap-6 md:pb-2 md:pt-12 lg:pt-20"
        delay={0.2}
      >
        <ProjectNumber index={index} />
        <ProjectTitle className="type-display-md">{project.title}</ProjectTitle>
        <ProjectSentence>{sentence}</ProjectSentence>
        <ProjectMeta project={project} />
      </MotionCopy>
    </Link>
  )
}

function ExhibitC({ project, index, sentence }) {
  return (
    <Link to={`/projects/${project.slug}`} className="group block">
      <ProjectImage
        project={project}
        aspectClass="aspect-[16/10] md:aspect-[21/9]"
        className="w-full"
      />
      <MotionCopy
        className="mt-8 grid gap-6 md:mt-10 md:grid-cols-[minmax(0,0.28fr)_minmax(0,1fr)_minmax(0,0.22fr)] md:items-start md:gap-8"
        delay={0.22}
      >
        <ProjectNumber index={index} />
        <div className="flex flex-col gap-4 md:gap-5">
          <ProjectTitle className="type-display-xl">{project.title}</ProjectTitle>
          <ProjectSentence>{sentence}</ProjectSentence>
        </div>
        <div className="md:pt-2 md:text-right">
          <ProjectMeta project={project} />
        </div>
      </MotionCopy>
    </Link>
  )
}

const LAYOUTS = {
  'exhibit-a': ExhibitA,
  'exhibit-b': ExhibitB,
  'exhibit-c': ExhibitC,
  immersion: ExhibitC,
  'split-end': ExhibitB,
  'split-start': ExhibitA,
}

export default function CoverSpread({ project, index = 1, layout }) {
  const resolvedLayout = layout || getEditorialLayout(index)
  const Layout = LAYOUTS[resolvedLayout] || ExhibitA
  const sentence = project.tagline || project.summary

  return (
    <article className="border-t border-line py-20 md:py-28 lg:py-36">
      <Layout project={project} index={index} sentence={sentence} />
    </article>
  )
}
