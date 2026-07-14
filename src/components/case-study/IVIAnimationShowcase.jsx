import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { EASE_OUT, STAGGER, VIEWPORT, reveal } from '../../motion/caseStudyMotion'

const DEFAULT_ASPECT = '1366 / 1024'

function ScreenFrame({ frame, accent, reduced, animate = true }) {
  const aspect = frame.aspect || DEFAULT_ASPECT

  return (
    <div className="relative min-w-0 overflow-hidden rounded-2xl bg-black ring-1 ring-white/10">
      <div
        className="relative w-full transition-[aspect-ratio] duration-500 ease-out"
        style={{ aspectRatio: aspect }}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={frame.src}
            src={frame.src}
            alt={frame.alt || frame.label || 'IVI screen'}
            initial={reduced || !animate ? false : { opacity: 0, scale: 1.01 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reduced || !animate ? undefined : { opacity: 0, scale: 0.995 }}
            transition={{ duration: reduced ? 0 : 0.55, ease: EASE_OUT }}
            className="absolute inset-0 h-full w-full object-contain object-top"
          />
        </AnimatePresence>

        {frame.pulse && !reduced && (
          <motion.div
            className="pointer-events-none absolute inset-0 rounded-2xl"
            style={{ boxShadow: `inset 0 0 0 2px ${accent}` }}
            animate={{ opacity: [0.15, 0.55, 0.15] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}

        {frame.pulse && frame.alertLabel && (
          <motion.div
            className="pointer-events-none absolute left-[8%] top-[10%] rounded-md px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm"
            style={{ backgroundColor: `${accent}cc` }}
            initial={reduced ? false : { opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: EASE_OUT }}
          >
            {frame.alertLabel}
          </motion.div>
        )}

        {frame.voicePulse && !reduced && (
          <motion.div
            className="pointer-events-none absolute left-[2.3%] top-[2.5%] flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-white/10 text-[10px] font-semibold uppercase tracking-wider text-ink backdrop-blur-sm"
            animate={{ scale: [1, 1.08, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            AI
          </motion.div>
        )}
      </div>
    </div>
  )
}

function SplitView({ screen, reduced }) {
  return (
    <div className="grid min-w-0 gap-3 md:grid-cols-2">
      {[
        { label: 'Driver display', src: screen.driver, alt: screen.driverAlt },
        { label: 'Center display', src: screen.center, alt: screen.centerAlt },
      ].map((pane, i) => (
        <motion.div
          key={pane.label}
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.44, delay: i * STAGGER.base, ease: EASE_OUT }}
        >
          <p className="text-label mb-2">{pane.label}</p>
          <div className="overflow-hidden rounded-2xl bg-black ring-1 ring-white/10">
            <img
              src={pane.src}
              alt={pane.alt}
              className="block h-auto w-full object-contain"
              loading="lazy"
            />
          </div>
        </motion.div>
      ))}
    </div>
  )
}

function WalkthroughViewport({ frames, interval, accent, reduced }) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (reduced || frames.length <= 1) return undefined
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % frames.length)
    }, interval)
    return () => clearInterval(timer)
  }, [frames.length, interval, reduced])

  const frame = frames[index]

  return (
    <div className="min-w-0 space-y-3">
      <ScreenFrame frame={frame} accent={accent} reduced={reduced} />
      <div className="flex flex-wrap items-center gap-2">
        {frames.map((item, i) => (
          <button
            key={`${item.src}-${i}`}
            type="button"
            onClick={() => setIndex(i)}
            className={`rounded-full px-2.5 py-1 text-[11px] transition ${
              i === index
                ? 'bg-surface text-ink'
                : 'text-ink-muted hover:text-ink-secondary'
            }`}
            style={i === index ? { boxShadow: `inset 0 0 0 1px ${accent}66` } : undefined}
            aria-current={i === index ? 'true' : undefined}
          >
            {item.label || `Step ${i + 1}`}
          </button>
        ))}
      </div>
    </div>
  )
}

