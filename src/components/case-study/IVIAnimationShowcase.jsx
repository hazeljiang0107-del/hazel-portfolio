import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { EASE_OUT, STAGGER, VIEWPORT, reveal } from '../../motion/caseStudyMotion'

function DemoViewport({ demo, accent, reduced }) {
  const [frameIndex, setFrameIndex] = useState(0)
  const frames = demo.frames || (demo.frame ? [demo.frame] : [])
  const interval = demo.interval || 2800

  useEffect(() => {
    if (reduced || frames.length <= 1) return undefined
    const timer = setInterval(() => {
      setFrameIndex((i) => (i + 1) % frames.length)
    }, interval)
    return () => clearInterval(timer)
  }, [frames.length, interval, reduced])

  useEffect(() => {
    setFrameIndex(0)
  }, [demo.id])

  const current = frames[frameIndex] || frames[0]

  return (
    <div className="relative min-w-0 overflow-hidden rounded-2xl bg-black ring-1 ring-white/10">
      <div className="relative aspect-[1366/1024] w-full">
        <AnimatePresence mode="wait">
          <motion.img
            key={current}
            src={current}
            alt={demo.alt || demo.title}
            initial={reduced ? false : { opacity: 0, scale: 1.01 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reduced ? undefined : { opacity: 0, scale: 0.995 }}
            transition={{ duration: reduced ? 0 : 0.55, ease: EASE_OUT }}
            className="absolute inset-0 h-full w-full object-contain object-top"
          />
        </AnimatePresence>

        {demo.pulse && !reduced && (
          <motion.div
            className="pointer-events-none absolute inset-0 rounded-2xl"
            style={{ boxShadow: `inset 0 0 0 2px ${accent}` }}
            animate={{ opacity: [0.15, 0.55, 0.15] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}

        {demo.pulse && (
          <motion.div
            className="pointer-events-none absolute left-[8%] top-[10%] rounded-md px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm"
            style={{ backgroundColor: `${accent}cc` }}
            initial={reduced ? false : { opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: EASE_OUT }}
          >
            {demo.alertLabel || 'Alert'}
          </motion.div>
        )}

        {demo.voicePulse && !reduced && (
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

function SplitDemo({ demo, reduced }) {
  return (
    <div className="grid min-w-0 gap-3 md:grid-cols-2">
      {[
        { label: 'Driver display', src: demo.driver, alt: demo.driverAlt },
        { label: 'Center display', src: demo.center, alt: demo.centerAlt },
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

export default function IVIAnimationShowcase({ demos, accent = '#981E32' }) {
  const [active, setActive] = useState(0)
  const demo = demos[active]
  const prefersReducedMotion = useReducedMotion()
  const reduced = Boolean(prefersReducedMotion)

  return (
    <motion.div className="min-w-0 space-y-4" {...(reduced ? {} : reveal(0))}>
      <div className="flex flex-wrap gap-2">
        {demos.map((item, i) => (
          <motion.button
            key={item.id}
            type="button"
            onClick={() => setActive(i)}
            className={`rounded-sm border px-3 py-1.5 text-xs font-medium transition ${
              i === active
                ? 'bg-surface text-ink'
                : 'border-line bg-transparent text-ink-secondary hover:border-ink/20 hover:text-ink'
            }`}
            style={i === active ? { borderColor: `${accent}66` } : undefined}
            initial={reduced ? false : { opacity: 0, y: 8 }}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.32, delay: Math.min(i * 0.03, 0.24), ease: EASE_OUT }}
            whileTap={reduced ? undefined : { scale: 0.97 }}
          >
            {item.title}
          </motion.button>
        ))}
      </div>

      <div className="overflow-hidden rounded-2xl border border-line bg-base p-4 md:p-5">
        <AnimatePresence mode="wait">
          <motion.div
            key={demo.id}
            initial={reduced ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: -6 }}
            transition={{ duration: 0.36, ease: EASE_OUT }}
          >
            <div className="mb-4 flex flex-col gap-1 md:flex-row md:items-end md:justify-between">
              <div>
                <h3 className="font-display text-lg text-ink">{demo.title}</h3>
                {demo.description && (
                  <p className="mt-1 max-w-2xl text-sm text-ink-secondary">{demo.description}</p>
                )}
              </div>
              <p className="text-label">{reduced ? 'Static demo' : 'Auto-playing demo'}</p>
            </div>

            {demo.type === 'split' ? (
              <SplitDemo demo={demo} reduced={reduced} />
            ) : (
              <DemoViewport demo={demo} accent={accent} reduced={reduced} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
