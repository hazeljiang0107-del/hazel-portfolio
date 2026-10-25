import { useEffect, useRef } from 'react'
import { LightboxProvider } from './ui'
import { Header, Cta } from './Chrome'
import { Footer } from './Sections'
import { useReveal } from './scrollFx'
import { CHAPTERS } from '../../data/redesignPreview'

const FONTS =
  'https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;600;700&family=IBM+Plex+Mono:wght@400;500&family=Inter:wght@300;400;500;600&display=swap'

const BACK = '/'
const FOOT_WORK = CHAPTERS.map((c) => ({ label: c.title, to: `/work#${c.id}` }))

/**
 * Shared page shell for every redesign case study (/projects/<slug>): fonts,
 * document title, scroll-reveals, a thin reading-progress line, header, footer and the two
 * floating bits. Self-contained (no site Layout).
 */
export default function CaseShell({ title, nav, skipTo, children, className = '', fonts }) {
  const root = useRef(null)
  useReveal(root)

  useEffect(() => {
    const prev = document.title
    document.title = `${title} — Hazel Jiang`
    const links = [FONTS, ...(fonts ? [fonts] : [])].map((href) => {
      const font = document.createElement('link')
      font.rel = 'stylesheet'
      font.href = href
      document.head.appendChild(font)
      return font
    })
    document.documentElement.classList.add('rd-root')
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    return () => {
      document.title = prev
      links.forEach((font) => font.remove())
      document.documentElement.classList.remove('rd-root')
    }
  }, [title, fonts])

  // thin reading-progress line along the top edge (CSS variable, no re-render)
  useEffect(() => {
    const el = root.current
    if (!el) return undefined
    let raf = 0
    const on = () => {
      raf = 0
      const h = document.documentElement.scrollHeight - window.innerHeight
      el.style.setProperty('--read', h > 0 ? (window.scrollY / h).toFixed(4) : '0')
    }
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(on)
    }
    on()
    window.addEventListener('scroll', kick, { passive: true })
    window.addEventListener('resize', kick)
    return () => {
      window.removeEventListener('scroll', kick)
      window.removeEventListener('resize', kick)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <LightboxProvider>
      <div className={`rd rc${className ? ` ${className}` : ''}`} id="top" ref={root}>
        <a className="rd-skip" href={skipTo}>
          Skip to the case study
        </a>
        <div className="rc-read" aria-hidden="true" />
        <Header nav={[{ label: 'All work', to: BACK }, ...nav]} brand={BACK} />
        <main>{children}</main>
        <Footer work={FOOT_WORK} />
        <Cta />
      </div>
    </LightboxProvider>
  )
}
