import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import IVIAnimationShowcase from './IVIAnimationShowcase'
import CommercePrototypeShowcase from './CommercePrototypeShowcase'
import StillHerePhoneShowcase from './StillHerePhoneShowcase'
import IPhoneMockup from './IPhoneMockup'
import CountUp from './CountUp'
import {
  EASE_OUT,
  STAGGER,
  VIEWPORT,
  barGrow,
  barGrowY,
  reveal,
  staggerContainer,
  staggerInView,
  staggerItem,
} from '../../motion/caseStudyMotion'

function imageStageClass(mood, tone = 'default') {
  if (tone === 'paper') return 'rounded-2xl bg-white ring-1 ring-[#d7dee8]'
  if (mood === 'zingerman-deli') return 'rounded-2xl bg-[#f5f0e8] ring-1 ring-black/5'
  if (mood === 'stellantis-ivi') return 'rounded-2xl bg-black ring-1 ring-white/10'
  if (mood === 'echoes-you-can-touch') return 'rounded-2xl bg-black ring-1 ring-white/10'
  return 'rounded-2xl bg-surface ring-1 ring-line'
}

function isPaperUiAsset(src = '') {
  return src.includes('/assets/soc/figma/')
}

function isZingermanDesktopAsset(src = '') {
  return (
    src.includes('/assets/zingerman/') &&
    (src.includes('-desktop.') ||
      src.includes('product-detail-revision') ||
      src.includes('wireframe-'))
  )
}

function isZingermanMobileAsset(src = '') {
  return src.includes('/assets/zingerman/') && src.includes('-mobile.')
}

function DesktopBrowserChrome({ children, url = 'zingermansdeli.com' }) {
  return (
    <div className="max-w-full overflow-hidden rounded-2xl bg-[#1c1c1c] ring-1 ring-black/20">
      <div className="flex items-center gap-3 border-b border-white/10 px-3 py-2">
        <div className="flex shrink-0 gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </div>
        <div className="min-w-0 flex-1 truncate rounded-md bg-white/10 px-3 py-1 text-center text-[10px] text-white/70">
          {url}
        </div>
      </div>
      {children}
    </div>
  )
}

function SectionImage({
  src,
  alt,
  caption,
  className = '',
  contain = true,
  mood,
  fullBleed = false,
  tone,
  frame,
}) {
  const [error, setError] = useState(false)
  const resolvedTone = tone || (isPaperUiAsset(src) ? 'paper' : 'default')
  const stage = imageStageClass(mood, resolvedTone)
  const paper = resolvedTone === 'paper'
  const desktopChrome =
    frame === 'desktop' ||
    (fullBleed && mood === 'zingerman-deli' && isZingermanDesktopAsset(src))
  const mobileFrame =
    frame === 'mobile' || (frame == null && mood === 'zingerman-deli' && isZingermanMobileAsset(src))

  if (!src || error) {
    return (
      <div
        className={`flex aspect-[16/10] flex-col items-center justify-center rounded-2xl border border-dashed border-line bg-surface/50 px-6 text-center ${className}`}
      >
        <p className="text-label">Asset pending</p>
        <p className="mt-2 text-sm text-ink-secondary">{alt || 'Image placeholder'}</p>
        <p className="mt-1 text-[10px] text-ink-muted">TODO: Export from Figma or UXfolio</p>
      </div>
    )
  }

  const image = (
    <img
      src={src}
      alt={alt}
      onError={() => setError(true)}
      className={`block h-auto w-full max-w-full ${
        paper
          ? 'rounded-2xl object-cover object-top'
          : contain
            ? 'object-contain object-top'
            : 'object-cover object-top'
      }`}
      loading="lazy"
    />
  )

  return (
    <figure className={`min-w-0 max-w-full ${fullBleed ? 'w-full' : ''} ${className}`}>
      {desktopChrome ? (
        <DesktopBrowserChrome>{image}</DesktopBrowserChrome>
      ) : (
        <div
          className={`max-w-full overflow-hidden ${stage} ${
            mobileFrame ? 'mx-auto w-full max-w-[280px]' : ''
          }`}
        >
          {image}
        </div>
      )}
      {caption && <figcaption className="mt-3 text-meta">{caption}</figcaption>}
    </figure>
  )
}

const SOC_BLUE = '#00274c'
const SOC_MAIZE = '#ffcb05'

const V1_FILES = [
  { period: 'Jan – Mar', label: 'ICS by Income Group', formats: ['PDF', 'Excel'] },
  { period: 'Apr – Jun', label: 'ICS by Income Group', formats: ['PDF', 'Excel'] },
  { period: 'Jul – Sep', label: 'ICS by Income Group', formats: ['PDF', 'Excel'] },
  { period: 'Oct – Dec', label: 'ICS by Income Group', formats: ['PDF', 'Excel'] },
]

const V2_KPIS = [
  { label: 'Index of Consumer Sentiment', value: '55.2', delta: '−1.1', up: false },
  { label: 'Current Conditions', value: '61.4', delta: '+0.8', up: true },
  { label: 'Expectations', value: '51.2', delta: '−2.4', up: false },
  { label: 'Top income tercile', value: '68.1', delta: '+1.6', up: true },
]

const V2_SERIES = [72, 68, 64, 58, 52, 48, 55, 61, 57, 53, 56, 55]
const V2_TABLE = [
  { month: 'Jan', current: 58.2, expected: 52.1, hist: 64.0 },
  { month: 'Feb', current: 61.4, expected: 51.2, hist: 63.1 },
  { month: 'Mar', current: 59.0, expected: 50.4, hist: 62.8 },
  { month: 'Apr', current: 57.3, expected: 49.8, hist: 61.5 },
]

