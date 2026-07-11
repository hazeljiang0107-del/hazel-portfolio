import { useMemo, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import IPhoneMockup from './IPhoneMockup'
import { EASE_OUT, reveal } from '../../motion/caseStudyMotion'

function flattenScreens(groups, screens) {
  if (groups?.length) {
    return groups.flatMap((group) =>
      group.screens.map((screen) => ({ ...screen, workflow: group.title, workflowId: group.id }))
    )
  }
  return screens ?? []
}

export default function StillHerePhoneShowcase({ screens, groups, accent }) {
  const workflowGroups = useMemo(() => {
    if (groups?.length) return groups
    if (screens?.length) {
      return [{ id: 'app', title: 'App experience', screens }]
    }
    return []
  }, [groups, screens])

  const allScreens = useMemo(
    () => flattenScreens(workflowGroups),
    [workflowGroups]
  )

  const [activeGroup, setActiveGroup] = useState(0)
  const [activeScreen, setActiveScreen] = useState(0)
  const prefersReducedMotion = useReducedMotion()

  const currentGroup = workflowGroups[activeGroup]
  const current = currentGroup?.screens[activeScreen] ?? allScreens[0]

  const selectGroup = (groupIndex) => {
    setActiveGroup(groupIndex)
    setActiveScreen(0)
  }

  if (!current) return null

  return (
    <div className="still-here-showcase min-w-0 space-y-12">
      {workflowGroups.length > 1 && (
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="App workflows">
          {workflowGroups.map((group, i) => {
            const selected = i === activeGroup
            return (
              <button
                key={group.id}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => selectGroup(i)}
                className={`rounded-full border px-3 py-1.5 text-xs transition ${
                  selected
                    ? 'border-transparent'
                    : 'border-line text-ink-muted hover:border-ink-muted hover:text-ink-secondary'
                }`}
                style={
                  selected
                    ? { backgroundColor: `${accent}22`, color: accent }
                    : undefined
                }
              >
                {group.title}
              </button>
            )
          })}
        </div>
      )}

      <div className="grid min-w-0 items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-14">
        <div className="still-here-showcase__stage relative flex min-h-[340px] items-center justify-center">
          <div
            className="still-here-showcase__glow pointer-events-none absolute inset-0 rounded-full opacity-60 blur-3xl"
            style={{ background: `radial-gradient(circle, ${accent}33 0%, transparent 70%)` }}
            aria-hidden="true"
          />
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              className="relative z-10"
              initial={prefersReducedMotion ? false : { opacity: 0, x: 24, scale: 0.98 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={prefersReducedMotion ? undefined : { opacity: 0, x: -24, scale: 0.98 }}
              transition={{ duration: 0.45, ease: EASE_OUT }}
            >
              <IPhoneMockup
                src={current.src}
                alt={current.alt}
                size="lg"
                tilt={activeScreen % 2 === 0 ? -4 : 4}
                float
                priority={activeGroup === 0 && activeScreen === 0}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        <motion.div className="min-w-0" {...(prefersReducedMotion ? {} : reveal(0.08))}>
          <p className="text-label" style={{ color: accent }}>
            {currentGroup.title}
          </p>
          <h3 className="mt-2 font-display text-2xl text-ink md:text-3xl">{current.title}</h3>
          <p className="mt-4 text-sm leading-relaxed text-ink-secondary">{current.description}</p>
          {current.features?.length > 0 && (
            <ul className="mt-6 space-y-2">
              {current.features.map((feature) => (
                <li
                  key={feature}
                  className="flex gap-2 text-sm leading-relaxed text-ink-secondary"
                >
                  <span
                    className="mt-2 h-1 w-1 shrink-0 rounded-full"
                    style={{ backgroundColor: accent }}
                    aria-hidden="true"
                  />
                  {feature}
                </li>
              ))}
            </ul>
          )}

          <div
            className="mt-8 flex flex-wrap gap-2"
            role="tablist"
            aria-label={`${currentGroup.title} screens`}
          >
            {currentGroup.screens.map((screen, i) => {
              const selected = i === activeScreen
              return (
                <button
                  key={screen.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setActiveScreen(i)}
                  className={`rounded-full border px-3 py-1.5 text-xs transition ${
                    selected
                      ? 'border-transparent'
                      : 'border-line text-ink-muted hover:border-ink-muted hover:text-ink-secondary'
                  }`}
                  style={
                    selected
                      ? { backgroundColor: `${accent}18`, color: accent }
                      : undefined
                  }
                >
                  {screen.shortLabel || screen.title}
                </button>
              )
            })}
          </div>
        </motion.div>
      </div>

      <div className="min-w-0">
        <p className="text-label mb-4" style={{ color: accent }}>
          Full {currentGroup.title.toLowerCase()}
        </p>
        <div className="flex w-full max-w-full gap-5 overflow-x-auto overscroll-x-contain pb-2 [-webkit-overflow-scrolling:touch]">
          {currentGroup.screens.map((screen, i) => (
            <motion.button
              key={`${screen.id}-rail`}
              type="button"
              onClick={() => setActiveScreen(i)}
              className={`w-[min(180px,calc(100vw-4rem))] shrink-0 text-left transition ${
                i === activeScreen ? 'opacity-100' : 'opacity-70 hover:opacity-90'
              }`}
              {...(prefersReducedMotion ? {} : reveal(Math.min(i * 0.04, 0.2)))}
            >
              <IPhoneMockup
                src={screen.src}
                alt={screen.alt}
                size="sm"
                tilt={i % 2 === 0 ? -2 : 2}
              />
              <p className="mt-3 text-xs font-medium text-ink">{screen.shortLabel || screen.title}</p>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  )
}
