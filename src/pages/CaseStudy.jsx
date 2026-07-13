import { useEffect, useState } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import PageMeta from '../components/PageMeta'
import CaseStudySection from '../components/CaseStudySection'
import CaseStudyNav from '../components/CaseStudyNav'
import Tag from '../components/Tag'
import Button from '../components/Button'
import ExternalLink from '../components/ExternalLink'
import BackToTop from '../components/BackToTop'
import ProjectSnapshot from '../components/case-study/ProjectSnapshot'
import StillHereCover from '../components/StillHereCover'
import { getProjectBySlug, getAdjacentProjects } from '../data/projects'
import { EASE_OUT, fadeInUp, STAGGER } from '../motion/caseStudyMotion'

const MOOD_CLASS = {
  'zingerman-deli': 'case-study--commerce',
  'stellantis-ivi': 'case-study--automotive',
  'still-here': 'case-study--healthcare',
}

export default function CaseStudy() {
  const { slug } = useParams()
  const project = getProjectBySlug(slug)
  const { prev, next } = getAdjacentProjects(slug)
  const [progress, setProgress] = useState(0)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement
      const height = el.scrollHeight - el.clientHeight
      setProgress(height > 0 ? (el.scrollTop / height) * 100 : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [slug])

  if (!project) return <Navigate to="/projects" replace />

  const accent = project.accent || 'var(--color-accent-warm)'
  const moodClass = MOOD_CLASS[project.slug] || ''
  const isAutomotive = project.slug === 'stellantis-ivi'
  const isCommerce = project.slug === 'zingerman-deli'
  const isHealthcare = project.slug === 'still-here'
  const isPresentationCover =
    project.slug === 'stellantis-ivi' || project.slug === 'surveys-of-consumers'
  const motionOn =
    !prefersReducedMotion &&
    (project.slug === 'surveys-of-consumers' ||
      project.slug === 'stellantis-ivi' ||
      project.slug === 'zingerman-deli' ||
      project.slug === 'still-here')

  return (
    <div className={moodClass} style={{ '--project-accent': accent }}>
      <PageMeta title={`${project.title} — Hazel Jiang`} description={project.summary} />

      <div
        className="fixed left-0 top-14 z-40 h-px transition-all duration-150"
        style={{ width: `${progress}%`, backgroundColor: accent }}
        aria-hidden="true"
      />

      <section
        className={`border-b border-line ${
          isAutomotive ? 'bg-[#0a0a0a]' : isCommerce ? 'bg-[#12110f]' : isHealthcare ? 'bg-[#0c1018]' : ''
        }`}
      >
        <div className="mx-auto max-w-7xl px-6 pb-14 pt-28 md:pt-32">
          <Link
            to="/projects"
            className="text-sm text-ink-muted transition hover:text-ink"
          >
            ← All projects
          </Link>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-end">
            <div>
              <motion.p
                className="text-meta mb-4"
                {...(motionOn ? fadeInUp(0) : {})}
              >
                {project.type}
              </motion.p>

              <motion.h1
                className="font-display max-w-2xl text-[clamp(2rem,5vw,3.5rem)] leading-[1.05] tracking-[-0.02em] text-ink"
                {...(motionOn ? fadeInUp(STAGGER.tight) : {})}
              >
                {project.title}
              </motion.h1>

              <motion.p
                className="mt-4 max-w-lg text-lg leading-snug text-ink-secondary"
                {...(motionOn ? fadeInUp(STAGGER.base) : {})}
              >
                {project.subtitle}
              </motion.p>

              <motion.div
                className="mt-5 flex flex-wrap gap-2"
                {...(motionOn ? fadeInUp(STAGGER.loose) : {})}
              >
                {project.categories.map((cat) => (
                  <Tag key={cat} accent={project.accent}>
                    {cat}
                  </Tag>
                ))}
              </motion.div>

              {(project.prototypeUrl || project.figmaUrl || project.uxfolioUrl) && (
                <motion.div
                  className="mt-8 flex flex-wrap items-center gap-4"
                  {...(motionOn ? fadeInUp(0.14) : {})}
                >
                  {project.prototypeUrl && (
                    <Button href={project.prototypeUrl} variant="primary">
                      View prototype
                    </Button>
                  )}
                  {project.figmaUrl && (
                    <ExternalLink href={project.figmaUrl} accent={accent}>
                      Figma file
                    </ExternalLink>
                  )}
                  {project.uxfolioUrl && (
                    <ExternalLink href={project.uxfolioUrl} accent={accent}>
                      UXfolio case study
                    </ExternalLink>
                  )}
                </motion.div>
              )}
            </div>

            <motion.div
              className={`relative overflow-hidden rounded-2xl ${
                isAutomotive
                  ? 'bg-black ring-1 ring-white/10'
                  : isPresentationCover && !isAutomotive
                    ? 'bg-[#00274c] ring-1 ring-white/10'
                    : isCommerce
                      ? 'bg-[#f5f0e8] ring-1 ring-black/5'
                      : isHealthcare
                        ? 'bg-[#05071a] ring-1 ring-white/10'
                      : 'bg-surface ring-1 ring-line'
              } ${isHealthcare ? 'aspect-[4/3] md:aspect-[16/11]' : ''}`}
              initial={motionOn ? { opacity: 0, y: 16, scale: 0.985 } : false}
              animate={motionOn ? { opacity: 1, y: 0, scale: 1 } : undefined}
              transition={{ duration: 0.55, delay: 0.12, ease: EASE_OUT }}
            >
              {isHealthcare ? (
                <StillHereCover />
              ) : (
              <img
                src={project.heroImage}
                alt={`${project.title} hero preview`}
                className={`block h-auto w-full ${
                  isCommerce || isPresentationCover
                    ? 'object-contain object-center'
                    : 'object-cover object-top'
                } ${isCommerce ? 'p-2' : ''}`}
              />
              )}
            </motion.div>
          </div>

          <dl className="mt-12 grid grid-cols-2 gap-x-8 gap-y-5 border-t border-line pt-8 sm:grid-cols-4">
            {[
              { label: 'Role', value: project.role },
              { label: 'Timeline', value: project.timeline },
              { label: 'Type', value: project.type },
              { label: 'Tools', value: project.tools.join(', ') },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                {...(motionOn ? fadeInUp(0.18 + i * STAGGER.tight) : {})}
              >
                <dt className="text-label">{item.label}</dt>
                <dd className="mt-1.5 break-words text-sm text-ink">{item.value}</dd>
              </motion.div>
            ))}
          </dl>

          {project.team && (
            <motion.p
              className="mt-5 text-sm text-ink-muted"
              {...(motionOn ? fadeInUp(0.36) : {})}
            >
              <span className="text-ink-secondary">Team · </span>
              {project.team.join(', ')}
            </motion.p>
          )}
        </div>
      </section>

      {project.snapshot && (
        <section className="border-b border-line px-6 py-10">
          <motion.div
            className="mx-auto max-w-7xl"
            {...(motionOn
              ? {
                  initial: { opacity: 0, y: 16 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true, amount: 0.2 },
                  transition: { duration: 0.42, ease: EASE_OUT },
                }
              : {})}
          >
            <ProjectSnapshot snapshot={project.snapshot} accent={accent} />
          </motion.div>
        </section>
      )}

      {project.overview && (
        <section className="border-b border-line px-6 py-10">
          <motion.div
            className="mx-auto max-w-7xl"
            {...(motionOn
              ? {
                  initial: { opacity: 0, y: 16 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true, amount: 0.25 },
                  transition: { duration: 0.42, ease: EASE_OUT },
                }
              : {})}
          >
            <p className="text-chapter mb-4">Overview</p>
            <p className="prose-editorial max-w-2xl">{project.overview}</p>
          </motion.div>
        </section>
      )}

      <section className="overflow-x-clip px-6 py-14 md:py-16">
        <div
          className={`mx-auto grid max-w-7xl min-w-0 gap-12 ${
            isCommerce
              ? 'xl:grid-cols-[11rem_minmax(0,1fr)]'
              : 'lg:grid-cols-[11rem_minmax(0,1fr)]'
          }`}
        >
          <aside
            className={`lg:sticky lg:top-20 lg:self-start ${
              isCommerce ? 'hidden xl:block' : 'hidden lg:block'
            }`}
          >
            <CaseStudyNav
              sections={project.sections}
              accent={accent}
            />
          </aside>

          <div className="min-w-0 space-y-20 md:space-y-24">
            <CaseStudyNav
              variant="mobile"
              sections={project.sections}
              accent={accent}
            />
            {project.sections.map((section, i) => (
              <CaseStudySection
                key={section.id}
                section={section}
                index={i}
                accent={accent}
                mood={project.slug}
              />
            ))}

          </div>
        </div>
      </section>

      <section className="border-t border-line px-6 py-12">
        <div className="mx-auto grid max-w-7xl gap-px bg-line sm:grid-cols-2">
          {prev ? (
            <Link
              to={`/projects/${prev.slug}`}
              className="group bg-base p-6 transition hover:bg-surface/40 md:p-8"
            >
              <p className="text-label">Previous</p>
              <p className="mt-3 font-display text-xl text-ink transition group-hover:text-ink-secondary">
                ← {prev.title}
              </p>
            </Link>
          ) : (
            <div className="hidden bg-base sm:block" />
          )}

          {next && (
            <Link
              to={`/projects/${next.slug}`}
              className="group bg-base p-6 text-right transition hover:bg-surface/40 md:p-8 sm:col-start-2"
            >
              <p className="text-label">Next</p>
              <p className="mt-3 font-display text-xl text-ink transition group-hover:text-ink-secondary">
                {next.title} →
              </p>
            </Link>
          )}
        </div>
      </section>

      <BackToTop />
    </div>
  )
}