export default function IVIAnimationShowcase({
  walkthrough,
  screens = [],
  demos,
  accent = '#981E32',
}) {
  // Legacy fallback: convert demos array into walkthrough + screens if needed
  const resolvedWalkthrough =
    walkthrough ||
    (demos?.length
      ? {
          title: 'Full walkthrough',
          description: 'Auto-playing pass across all prototype states.',
          interval: 3200,
          frames: demos.flatMap((demo) => {
            if (demo.type === 'split') return []
            const list = demo.frames || (demo.frame ? [demo.frame] : [])
            return list.map((src, i) => ({
              src,
              label: demo.title,
              alt: demo.alt,
              aspect: demo.aspect,
              pulse: i === list.length - 1 ? demo.pulse : false,
              alertLabel: demo.alertLabel,
              voicePulse: i === 0 ? demo.voicePulse : false,
            }))
          }),
        }
      : null)

  const resolvedScreens =
    screens.length > 0
      ? screens
      : (demos || [])
          .filter((demo) => demo.type !== 'split')
          .map((demo) => ({
            id: demo.id,
            title: demo.title,
            description: demo.description,
            src: demo.frame || demo.frames?.[demo.frames.length - 1],
            alt: demo.alt,
            aspect: demo.aspect,
            pulse: demo.pulse,
            alertLabel: demo.alertLabel,
            voicePulse: demo.voicePulse,
          }))
          .concat(
            (demos || [])
              .filter((demo) => demo.type === 'split')
              .map((demo) => ({
                id: demo.id,
                title: demo.title,
                description: demo.description,
                type: 'split',
                driver: demo.driver,
                driverAlt: demo.driverAlt,
                center: demo.center,
                centerAlt: demo.centerAlt,
              })),
          )

  const tabs = [
    resolvedWalkthrough
      ? { id: 'walkthrough', kind: 'walkthrough', title: resolvedWalkthrough.title || 'Full demo' }
      : null,
    ...resolvedScreens.map((screen) => ({
      id: screen.id,
      kind: 'screen',
      title: screen.title,
    })),
  ].filter(Boolean)

  const [activeId, setActiveId] = useState(tabs[0]?.id || '')
  const prefersReducedMotion = useReducedMotion()
  const reduced = Boolean(prefersReducedMotion)
  const activeScreen = resolvedScreens.find((screen) => screen.id === activeId)
  const isWalkthrough = activeId === 'walkthrough'

  return (
    <motion.div className="min-w-0 space-y-4" {...(reduced ? {} : reveal(0))}>
      <div className="flex flex-wrap gap-2">
        {tabs.map((tab, i) => (
          <motion.button
            key={tab.id}
            type="button"
            onClick={() => setActiveId(tab.id)}
            className={`rounded-sm border px-3 py-1.5 text-xs font-medium transition ${
              activeId === tab.id
                ? 'bg-surface text-ink'
                : 'border-line bg-transparent text-ink-secondary hover:border-ink/20 hover:text-ink'
            }`}
            style={activeId === tab.id ? { borderColor: `${accent}66` } : undefined}
            initial={reduced ? false : { opacity: 0, y: 8 }}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.32, delay: Math.min(i * 0.03, 0.24), ease: EASE_OUT }}
            whileTap={reduced ? undefined : { scale: 0.97 }}
          >
            {tab.title}
          </motion.button>
        ))}
      </div>

      <div className="overflow-hidden rounded-2xl border border-line bg-base p-4 md:p-5">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeId}
            initial={reduced ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: -6 }}
            transition={{ duration: 0.36, ease: EASE_OUT }}
          >
            <div className="mb-4 flex flex-col gap-1 md:flex-row md:items-end md:justify-between">
              <div>
                <h3 className="font-display text-lg text-ink">
                  {isWalkthrough ? resolvedWalkthrough.title : activeScreen?.title}
                </h3>
                {(isWalkthrough
                  ? resolvedWalkthrough.description
                  : activeScreen?.description) && (
                  <p className="mt-1 max-w-2xl text-sm text-ink-secondary">
                    {isWalkthrough
                      ? resolvedWalkthrough.description
                      : activeScreen.description}
                  </p>
                )}
              </div>
              <p className="text-label">
                {reduced
                  ? 'Static view'
                  : isWalkthrough
                    ? 'Auto-playing full demo'
                    : 'Single screen'}
              </p>
            </div>

            {isWalkthrough ? (
              <WalkthroughViewport
                frames={resolvedWalkthrough.frames}
                interval={resolvedWalkthrough.interval || 3200}
                accent={accent}
                reduced={reduced}
              />
            ) : activeScreen?.type === 'split' ? (
              <SplitView screen={activeScreen} reduced={reduced} />
            ) : (
              <ScreenFrame
                frame={activeScreen}
                accent={accent}
                reduced={reduced}
                animate={false}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
