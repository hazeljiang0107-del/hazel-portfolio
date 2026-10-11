import { useEffect, useRef } from 'react'
import { LightboxProvider } from '../../components/redesign/ui'
import { Header, Cta } from '../../components/redesign/Chrome'
import { Hero, About, Footer } from '../../components/redesign/Sections'
import { MECH } from '../../components/redesign/chapters'
import { useReveal } from '../../components/redesign/scrollFx'
import { CHAPTERS } from '../../data/redesignPreview'
import '../../styles/redesign-preview.css'

const FONTS =
  'https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;600;700&family=IBM+Plex+Mono:wght@400;500&family=Inter:wght@300;400;500;600&display=swap'

/**
 * The portfolio homepage (/): a rectangles.fm-inspired rebuild. Self-contained (no site Layout),
 * lazy-loaded.
 */
export default function RedesignPreview() {
  const root = useRef(null)
  useReveal(root)

  useEffect(() => {
    document.title = 'Hazel Jiang — UX / Product Design Portfolio'
    const font = document.createElement('link')
    font.rel = 'stylesheet'
    font.href = FONTS
    document.head.appendChild(font)
    document.documentElement.classList.add('rd-root')
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    return () => {
      font.remove()
      document.documentElement.classList.remove('rd-root')
    }
  }, [])

  return (
    <LightboxProvider>
      <div className="rd" id="top" ref={root}>
        <a className="rd-skip" href="#work">
          Skip to projects
        </a>
        <Header />
        <main>
          <Hero />
          {CHAPTERS.map((c, i) => {
            const Chapter = MECH[c.mech]
            return (
              <div key={c.id} id={i === 0 ? 'work' : undefined} className="rd-chwrap" data-dark={c.dark || undefined}>
                <Chapter c={c} />
              </div>
            )
          })}
          <About />
        </main>
        <Footer />
        <Cta />
      </div>
    </LightboxProvider>
  )
}
