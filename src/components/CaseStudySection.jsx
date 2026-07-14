import { motion, useReducedMotion } from 'framer-motion'
import CaseStudyModules from './case-study/CaseStudyModules'
import { reveal, STAGGER } from '../motion/caseStudyMotion'

export default function CaseStudySection({ section, index, accent, mood }) {
  const hasText = section.content?.length > 0 || section.bullets?.length > 0
  const chapter = String(index + 1).padStart(2, '0')
  const prefersReducedMotion = useReducedMotion()
  const motionOn = !prefersReducedMotion

  return (
    <section id={section.id} className="scroll-mt-24 min-w-0">
      <motion.header
        className={`mb-8 pb-6 ${
          mood === 'echoes-you-can-touch' ? '' : 'border-b border-line'
        }`}
        {...(motionOn ? reveal(0) : {})}
      >
        <p className="text-chapter mb-2">{chapter}</p>
        <h2 className="font-display text-[clamp(1.5rem,3vw,2.25rem)] leading-[1.1] tracking-[-0.02em] text-ink">
          {section.title}
        </h2>
      </motion.header>

      {hasText && (
        <div className="mb-8 space-y-4">
          {section.content?.map((paragraph, i) => (
            <motion.p
              key={i}
              className="prose-editorial max-w-2xl text-base"
              {...(motionOn ? reveal(Math.min(i * STAGGER.tight, 0.16)) : {})}
            >
              {paragraph}
            </motion.p>
          ))}

          {section.bullets && (
            <ul className="max-w-2xl space-y-2 border-l border-line pl-4">
              {section.bullets.map((item, i) => (
                <motion.li
                  key={i}
                  className="text-sm leading-relaxed text-ink-secondary"
                  {...(motionOn ? reveal(Math.min(i * STAGGER.tight, 0.2)) : {})}
                >
                  {item}
                </motion.li>
              ))}
            </ul>
          )}
        </div>
      )}

      <CaseStudyModules modules={section.modules} accent={section.accent || accent} mood={mood} />
    </section>
  )
}
