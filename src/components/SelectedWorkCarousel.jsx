import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from 'framer-motion'
import ProjectThumbnail from './ProjectThumbnail'
import StillHereCover from './StillHereCover'
import {
  carouselBg,
  carouselImage,
  carouselMeta,
  carouselPeek,
  carouselTitle,
  DRAG_OFFSET_THRESHOLD,
  DRAG_VELOCITY_THRESHOLD,
} from '../motion/homeMotion'

function formatYear(timeline) {
  if (!timeline) return ''
  const match = timeline.match(/\b(20\d{2})\b/)
  return match ? match[1] : timeline.split('·')[0]?.trim() || ''
}

function projectMeta(project) {
  const year = formatYear(project.timeline)
  const discipline = project.categories?.[0] || ''
  return [project.role, year, discipline].filter(Boolean).join(' · ')
}

function stageClass(slug) {
  if (slug === 'stellantis-ivi') return 'bg-black'
  if (slug === 'surveys-of-consumers') return 'bg-[#00274c]'
  if (slug === 'zingerman-deli') return 'bg-[#1a1814]'
  if (slug === 'still-here') return 'bg-[#05071a]'
  return 'bg-surface'
}

function ProjectCoverMedia({ project, ...props }) {
  if (project.slug === 'still-here') {
    return <StillHereCover compact {...props} />
  }

  return (
    <ProjectThumbnail
      src={project.thumbnail}
      accent={project.accent}
      title={project.title}
      {...props}
    />
  )
}

/** SoC cover is a full presentation slide — keep contain so the whole layout shows. */
function isContainedCover(slug) {
  return slug === 'surveys-of-consumers'
}

const TONE_BASE = { r: 15, g: 14, b: 12 }
const TONE_MIX = 0.11

function parseHex(hex) {
  const normalized = hex.replace('#', '')
  const value =
    normalized.length === 3
      ? normalized
          .split('')
          .map((char) => char + char)
          .join('')
      : normalized.slice(0, 6)

  return {
    r: Number.parseInt(value.slice(0, 2), 16),
    g: Number.parseInt(value.slice(2, 4), 16),
    b: Number.parseInt(value.slice(4, 6), 16),
  }
}

function mixAccent(accent) {
  const { r, g, b } = parseHex(accent || '#d4c4a8')
  const mix = (channel, base) =>
    Math.round(channel * TONE_MIX + base * (1 - TONE_MIX))

  return `rgb(${mix(r, TONE_BASE.r)}, ${mix(g, TONE_BASE.g)}, ${mix(b, TONE_BASE.b)})`
}

function wrapIndex(index, length) {
  if (length === 0) return 0
  return ((index % length) + length) % length
}

function CarouselCounter({ index, total, reduced }) {
  const current = String(index + 1).padStart(2, '0')
  const max = String(total).padStart(2, '0')

  if (reduced) {
    return (
      <p className="work-carousel__counter type-index" aria-live="polite">
        <span>{current}</span>
        <span className="work-carousel__counter-sep" aria-hidden="true">
          /
        </span>
        <span>{max}</span>
      </p>
    )
  }

  return (
    <p className="work-carousel__counter type-index" aria-live="polite">
      <span className="work-carousel__counter-slot">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={current}
            className="work-carousel__counter-digit"
            initial={{ y: '110%' }}
            animate={{ y: 0 }}
            exit={{ y: '-110%' }}
            transition={carouselMeta}
          >
            {current}
          </motion.span>
        </AnimatePresence>
      </span>
      <span className="work-carousel__counter-sep" aria-hidden="true">
        /
      </span>
      <span>{max}</span>
    </p>
  )
}

function NavButton({ direction, onClick, label }) {
  return (
    <button
      type="button"
      className="work-carousel__nav-btn"
      onClick={onClick}
      aria-label={label}
    >
      <span aria-hidden="true">{direction === 'prev' ? '←' : '→'}</span>
    </button>
  )
}

function PeekPreview({ project, direction, onClick, reduced }) {
  if (!project) return null

  return (
    <button
      type="button"
      className={`work-carousel__peek work-carousel__peek--${direction}`}
      onClick={onClick}
      aria-label={`${direction === 'prev' ? 'Previous' : 'Next'} project: ${project.title}`}
    >
      <motion.div
        className={`work-carousel__peek-frame ${stageClass(project.slug)}`}
        initial={false}
        animate={{ opacity: reduced ? 0.12 : 0.22, scale: 0.92 }}
        transition={carouselPeek}
      >
        <ProjectCoverMedia
          project={project}
          alt=""
          contain={isContainedCover(project.slug)}
          hoverScale={false}
        />
      </motion.div>
      <span className="work-carousel__peek-label type-meta">{project.title}</span>
    </button>
  )
}

