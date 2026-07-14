import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { EASE_OUT, VIEWPORT, reveal } from '../../motion/caseStudyMotion'
import IPhoneMockup from './IPhoneMockup'

function DesktopChrome({ children, url = 'zingermansdeli.com' }) {
  return (
    <div className="max-w-full overflow-hidden rounded-2xl bg-[#1c1c1c] ring-1 ring-black/20">
      <div className="flex items-center gap-3 border-b border-white/10 px-3 py-2">
        <div className="flex shrink-0 gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </div>
        <div className="min-w-0 flex-1 truncate rounded-md bg-white/10 px-3 py-1 text-center text-[11px] text-white/70">
          {url}
        </div>
      </div>
      <div className="bg-[#f5f0e8]">{children}</div>
    </div>
  )
}

function DesktopFrame({ src, alt, reduced, url }) {
  return (
    <DesktopChrome url={url}>
      <AnimatePresence mode="wait">
        <motion.img
          key={src}
          src={src}
          alt={alt}
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduced ? undefined : { opacity: 0 }}
          transition={{ duration: reduced ? 0 : 0.4, ease: EASE_OUT }}
          className="block h-auto w-full object-contain object-top"
        />
      </AnimatePresence>
    </DesktopChrome>
  )
}

export default function CommercePrototypeShowcase({
  walkthrough,
  screens = [],
  accent = 'var(--color-accent-warm)',
  desktopUrl = 'zingermansdeli.com',
}) {
  const prefersReducedMotion = useReducedMotion()
  const reduced = Boolean(prefersReducedMotion)
  const tabs = [
    walkthrough
      ? { id: 'walkthrough', title: walkthrough.title || 'Full demo' }
      : null,
    ...screens.map((screen) => ({ id: screen.id, title: screen.title })),
  ].filter(Boolean)

  const [activeId, setActiveId] = useState(tabs[0]?.id || '')
  const [frameIndex, setFrameIndex] = useState(0)
  const isWalkthrough = activeId === 'walkthrough'
  const activeScreen = screens.find((screen) => screen.id === activeId)
  const frames = walkthrough?.frames || []
  const interval = walkthrough?.interval || 3200
  const hasMobileWalkthrough = frames.some((frame) => frame.mobileSrc)

  useEffect(() => {
    setFrameIndex(0)
  }, [activeId])

  useEffect(() => {
    if (!isWalkthrough || reduced || frames.length <= 1) return undefined
    const timer = setInterval(() => {
      setFrameIndex((i) => (i + 1) % frames.length)
    }, interval)
    return () => clearInterval(timer)
  }, [isWalkthrough, reduced, frames.length, interval])

  const currentFrame = frames[frameIndex]

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
                  {isWalkthrough
                    ? walkthrough.title || 'Full demo'
                    : activeScreen?.title}
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-ink-secondary">
                  {isWalkthrough
                    ? walkthrough.description
                    : activeScreen?.description}
                </p>
              </div>
              <p className="text-label">
                {reduced
                  ? 'Static view'
                  : isWalkthrough
                    ? hasMobileWalkthrough
                      ? 'Auto-playing desktop + mobile'
                      : 'Auto-playing full demo'
                    : 'Desktop + mobile'}
              </p>
            </div>

            {isWalkthrough ? (
              <div className="min-w-0 space-y-3">
                <div
                  className={`grid min-w-0 items-start gap-6 ${
                    hasMobileWalkthrough
                      ? 'lg:grid-cols-[minmax(0,1fr)_minmax(0,240px)]'
                      : ''
                  }`}
                >
                  <div className="min-w-0">
                    {hasMobileWalkthrough && (
                      <p className="text-label mb-2">Desktop</p>
                    )}
                    <DesktopFrame
                      src={currentFrame.src}
                      alt={currentFrame.alt || currentFrame.label}
                      reduced={reduced}
                      url={desktopUrl}
                    />
                  </div>
                  {hasMobileWalkthrough && currentFrame.mobileSrc && (
                    <div className="min-w-0">
                      <p className="text-label mb-2">Mobile · scroll inside phone</p>
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={currentFrame.mobileSrc}
                          initial={reduced ? false : { opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={reduced ? undefined : { opacity: 0 }}
                          transition={{ duration: reduced ? 0 : 0.35, ease: EASE_OUT }}
                        >
                          <IPhoneMockup
                            src={currentFrame.mobileSrc}
                            alt={
                              currentFrame.mobileAlt ||
                              `${currentFrame.label} mobile`
                            }
                            size="lg"
                            scrollable
                            priority
                          />
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  )}
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {frames.map((frame, i) => (
                    <button
                      key={`${frame.src}-${i}`}
                      type="button"
                      onClick={() => setFrameIndex(i)}
                      className={`rounded-full px-2.5 py-1 text-[11px] transition ${
                        i === frameIndex
                          ? 'bg-surface text-ink'
                          : 'text-ink-muted hover:text-ink-secondary'
                      }`}
                      style={
                        i === frameIndex
                          ? { boxShadow: `inset 0 0 0 1px ${accent}66` }
                          : undefined
                      }
                      aria-current={i === frameIndex ? 'true' : undefined}
                    >
                      {frame.label || `Step ${i + 1}`}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="grid min-w-0 items-start gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,240px)]">
                <div className="min-w-0">
                  <p className="text-label mb-2">Desktop</p>
                  <DesktopChrome url={desktopUrl}>
                    <img
                      src={activeScreen.desktop.src}
                      alt={activeScreen.desktop.alt}
                      className="block h-auto w-full object-contain object-top"
                    />
                  </DesktopChrome>
                </div>
                <div className="min-w-0">
                  <p className="text-label mb-2">Mobile · scroll inside phone</p>
                  <IPhoneMockup
                    key={activeScreen.mobile.src}
                    src={activeScreen.mobile.src}
                    alt={activeScreen.mobile.alt}
                    size="lg"
                    scrollable
                  />
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
