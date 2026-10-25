import { useEffect, useRef } from 'react'
import { LightboxProvider, HeadCtx } from '../../components/redesign/ui'
import { Header, Cta } from '../../components/redesign/Chrome'
import { Footer } from '../../components/redesign/Sections'
import { MECH } from '../../components/redesign/chapters'
import { useReveal } from '../../components/redesign/scrollFx'
import { CHAPTERS } from '../../data/magazine'
import { RESUME_URL } from '../../data/projects'
import { Contents, FooterTicker } from '../../components/magazine/Cover'
import { MgHead } from '../../components/magazine/Head'
import { MgCursor } from '../../components/magazine/Cursor'
import { Tear } from '../../components/magazine/paper'
import '../../styles/redesign-preview.css'
import '../../styles/magazine.css'

const FONTS =
  'https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;600;700&family=Caveat:wght@500;600&family=Fraunces:ital,opsz,wght@1,9..144,400;1,9..144,600&family=IBM+Plex+Mono:wght@400;500&family=Inter:wght@300;400;500;600&display=swap'

const WORK_NAV = [
  { label: 'Work', href: '#work' },
  { label: 'About', to: '/#about' },
  { label: 'Resume', href: RESUME_URL, external: true },
  { label: 'Contact', to: '/#contact' },
]

/**
 * Full issue. The homepage keeps the first two projects; this page holds every chapter.
 */
export default function MagazineWork() {
  const root = useRef(null)
  useReveal(root)

  useEffect(() => {
    document.title = 'Work — Hazel Jiang'
    const font = document.createElement('link')
    font.rel = 'stylesheet'
    font.href = FONTS
    document.head.appendChild(font)
    document.documentElement.classList.add('rd-root')
    const id = window.location.hash.slice(1)
    if (!id) window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    else requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView())
    return () => {
      font.remove()
      document.documentElement.classList.remove('rd-root')
    }
  }, [])

  return (
    <LightboxProvider>
        <HeadCtx.Provider value={MgHead}>
          <div className="rd mg" id="top" ref={root}>
            <a className="rd-skip" href="#work">
              Skip to projects
            </a>
            <Header nav={WORK_NAV} brand="/" />
            <main>
              <header className="mg-issue">
                <p className="mg-folio">
                  <b>Issue 01</b>
                </p>
                <h1 id="mg-issue-t" className="mg-issue__t">
                  Work
                </h1>
                <p className="mg-issue__sub">Six projects, from research through the interface.</p>
              </header>
              <Contents id="work" />
              {CHAPTERS.map((c, i) => {
                const Chapter = MECH[c.mech]
                return (
                  <div key={c.id} className="rd-chwrap mg-chwrap" data-dark={c.dark || undefined}>
                    <Tear seed={11 + i * 5} flip={i % 2 === 1} />
                    <Chapter c={c} />
                  </div>
                )
              })}
            </main>
            <FooterTicker />
            <Footer />
            <Cta />
            <MgCursor />
          </div>
        </HeadCtx.Provider>
    </LightboxProvider>
  )
}
