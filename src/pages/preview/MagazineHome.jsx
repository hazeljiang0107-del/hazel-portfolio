import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Arrow, LightboxProvider, HeadCtx } from '../../components/redesign/ui'
import { Header, Cta } from '../../components/redesign/Chrome'
import { Footer } from '../../components/redesign/Sections'
import { MECH } from '../../components/redesign/chapters'
import { useReveal } from '../../components/redesign/scrollFx'
import { FEATURED } from '../../data/magazine'
import { RESUME_URL } from '../../data/projects'
import { Cover, FooterTicker } from '../../components/magazine/Cover'
import { MgHead } from '../../components/magazine/Head'
import { MgCursor } from '../../components/magazine/Cursor'
import { Tear } from '../../components/magazine/paper'
import '../../styles/redesign-preview.css'
import '../../styles/magazine.css'

const FONTS =
  'https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;600;700&family=Caveat:wght@500;600&family=Fraunces:ital,opsz,wght@1,9..144,400;1,9..144,600&family=IBM+Plex+Mono:wght@400;500&family=Inter:wght@300;400;500;600&display=swap'

const HOME_NAV = [
  { label: 'Work', to: '/work' },
  { label: 'About', href: '#about' },
  { label: 'Resume', href: RESUME_URL, external: true },
  { label: 'Contact', href: '#contact' },
]

/**
 * Live homepage — printed magazine with a collaged desk: About letter + polaroid on the
 * cover, postcards, clipped-note takeaways, torn paper, tape, stamps and handwriting.
 */
export default function MagazineHome() {
  const root = useRef(null)
  useReveal(root)

  useEffect(() => {
    document.title = 'Hazel Jiang — UX / Product Design Portfolio'
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
            <Header nav={HOME_NAV} />
            <main>
              <Cover />
              <section id="work" className="mg-selected" aria-labelledby="mg-selected-t">
                {FEATURED.map((c, i) => {
                  const Chapter = MECH[c.mech]
                  return (
                    <div key={c.id} className="rd-chwrap mg-chwrap" data-dark={c.dark || undefined}>
                      <Tear seed={11 + i * 5} flip={i % 2 === 1} />
                      {i === 0 && (
                        <header className="mg-selected__head">
                          <h2 id="mg-selected-t">Selected work</h2>
                        </header>
                      )}
                      <Chapter c={c} />
                    </div>
                  )
                })}
                <p className="mg-selected__all">
                  <Link className="mg-pill" to="/work">
                    View all <Arrow />
                  </Link>
                </p>
              </section>
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