function SocChrome({ active = 'Main' }) {
  return (
    <div className="border-b border-[#d7dee8] bg-white">
      <div className="flex items-center justify-between gap-3 px-3 py-2.5">
        <div className="min-w-0">
          <p className="text-[9px] font-semibold uppercase tracking-[0.14em]" style={{ color: SOC_BLUE }}>
            Surveys of Consumers
          </p>
          <p className="text-[8px] text-[#6b7a8d]">University of Michigan</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden h-6 w-20 items-center rounded-full bg-[#eef2f7] px-2 text-[8px] text-[#6b7a8d] sm:flex">
            Search…
          </div>
          <div className="flex overflow-hidden rounded-full bg-[#e8eef6] p-0.5 text-[8px] font-semibold">
            {['Main', 'Data'].map((tab) => (
              <span
                key={tab}
                className={`rounded-full px-2 py-1 ${
                  tab === active ? 'bg-white text-[#00274c] shadow-sm' : 'text-[#6b7a8d]'
                }`}
              >
                {tab}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div
        className="flex gap-3 overflow-x-auto px-3 py-1.5 text-[8px] font-medium text-white"
        style={{ background: SOC_BLUE }}
      >
        {['Tables & Charts', 'Reports', 'Survey Info', 'Tools', 'About'].map((item) => (
          <span key={item} className="whitespace-nowrap opacity-90">
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

function SocReportShell({ children, badge }) {
  return (
    <div className="overflow-hidden rounded-2xl bg-[#f4f6f9] ring-1 ring-[#c5d0de]">
      <SocChrome />
      <div className="space-y-3 p-3 sm:p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="text-[9px] text-[#6b7a8d]">Home › Search › Index of Consumer Sentiment</p>
            <p className="mt-1 text-[9px] font-medium" style={{ color: SOC_BLUE }}>
              February 2026
            </p>
            <h3 className="mt-1 text-[13px] font-bold leading-snug sm:text-sm" style={{ color: SOC_BLUE }}>
              Index of Consumer Sentiment by Income Group
            </h3>
          </div>
          {badge && (
            <span
              className="shrink-0 rounded-full px-2 py-1 text-[8px] font-semibold uppercase tracking-wide text-white"
              style={{ background: SOC_BLUE }}
            >
              {badge}
            </span>
          )}
        </div>
        {children}
      </div>
    </div>
  )
}

function SocV1ReportView() {
  return (
    <SocReportShell badge="V1 · Files">
      <div className="flex flex-wrap gap-1.5">
        {['Financial', 'Inflation', 'COVID'].map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-[#e4ebf4] px-2 py-0.5 text-[8px] font-medium"
            style={{ color: SOC_BLUE }}
          >
            {tag}
          </span>
        ))}
        <span className="rounded-full px-2 py-0.5 text-[8px] font-semibold text-white" style={{ background: SOC_BLUE }}>
          Download PDF
        </span>
      </div>

      <div className="overflow-hidden rounded-xl bg-white ring-1 ring-[#d7dee8]">
        <div className="flex items-center justify-between border-b border-[#e8eef6] px-3 py-2">
          <p className="text-[10px] font-semibold" style={{ color: SOC_BLUE }}>
            6. Current Financial Situation vs a Year Ago
          </p>
          <span className="text-[8px] text-[#8a96a8]">Static files</span>
        </div>
        <div className="flex gap-1 border-b border-[#e8eef6] px-2 py-1.5">
          {['All', 'Quarterly', 'Monthly', 'Yearly'].map((tab, i) => (
            <span
              key={tab}
              className={`rounded-md px-2 py-1 text-[8px] font-medium ${
                i === 1 ? 'text-white' : 'text-[#6b7a8d]'
              }`}
              style={i === 1 ? { background: SOC_BLUE } : undefined}
            >
              {tab}
            </span>
          ))}
        </div>
        <ul className="divide-y divide-[#eef2f7]">
          {V1_FILES.map((row, i) => (
            <motion.li
              key={row.period}
              className="flex items-center gap-2 px-3 py-2.5"
              initial={{ opacity: 0, x: -6 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.36, delay: i * STAGGER.tight, ease: EASE_OUT }}
            >
              <span className="w-14 shrink-0 text-[9px] font-medium text-[#6b7a8d]">{row.period}</span>
              <span className="min-w-0 flex-1 truncate text-[10px] font-medium underline decoration-[#c5d0de]" style={{ color: SOC_BLUE }}>
                {row.label} Report
              </span>
              <div className="flex gap-1">
                {row.formats.map((fmt) => (
                  <span
                    key={fmt}
                    className="rounded-full bg-[#eef2f7] px-1.5 py-0.5 text-[7px] font-semibold text-[#5a6a7d]"
                  >
                    {fmt}
                  </span>
                ))}
              </div>
            </motion.li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-1.5 border-t border-[#e8eef6] px-3 py-2">
          {['PDF', 'Image', 'Excel', 'Cite'].map((action) => (
            <span key={action} className="rounded-full border border-[#d7dee8] px-2 py-0.5 text-[8px] text-[#5a6a7d]">
              {action}
            </span>
          ))}
        </div>
      </div>

      <div className="rounded-xl bg-[#eaf0f7] p-3 ring-1 ring-[#d0dae8]">
        <p className="text-[9px] font-semibold uppercase tracking-wide" style={{ color: SOC_BLUE }}>
          Summary
        </p>
        <p className="mt-1.5 text-[9px] leading-relaxed text-[#4a5a6d]">
          Consumer sentiment edged lower in February. Income-group gaps persist — top tercile remains more
          optimistic than lower-income households. Full narrative lives in the linked PDF.
        </p>
      </div>
    </SocReportShell>
  )
}

function SocSparkline({ values }) {
  const prefersReducedMotion = useReducedMotion()
  const max = Math.max(...values)
  const min = Math.min(...values)
  const range = max - min || 1
  const coords = values.map((v, i) => {
    const x = (i / (values.length - 1)) * 100
    const y = 100 - ((v - min) / range) * 82 - 8
    return { x, y }
  })
  const lineD = coords
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`)
    .join(' ')
  const areaD = `${lineD} L 100 100 L 0 100 Z`
  const last = coords[coords.length - 1]

  return (
    <svg viewBox="0 0 100 100" className="h-24 w-full" preserveAspectRatio="none" aria-hidden>
      <defs>
        <linearGradient id="soc-spark-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={SOC_BLUE} stopOpacity="0.22" />
          <stop offset="100%" stopColor={SOC_BLUE} stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.path
        d={areaD}
        fill="url(#soc-spark-fill)"
        initial={prefersReducedMotion ? false : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={VIEWPORT}
        transition={{ duration: 0.5, delay: 0.25, ease: EASE_OUT }}
      />
      <motion.path
        d={lineD}
        fill="none"
        stroke={SOC_BLUE}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        initial={prefersReducedMotion ? false : { pathLength: 0, opacity: 0.5 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={VIEWPORT}
        transition={{ duration: 0.9, ease: EASE_OUT }}
      />
      <motion.circle
        cx={last.x}
        cy={last.y}
        r="2.2"
        fill={SOC_MAIZE}
        stroke={SOC_BLUE}
        strokeWidth="0.8"
        initial={prefersReducedMotion ? false : { scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={VIEWPORT}
        transition={{ duration: 0.28, delay: 0.7, ease: EASE_OUT }}
      />
    </svg>
  )
}

function SocV2ReportView() {
  return (
    <SocReportShell badge="V2 · Live">
      <div className="flex flex-wrap gap-1.5">
        {['Financial', 'Inflation', 'COVID', 'Tables'].map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-[#e4ebf4] px-2 py-0.5 text-[8px] font-medium"
            style={{ color: SOC_BLUE }}
          >
            {tag}
          </span>
        ))}
        <span className="rounded-full px-2 py-0.5 text-[8px] font-semibold text-white" style={{ background: SOC_BLUE }}>
          Export data
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {V2_KPIS.map((kpi, i) => (
          <motion.div
            key={kpi.label}
            className="rounded-xl bg-white p-2.5 ring-1 ring-[#d7dee8]"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.44, delay: i * STAGGER.tight, ease: EASE_OUT }}
          >
            <p className="text-[8px] leading-snug text-[#6b7a8d]">{kpi.label}</p>
            <div className="mt-1 flex items-baseline gap-1.5">
              <CountUp
                value={kpi.value}
                className="text-lg font-bold tabular-nums leading-none"
                style={{ color: SOC_BLUE }}
              />
              <span className={`text-[9px] font-semibold ${kpi.up ? 'text-emerald-600' : 'text-rose-600'}`}>
                {kpi.delta}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
      <p className="text-[8px] text-[#8a96a8]">Illustrative metrics for layout — not live SoC release figures.</p>

      <div className="overflow-hidden rounded-xl bg-white ring-1 ring-[#d7dee8]">
        <div className="flex items-center justify-between border-b border-[#e8eef6] px-3 py-2">
          <p className="text-[10px] font-semibold" style={{ color: SOC_BLUE }}>
            ICS · income terciles
          </p>
          <div className="flex gap-1">
            {['All', 'Quarterly', 'Monthly'].map((tab, i) => (
              <span
                key={tab}
                className={`rounded-md px-2 py-1 text-[8px] font-medium ${
                  i === 0 ? 'text-white' : 'text-[#6b7a8d]'
                }`}
                style={i === 0 ? { background: SOC_BLUE } : undefined}
              >
                {tab}
              </span>
            ))}
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[260px] border-collapse text-left text-[8px]">
            <thead>
              <tr className="bg-[#f3f6fa] text-[#5a6a7d]">
                <th className="px-2 py-1.5 font-semibold">Month</th>
                <th className="px-2 py-1.5 font-semibold" style={{ background: '#fff4c2' }}>
                  Current
                </th>
                <th className="px-2 py-1.5 font-semibold" style={{ background: '#d7e6fb' }}>
                  Expected
                </th>
                <th className="px-2 py-1.5 font-semibold" style={{ background: '#fff4c2' }}>
                  Historical
                </th>
              </tr>
            </thead>
            <tbody>
              {V2_TABLE.map((row) => (
                <tr key={row.month} className="border-t border-[#eef2f7]">
                  <td className="px-2 py-1.5 font-medium text-[#4a5a6d]">{row.month}</td>
                  <td className="px-2 py-1.5 tabular-nums" style={{ background: 'rgba(0,39,76,0.06)' }}>
                    {row.current}
                  </td>
                  <td className="px-2 py-1.5 tabular-nums" style={{ background: 'rgba(0,39,76,0.1)' }}>
                    {row.expected}
                  </td>
                  <td className="px-2 py-1.5 tabular-nums" style={{ background: 'rgba(255,203,5,0.18)' }}>
                    {row.hist}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid gap-2 sm:grid-cols-2">
        <div className="rounded-xl bg-[#eaf0f7] p-3 ring-1 ring-[#d0dae8]">
          <p className="text-[9px] font-semibold uppercase tracking-wide" style={{ color: SOC_BLUE }}>
            Summary
          </p>
          <p className="mt-1.5 text-[9px] leading-relaxed text-[#4a5a6d]">
            Sentiment softens overall, but higher-income households hold steadier. Live filters replace PDF
            scavenger hunts for income, region, and party breakouts.
          </p>
        </div>
        <div className="rounded-xl bg-white p-3 ring-1 ring-[#d7dee8]">
          <div className="mb-1 flex items-center justify-between">
            <p className="text-[9px] font-semibold" style={{ color: SOC_BLUE }}>
              Index trend
            </p>
            <span className="text-[8px] text-[#6b7a8d]">Sample · 12 mo</span>
          </div>
          <SocSparkline values={V2_SERIES} />
          <p className="mt-1 text-[8px] text-[#8a96a8]">Illustrative layout · 1966 = 100</p>
        </div>
      </div>
    </SocReportShell>
  )
}

function SocReportCompare({ caption, accent }) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <div className="min-w-0">
      <div className="grid gap-6 md:grid-cols-2">
        <motion.div
          className="min-w-0"
          {...(prefersReducedMotion ? {} : reveal(0))}
        >
          <p className="text-label mb-2">V1 MVP Report View</p>
          <SocV1ReportView />
        </motion.div>
        <motion.div
          className="min-w-0"
          {...(prefersReducedMotion ? {} : reveal(STAGGER.loose))}
        >
          <p className="text-label mb-2" style={{ color: accent }}>
            V2 Report View
          </p>
          <SocV2ReportView />
        </motion.div>
      </div>
      {caption && <p className="mt-4 text-sm text-ink-secondary">{caption}</p>}
    </div>
  )
}

function FlowStep({ step, index, mood, accent }) {
  return (
    <div className="min-w-0">
      <div className="mb-4 max-w-2xl">
        <div className="flex items-baseline gap-3">
          <span className="text-label tabular-nums" style={{ color: accent }}>
            {String(index + 1).padStart(2, '0')}
          </span>
          <h3 className="font-display text-lg text-ink">{step.label}</h3>
        </div>
        {step.description && (
          <p className="mt-2 text-sm leading-relaxed text-ink-secondary">{step.description}</p>
        )}
      </div>
      <SectionImage src={step.src} alt={step.alt} mood={mood} fullBleed />
    </div>
  )
}

function InsightCards({ items, accent }) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      className="grid gap-6 md:grid-cols-2"
      variants={staggerContainer}
      {...(prefersReducedMotion ? {} : staggerInView)}
    >
      {items.map((item) => (
        <motion.blockquote
          key={item.insight}
          className="min-w-0 border-l-2 pl-4"
          style={{ borderColor: `${accent}66` }}
          variants={prefersReducedMotion ? undefined : staggerItem}
        >
          <p className="font-display text-lg leading-snug text-ink">{item.insight}</p>
          <p className="mt-3 text-sm leading-relaxed text-ink-secondary">{item.evidence}</p>
          <p className="mt-3 text-sm text-ink-muted">
            <span className="text-label mr-2">Response</span>
            {item.implication}
          </p>
        </motion.blockquote>
      ))}
    </motion.div>
  )
}

function MethodCards({ items }) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      className="grid gap-px bg-line sm:grid-cols-2"
      variants={staggerContainer}
      {...(prefersReducedMotion ? {} : staggerInView)}
    >
      {items.map((item) => (
        <motion.div
          key={item.title}
          className="min-w-0 bg-base p-5"
          variants={prefersReducedMotion ? undefined : staggerItem}
        >
          <h3 className="text-sm font-semibold text-ink">{item.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-ink-secondary">{item.description}</p>
          {item.note && <p className="mt-2 text-xs text-ink-muted">{item.note}</p>}
        </motion.div>
      ))}
    </motion.div>
  )
}

function BeforeAfter({
  before,
  after,
  caption,
  mood,
  accent,
  beforeLabel = 'Before',
  afterLabel = 'After',
}) {
  const stack = mood === 'zingerman-deli'

  return (
    <div className="min-w-0 max-w-full">
      <div className={`grid gap-6 ${stack ? '' : 'md:grid-cols-2'}`}>
        <div className="min-w-0">
          <p className="text-label mb-2">{beforeLabel}</p>
          <SectionImage
            src={before.src}
            alt={before.alt}
            mood={mood}
            fullBleed={stack}
          />
        </div>
        <div className="min-w-0">
          <p className="text-label mb-2" style={{ color: accent }}>
            {afterLabel}
          </p>
          <SectionImage
            src={after.src}
            alt={after.alt}
            mood={mood}
            fullBleed={stack}
          />
        </div>
      </div>
      {caption && <p className="mt-4 text-sm text-ink-secondary">{caption}</p>}
    </div>
  )
}

function FlowShowcase({ steps, mood, accent, layout }) {
  const desktopFlow = mood === 'zingerman-deli'
  const stackFlow = layout === 'stack' || mood === 'surveys-of-consumers'
  const cardWidth = desktopFlow
    ? 'w-[min(520px,calc(100vw-4rem))]'
    : 'w-[min(320px,calc(100vw-4rem))]'

  if (stackFlow) {
    return (
      <div className="min-w-0 space-y-14">
        {steps.map((step, i) => (
          <FlowStep key={step.label} step={step} index={i} mood={mood} accent={accent} />
        ))}
      </div>
    )
  }

  return (
    <div className="min-w-0">
      <div className="space-y-10 md:hidden">
        {steps.map((step, i) => (
          <FlowStep key={step.label} step={step} index={i} mood={mood} accent={accent} />
        ))}
      </div>

      <div className="hidden min-w-0 md:block">
        <div className="w-full max-w-full overflow-x-auto overscroll-x-contain pb-2 [-webkit-overflow-scrolling:touch]">
          <div className="flex w-max gap-6 pr-1">
            {steps.map((step, i) => (
              <div key={step.label} className={`${cardWidth} shrink-0`}>
                <FlowStep step={step} index={i} mood={mood} accent={accent} />
              </div>
            ))}
          </div>
        </div>
        <p className="mt-3 text-meta">Scroll horizontally to see the full flow →</p>
      </div>
    </div>
  )
}

function ResponsiveShowcase({ screens, mood }) {
  return (
    <div className="min-w-0 space-y-10">
      {screens.map((screen) => (
        <div key={screen.name} className="min-w-0">
          <h3 className="mb-4 font-display text-lg text-ink">{screen.name}</h3>
          <div className="grid min-w-0 items-start gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,240px)]">
            <div className="min-w-0">
              <p className="text-label mb-2">Desktop</p>
              <SectionImage
                src={screen.desktop.src}
                alt={screen.desktop.alt}
                mood={mood}
                fullBleed
              />
            </div>
            <div className="min-w-0">
              <p className="text-label mb-2">Mobile</p>
              <SectionImage
                src={screen.mobile.src}
                alt={screen.mobile.alt}
                mood={mood}
                frame="mobile"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function DesignResponseMap({ items, mood, accent }) {
  const prefersReducedMotion = useReducedMotion()
  const stackImages = mood === 'zingerman-deli'

  return (
    <div className="min-w-0 space-y-8">
      {items.map((item, i) => (
        <motion.div
          key={item.finding}
          className={`grid min-w-0 gap-6 border-t border-line pt-6 ${
            stackImages ? '' : 'md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]'
          }`}
          {...(prefersReducedMotion ? {} : reveal(Math.min(i * STAGGER.tight, 0.16)))}
        >
          <div className="min-w-0 max-w-2xl">
            <p className="text-label">Finding</p>
            <p className="mt-2 text-sm font-medium text-ink">{item.finding}</p>
            <p className="text-label mt-4" style={{ color: accent }}>
              Design response
            </p>
            <p className="mt-2 text-sm leading-relaxed text-ink-secondary">{item.response}</p>
          </div>
          {item.image && (
            <SectionImage
              src={item.image.src}
              alt={item.image.alt}
              mood={mood}
              className="min-w-0"
              fullBleed
            />
          )}
        </motion.div>
      ))}
    </div>
  )
}

function TodoBlock({ message, accent }) {
  return (
    <div
      className="border border-dashed px-4 py-3 text-sm text-ink-secondary"
      style={{ borderColor: `${accent}44` }}
    >
      <span className="font-medium" style={{ color: accent }}>
        TODO:
      </span>{' '}
      {message}
    </div>
  )
}

function cardGridClass(count) {
  if (count <= 1) return 'grid-cols-1'
  if (count === 2) return 'grid-cols-1 sm:grid-cols-2'
  if (count === 3) return 'grid-cols-1 sm:grid-cols-3'
  if (count === 4) return 'grid-cols-2 lg:grid-cols-4'
  if (count === 5) return 'grid-cols-2 md:grid-cols-5'
  return 'grid-cols-2 lg:grid-cols-3'
}

function BriefCards({ items }) {
  const prefersReducedMotion = useReducedMotion()
  const gridClass = cardGridClass(items.length)

  return (
    <motion.div
      className={`grid gap-px bg-line ${gridClass}`}
      variants={staggerContainer}
      {...(prefersReducedMotion ? {} : staggerInView)}
    >
      {items.map((item) => (
        <motion.div
          key={item.title}
          className="min-w-0 bg-base p-5"
          variants={prefersReducedMotion ? undefined : staggerItem}
        >
          <h3 className="text-sm font-semibold text-ink">{item.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-ink-secondary">{item.description}</p>
        </motion.div>
      ))}
    </motion.div>
  )
}

function FeatureCards({ items, mood }) {
  const prefersReducedMotion = useReducedMotion()
  const borderless = mood === 'echoes-you-can-touch'

  return (
    <div className="space-y-8">
      {items.map((item, i) => (
        <motion.article
          key={item.title}
          className={`min-w-0 ${borderless ? 'pt-2' : 'border-t border-line pt-6'}`}
          {...(prefersReducedMotion ? {} : reveal(Math.min(i * STAGGER.tight, 0.18)))}
        >
          {item.image && (
            <SectionImage
              src={item.image.src}
              alt={item.image.alt}
              mood={mood}
              fullBleed
            />
          )}
          <div className="mt-4 max-w-xl">
            <h3 className="font-display text-lg text-ink">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-secondary">{item.description}</p>
          </div>
        </motion.article>
      ))}
    </div>
  )
}

function SitemapGrid({ images, mood, caption, accent }) {
  const prefersReducedMotion = useReducedMotion()
  if (!images?.length) return null

  return (
    <motion.div className="min-w-0 space-y-3" {...(prefersReducedMotion ? {} : reveal(0))}>
      <div className="grid gap-4 sm:grid-cols-2">
        {images.map((item) => (
          <figure key={item.name} className="min-w-0">
            <p className="text-label mb-2" style={{ color: accent }}>
              {item.name}
            </p>
            <div className={`overflow-hidden ${imageStageClass(mood)}`}>
              <img
                src={item.src}
                alt={item.alt}
                className="block h-auto w-full object-contain object-top"
                loading="lazy"
              />
            </div>
          </figure>
        ))}
      </div>
      {caption && <p className="text-meta">{caption}</p>}
    </motion.div>
  )
}

function CompetitorCards({ items, image, images, mood, accent }) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <div className="min-w-0 space-y-6">
      {images?.length ? (
        <SitemapGrid images={images} mood={mood} caption={image?.caption} accent={accent} />
      ) : (
        image && (
          <motion.div {...(prefersReducedMotion ? {} : reveal(0))}>
            <SectionImage src={image.src} alt={image.alt} caption={image.caption} mood={mood} />
          </motion.div>
        )
      )}
      <motion.div
        className="grid gap-px bg-line md:grid-cols-2"
        variants={staggerContainer}
        {...(prefersReducedMotion ? {} : staggerInView)}
      >
        {items.map((item) => (
          <motion.div
            key={item.name}
            className="min-w-0 bg-base p-5"
            variants={prefersReducedMotion ? undefined : staggerItem}
          >
            <p className="text-label" style={{ color: accent }}>
              {item.name}
            </p>
            <ul className="mt-3 space-y-2">
              {item.points.map((point) => (
                <li key={point} className="text-sm leading-relaxed text-ink-secondary">
                  {point}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

function PainPointCards({ items, accent, responseLabel = 'Opportunity' }) {
  const prefersReducedMotion = useReducedMotion()
  const gridClass = cardGridClass(items.length)

  return (
    <motion.div
      className={`grid gap-px bg-line ${gridClass}`}
      variants={staggerContainer}
      {...(prefersReducedMotion ? {} : staggerInView)}
    >
      {items.map((item) => (
        <motion.div
          key={item.pain}
          className="min-w-0 bg-base p-5"
          variants={prefersReducedMotion ? undefined : staggerItem}
        >
          <p className="text-label">Pain point</p>
          <p className="mt-2 text-sm font-medium text-ink">{item.pain}</p>
          <p className="text-label mt-4" style={{ color: accent }}>
            {responseLabel}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-ink-secondary">{item.opportunity}</p>
        </motion.div>
      ))}
    </motion.div>
  )
}

function StatCards({ items, accent, note }) {
  const prefersReducedMotion = useReducedMotion()
  const gridClass = cardGridClass(items.length)

  return (
    <div className="min-w-0 space-y-4">
      <motion.div
        className={`grid gap-px bg-line ${gridClass}`}
        variants={staggerContainer}
        {...(prefersReducedMotion ? {} : staggerInView)}
      >
        {items.map((item) => (
          <motion.div
            key={item.label}
            className="min-w-0 bg-base p-5"
            variants={prefersReducedMotion ? undefined : staggerItem}
          >
            <CountUp
              value={item.value}
              className="font-display text-3xl tracking-tight tabular-nums text-ink"
              style={{ color: accent }}
            />
            <p className="mt-2 text-sm font-medium text-ink">{item.label}</p>
            {item.detail && (
              <p className="mt-2 text-xs leading-relaxed text-ink-muted">{item.detail}</p>
            )}
          </motion.div>
        ))}
      </motion.div>
      {note && <p className="text-meta">{note}</p>}
    </div>
  )
}

function BarChart({ items, accent, note, compact = false }) {
  const max = Math.max(...items.map((item) => item.value), 1)
  const prefersReducedMotion = useReducedMotion()
  const barHeight = compact ? 'h-24 sm:h-28' : 'h-28 sm:h-32'

  return (
    <div className="min-w-0">
      {note && (
        <p className={`text-meta ${compact ? 'mb-2' : 'mb-3'}`} style={{ color: accent }}>
          {note}
        </p>
      )}
      <div className="overflow-x-auto pb-1 [-webkit-overflow-scrolling:touch]">
        <div
          className="flex items-end gap-1.5 sm:gap-2"
          style={{ minWidth: `${Math.max(items.length * 3.25, 18)}rem` }}
        >
          {items.map((item, i) => {
            const label = item.shortLabel || item.label
            return (
              <div
                key={item.label}
                className="flex min-w-0 flex-1 flex-col items-center gap-1.5"
                title={item.label}
              >
                <CountUp
                  value={String(item.value)}
                  className="text-[11px] font-medium tabular-nums text-ink sm:text-xs"
                />
                <div className={`relative w-full max-w-[2.75rem] ${barHeight} bg-surface`}>
                  <motion.div
                    className="absolute inset-x-0 bottom-0 origin-bottom"
                    style={{
                      height: `${Math.max(10, (item.value / max) * 100)}%`,
                      backgroundColor: accent,
                    }}
                    {...(prefersReducedMotion
                      ? {}
                      : barGrowY(Math.min(i * STAGGER.tight, 0.28)))}
                  />
                </div>
                <p className="w-full text-center text-[9px] leading-tight text-ink-muted sm:text-[10px]">
                  {label}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function BarChartGrid({ charts, accent }) {
  if (!charts?.length) return null

  return (
    <div className="grid min-w-0 gap-8 lg:grid-cols-3 lg:gap-6">
      {charts.map((chart) => (
        <BarChart
          key={chart.note}
          items={chart.items}
          note={chart.note}
          accent={accent}
          compact
        />
      ))}
    </div>
  )
}

function BarList({ items, accent, note }) {
  return <BarChart items={items} accent={accent} note={note} />
}

function DecisionMatrix({ columns, rows, accent }) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      className="min-w-0 overflow-x-auto"
      {...(prefersReducedMotion ? {} : reveal(0))}
    >
      <table className="w-full min-w-[640px] border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-line">
            {columns.map((col) => (
              <th key={col} className="px-3 py-3 text-label font-medium text-ink-muted">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <motion.tr
              key={row[0]}
              className="border-b border-line align-top"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
              whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{
                duration: 0.36,
                delay: Math.min(rowIndex * STAGGER.tight, 0.28),
                ease: EASE_OUT,
              }}
            >
              {row.map((cell, i) => (
                <td
                  key={`${row[0]}-${i}`}
                  className={`px-3 py-4 leading-relaxed ${
                    i === 0 ? 'font-medium text-ink' : 'text-ink-secondary'
                  }`}
                  style={i === row.length - 1 ? { color: accent } : undefined}
                >
                  {cell}
                </td>
              ))}
            </motion.tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  )
}

function InteractionModel({ items }) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      className="grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-3"
      variants={staggerContainer}
      {...(prefersReducedMotion ? {} : staggerInView)}
    >
      {items.map((item) => (
        <motion.div
          key={item.title}
          className="min-w-0 bg-base p-5"
          variants={prefersReducedMotion ? undefined : staggerItem}
        >
          <h3 className="text-sm font-semibold text-ink">{item.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-ink-secondary">{item.description}</p>
          {item.role && (
            <p className="mt-3 text-xs text-ink-muted">
              <span className="text-ink-secondary">Role · </span>
              {item.role}
            </p>
          )}
        </motion.div>
      ))}
    </motion.div>
  )
}

function ObservationCards({ items, accent }) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      className="grid sm:grid-cols-2 lg:grid-cols-3"
      variants={staggerContainer}
      {...(prefersReducedMotion ? {} : staggerInView)}
    >
      {items.map((item) => (
        <motion.article
          key={item.id}
          className="min-w-0 bg-base p-5"
          variants={prefersReducedMotion ? undefined : staggerItem}
        >
          <p className="text-label tabular-nums" style={{ color: accent }}>
            {item.id}
          </p>
          <h3 className="mt-2 text-sm font-semibold text-ink">{item.title}</h3>
          <blockquote className="mt-3 border-l-2 pl-3 text-sm italic leading-relaxed text-ink-secondary">
            {item.quote}
          </blockquote>
        </motion.article>
      ))}
    </motion.div>
  )
}

function InterviewCards({ items, accent }) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <div className="min-w-0 space-y-6">
      {items.map((item, i) => (
        <motion.article
          key={item.name}
          className="grid gap-6 border-t border-line pt-6 md:grid-cols-[minmax(0,200px)_minmax(0,1fr)]"
          {...(prefersReducedMotion ? {} : reveal(Math.min(i * STAGGER.tight, 0.2)))}
        >
          <div className="min-w-0">
            <p className="font-display text-lg text-ink">{item.name}</p>
            <p className="mt-1 text-sm text-ink-secondary">{item.role}</p>
            {item.tags?.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-line px-2 py-0.5 text-[10px] uppercase tracking-wide text-ink-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
          <div className="min-w-0">
            {item.prompt && (
              <p className="text-label mb-2" style={{ color: accent }}>
                {item.prompt}
              </p>
            )}
            <blockquote className="text-sm leading-relaxed text-ink-secondary">
              {item.quote}
            </blockquote>
            {item.gap && (
              <p className="mt-4 text-xs leading-relaxed text-ink-muted">
                <span className="text-label mr-2">System gap</span>
                {item.gap}
              </p>
            )}
          </div>
        </motion.article>
      ))}
    </div>
  )
}

function EcosystemSplit({ wearable, app, accent }) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <div className="grid min-w-0 gap-px bg-line lg:grid-cols-2">
      {[wearable, app].map((column, i) => (
        <motion.div
          key={column.title}
          className="min-w-0 bg-base p-6 md:p-8"
          {...(prefersReducedMotion ? {} : reveal(i * STAGGER.loose))}
        >
          <p className="text-label" style={{ color: accent }}>
            {column.label}
          </p>
          <h3 className="mt-2 font-display text-xl text-ink">{column.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-ink-secondary">{column.summary}</p>
          <ol className="mt-6 space-y-5">
            {column.layers.map((layer) => (
              <li key={layer.title} className="min-w-0">
                <p className="text-sm font-medium text-ink">{layer.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-ink-secondary">
                  {layer.description}
                </p>
                {layer.details?.length > 0 && (
                  <ul className="mt-2 space-y-1">
                    {layer.details.map((detail) => (
                      <li key={detail} className="text-xs text-ink-muted">
                        · {detail}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ol>
        </motion.div>
      ))}
    </div>
  )
}

function IPhoneFlowRow({ screens, accent }) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <div className="min-w-0">
      <div className="flex w-full max-w-full gap-6 overflow-x-auto overscroll-x-contain pb-2 [-webkit-overflow-scrolling:touch]">
        {screens.map((screen, i) => (
          <motion.div
            key={screen.id}
            className="w-[min(220px,calc(100vw-4rem))] shrink-0"
            {...(prefersReducedMotion ? {} : reveal(Math.min(i * STAGGER.tight, 0.24)))}
          >
            <IPhoneMockup
              src={screen.src}
              alt={screen.alt}
              size="sm"
              tilt={i % 2 === 0 ? -3 : 3}
            />
            <p className="mt-3 text-sm font-medium text-ink">{screen.title}</p>
            <p className="mt-1 text-xs leading-relaxed text-ink-muted">{screen.caption}</p>
          </motion.div>
        ))}
      </div>
      <p className="mt-3 text-meta" style={{ color: accent }}>
        Scroll to see companion flows →
      </p>
    </div>
  )
}

function AnnotatedGallery({ groups, mood }) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <div className="min-w-0 space-y-10">
      {groups.map((group, i) => (
        <motion.figure
          key={group.title}
          {...(prefersReducedMotion ? {} : reveal(Math.min(i * STAGGER.base, 0.18)))}
        >
          <figcaption className="mb-3 font-display text-lg text-ink">{group.title}</figcaption>
          <div className={`relative overflow-hidden ${imageStageClass(mood)}`}>
            <img
              src={group.src}
              alt={group.alt}
              className="block h-auto w-full object-contain object-top"
              loading="lazy"
            />
            {group.annotations?.map((note, noteIndex) => (
              <motion.div
                key={note.label}
                className="pointer-events-none absolute max-w-[min(220px,40%)] border border-line bg-base/90 px-2.5 py-1.5 text-[11px] leading-snug text-ink"
                style={{ left: note.x, top: note.y }}
                initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.92 }}
                whileInView={prefersReducedMotion ? undefined : { opacity: 1, scale: 1 }}
                viewport={VIEWPORT}
                transition={{
                  duration: 0.32,
                  delay: 0.2 + noteIndex * STAGGER.tight,
                  ease: EASE_OUT,
                }}
              >
                {note.label}
              </motion.div>
            ))}
          </div>
          {group.caption && <p className="mt-3 text-meta">{group.caption}</p>}
        </motion.figure>
      ))}
    </div>
  )
}

function SectionVideo({
  src,
  alt,
  caption,
  url = 'data.sca.isr.umich.edu',
  frame = 'browser',
  poster,
  playbackRate = 1,
}) {
  if (frame === 'game') {
    return (
      <figure className="min-w-0 max-w-full">
        <MediaReveal>
          <div className="echoes-game-video">
            <GameWalkthroughVideo
              src={src}
              poster={poster}
              alt={alt}
              playbackRate={playbackRate}
            />
            <div className="echoes-game-video__sheen" aria-hidden="true" />
          </div>
        </MediaReveal>
        {caption && <figcaption className="mt-3 text-meta">{caption}</figcaption>}
      </figure>
    )
  }

  return (
    <figure className="min-w-0 max-w-full">
      <MediaReveal>
        <DesktopBrowserChrome url={url}>
          <video
            src={src}
            className="block aspect-[16/10] w-full bg-black object-cover object-top"
            autoPlay
            loop
            muted
            playsInline
            controls
            aria-label={alt}
          />
        </DesktopBrowserChrome>
      </MediaReveal>
      {caption && <figcaption className="mt-3 text-meta">{caption}</figcaption>}
    </figure>
  )
}

function GameWalkthroughVideo({ src, poster, alt, playbackRate = 0.7 }) {
  const ref = useRef(null)
  const prefersReducedMotion = useReducedMotion()
  const rate = prefersReducedMotion ? 1 : playbackRate

  useEffect(() => {
    const video = ref.current
    if (!video) return
    video.playbackRate = rate
    const applyRate = () => {
      video.playbackRate = rate
    }
    video.addEventListener('loadedmetadata', applyRate)
    video.addEventListener('play', applyRate)
    return () => {
      video.removeEventListener('loadedmetadata', applyRate)
      video.removeEventListener('play', applyRate)
    }
  }, [rate])

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      className="echoes-game-video__media echoes-game-video__media--drift"
      autoPlay
      loop
      muted
      playsInline
      controls
      aria-label={alt}
    />
  )
}

function MediaReveal({ children }) {
  const prefersReducedMotion = useReducedMotion()
  if (prefersReducedMotion) return children
  return <motion.div {...reveal(0)}>{children}</motion.div>
}

export default function CaseStudyModules({ modules, accent, mood }) {
  if (!modules?.length) return null

  const accentColor = accent || 'var(--color-accent-warm)'

  return (
    <div className="min-w-0 space-y-10">
      {modules.map((module, i) => (
        <div key={`${module.type}-${i}`}>
          {module.type === 'insight-cards' && (
            <InsightCards items={module.items} accent={accentColor} />
          )}
          {module.type === 'method-cards' && <MethodCards items={module.items} />}
          {module.type === 'brief-cards' && <BriefCards items={module.items} />}
          {module.type === 'feature-cards' && (
            <FeatureCards items={module.items} mood={mood} />
          )}
          {module.type === 'competitor-cards' && (
            <CompetitorCards
              items={module.items}
              image={module.image}
              images={module.images}
              mood={mood}
              accent={accentColor}
            />
          )}
          {module.type === 'pain-cards' && (
            <PainPointCards
              items={module.items}
              accent={accentColor}
              responseLabel={module.responseLabel}
            />
          )}
          {module.type === 'stat-cards' && (
            <StatCards items={module.items} accent={accentColor} note={module.note} />
          )}
          {module.type === 'bar-list' && (
            <BarList items={module.items} accent={accentColor} note={module.note} />
          )}
          {module.type === 'bar-chart-grid' && (
            <BarChartGrid charts={module.charts} accent={accentColor} />
          )}
          {module.type === 'decision-matrix' && (
            <DecisionMatrix
              columns={module.columns}
              rows={module.rows}
              accent={accentColor}
            />
          )}
          {module.type === 'interaction-model' && <InteractionModel items={module.items} />}
          {module.type === 'observation-cards' && (
            <ObservationCards items={module.items} accent={accentColor} />
          )}
          {module.type === 'interview-cards' && (
            <InterviewCards items={module.items} accent={accentColor} />
          )}
          {module.type === 'ecosystem-split' && (
            <EcosystemSplit wearable={module.wearable} app={module.app} accent={accentColor} />
          )}
          {module.type === 'iphone-showcase' && (
            <StillHerePhoneShowcase
              screens={module.screens}
              groups={module.groups}
              accent={accentColor}
            />
          )}
          {module.type === 'iphone-flow' && (
            <IPhoneFlowRow screens={module.screens} accent={accentColor} />
          )}
          {module.type === 'commerce-showcase' && (
            <CommercePrototypeShowcase
              walkthrough={module.walkthrough}
              screens={module.screens}
              accent={module.accent || accentColor}
              desktopUrl={module.desktopUrl}
            />
          )}
          {module.type === 'ivi-showcase' && (
            <IVIAnimationShowcase
              walkthrough={module.walkthrough}
              screens={module.screens}
              demos={module.demos}
              accent={module.accent || accentColor}
            />
          )}
          {module.type === 'annotated-gallery' && (
            <AnnotatedGallery groups={module.groups} mood={mood} />
          )}
          {module.type === 'before-after' && (
            <BeforeAfter
              before={module.before}
              after={module.after}
              caption={module.caption}
              beforeLabel={module.beforeLabel}
              afterLabel={module.afterLabel}
              mood={mood}
              accent={accentColor}
            />
          )}
          {module.type === 'soc-report-compare' && (
            <SocReportCompare caption={module.caption} accent={accentColor} />
          )}
          {module.type === 'flow-showcase' && (
            <FlowShowcase
              steps={module.steps}
              mood={mood}
              accent={accentColor}
              layout={module.layout}
            />
          )}
          {module.type === 'responsive-showcase' && (
            <ResponsiveShowcase screens={module.screens} mood={mood} />
          )}
          {module.type === 'design-response' && (
            <DesignResponseMap items={module.items} mood={mood} accent={accentColor} />
          )}
          {module.type === 'media' && (
            <MediaReveal>
              <SectionImage
                src={module.src}
                alt={module.alt}
                caption={module.caption}
                mood={mood}
                fullBleed
              />
            </MediaReveal>
          )}
          {module.type === 'video' && (
            <SectionVideo
              src={module.src}
              alt={module.alt}
              caption={module.caption}
              url={module.url}
              frame={module.frame}
              poster={module.poster}
              playbackRate={module.playbackRate}
            />
          )}
          {module.type === 'todo' && (
            <TodoBlock message={module.message} accent={accentColor} />
          )}
        </div>
      ))}
    </div>
  )
}