function ActiveImage({ project, direction, reduced }) {
  const imageRef = useRef(null)
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const rotateX = useTransform(pointerY, [-0.5, 0.5], [1.75, -1.75])
  const rotateY = useTransform(pointerX, [-0.5, 0.5], [-1.75, 1.75])

  useEffect(() => {
    if (reduced) return undefined
    const el = imageRef.current
    if (!el) return undefined

    const onMove = (event) => {
      const rect = el.getBoundingClientRect()
      pointerX.set((event.clientX - rect.left) / rect.width - 0.5)
      pointerY.set((event.clientY - rect.top) / rect.height - 0.5)
    }

    const onLeave = () => {
      pointerX.set(0)
      pointerY.set(0)
    }

    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [pointerX, pointerY, reduced, project.slug])

  const slideOffset = direction >= 0 ? 48 : -48

  return (
    <motion.div
      key={`image-${project.slug}`}
      className={`work-carousel__image-stage ${stageClass(project.slug)}`}
      ref={imageRef}
      custom={direction}
      variants={{
        enter: (d) => ({
          opacity: 0,
          x: d >= 0 ? slideOffset : -slideOffset,
          scale: 0.97,
        }),
        center: { opacity: 1, x: 0, scale: 1 },
        exit: (d) => ({
          opacity: 0,
          x: d >= 0 ? -slideOffset : slideOffset,
          scale: 0.985,
        }),
      }}
      initial="enter"
      animate="center"
      exit="exit"
      transition={carouselImage}
      style={
        reduced
          ? undefined
          : {
              rotateX,
              rotateY,
              transformPerspective: 1200,
            }
      }
    >
      <ProjectCoverMedia
        project={project}
        alt={`${project.title} preview`}
        contain={isContainedCover(project.slug)}
        hoverScale={false}
      />
    </motion.div>
  )
}

export default function SelectedWorkCarousel({ projects }) {
  const sorted = [...projects].sort((a, b) => a.order - b.order)
  const total = sorted.length
  const prefersReducedMotion = useReducedMotion()
  const reduced = Boolean(prefersReducedMotion)

  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const stageRef = useRef(null)
  const dragX = useMotionValue(0)

  const active = sorted[index]
  const prevProject = sorted[wrapIndex(index - 1, total)]
  const nextProject = sorted[wrapIndex(index + 1, total)]

  const paginate = useCallback(
    (delta) => {
      if (total <= 1) return
      setDirection(delta)
      setIndex((current) => wrapIndex(current + delta, total))
    },
    [total]
  )

  const onDragEnd = useCallback(
    (_, info) => {
      const { offset, velocity } = info
      const swipe =
        offset.x < -DRAG_OFFSET_THRESHOLD ||
        velocity.x < -DRAG_VELOCITY_THRESHOLD
          ? 1
          : offset.x > DRAG_OFFSET_THRESHOLD ||
              velocity.x > DRAG_VELOCITY_THRESHOLD
            ? -1
            : 0
      if (swipe !== 0) paginate(swipe)
      dragX.set(0)
    },
    [dragX, paginate]
  )

  useEffect(() => {
    const node = stageRef.current
    if (!node) return undefined

    const onKeyDown = (event) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        paginate(-1)
      } else if (event.key === 'ArrowRight') {
        event.preventDefault()
        paginate(1)
      }
    }

    node.addEventListener('keydown', onKeyDown)
    return () => node.removeEventListener('keydown', onKeyDown)
  }, [paginate])

  if (!active) return null

  const sentence = active.tagline || active.summary

  return (
    <section
      className="work-carousel"
      aria-roledescription="carousel"
      aria-label="Selected work projects"
      ref={stageRef}
      tabIndex={0}
    >
      <motion.div
        className="work-carousel__tone"
        aria-hidden="true"
        animate={{ backgroundColor: mixAccent(active.accent) }}
        transition={carouselBg}
      />

      <div className="work-carousel__toolbar">
        <CarouselCounter index={index} total={total} reduced={reduced} />
        <div className="work-carousel__nav">
          <NavButton
            direction="prev"
            onClick={() => paginate(-1)}
            label="Previous project"
          />
          <NavButton
            direction="next"
            onClick={() => paginate(1)}
            label="Next project"
          />
        </div>
      </div>

      <div className="work-carousel__stage">
        <PeekPreview
          project={prevProject}
          direction="prev"
          onClick={() => paginate(-1)}
          reduced={reduced}
        />

        <div className="work-carousel__slide-shell">
          <motion.div
            className="work-carousel__slide"
            drag={reduced || total <= 1 ? false : 'x'}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.08}
            style={{ x: dragX }}
            onDragEnd={onDragEnd}
          >
            <div className="work-carousel__image-wrap">
              <AnimatePresence mode="wait" custom={direction} initial={false}>
                <ActiveImage
                  key={active.slug}
                  project={active}
                  direction={direction}
                  reduced={reduced}
                />
              </AnimatePresence>
            </div>

            <div className="work-carousel__title-mask" aria-hidden={false}>
              <AnimatePresence mode="wait" custom={direction} initial={false}>
                <motion.h3
                  key={`title-${active.slug}`}
                  className="type-display type-display-xl work-carousel__title"
                  custom={direction}
                  variants={{
                    enter: (d) => ({
                      y: d >= 0 ? '108%' : '-108%',
                      opacity: 0,
                    }),
                    center: { y: 0, opacity: 1 },
                    exit: (d) => ({
                      y: d >= 0 ? '-108%' : '108%',
                      opacity: 0,
                    }),
                  }}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={carouselTitle}
                >
                  {active.title}
                </motion.h3>
              </AnimatePresence>
            </div>

            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={`copy-${active.slug}`}
                className="work-carousel__copy"
                initial={{ opacity: 0, y: reduced ? 0 : 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: reduced ? 0 : -6 }}
                transition={carouselMeta}
              >
                {sentence && <p className="type-body work-carousel__description">{sentence}</p>}
                <div className="work-carousel__footer">
                  <p className="type-meta">{projectMeta(active)}</p>
                  <Link
                    to={`/projects/${active.slug}`}
                    className="work-carousel__cta type-meta"
                  >
                    View project →
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

        <PeekPreview
          project={nextProject}
          direction="next"
          onClick={() => paginate(1)}
          reduced={reduced}
        />
      </div>
    </section>
  )
}
