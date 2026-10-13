import { useEffect, useRef } from 'react'
import { LightboxProvider, HeadCtx } from '../../components/redesign/ui'
import { Header, Cta } from '../../components/redesign/Chrome'
import { Footer } from '../../components/redesign/Sections'
import { MECH } from '../../components/redesign/chapters'
import { useReveal } from '../../components/redesign/scrollFx'
import { CHAPTERS } from '../../data/magazine'
import { Cover, Contents, FooterTicker } from '../../components/magazine/Cover'
import { PostcardWall } from '../../components/magazine/Postcards'
import { MgHead } from '../../components/magazine/Head'
import { NoteProvider } from '../../components/magazine/Note'
import { MgCursor } from '../../components/magazine/Cursor'
import { Tear } from '../../components/magazine/paper'
import '../../styles/redesign-preview.css'
import '../../styles/magazine.css'

const FONTS =
  'https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;600;700&family=Caveat:wght@500;600&family=Fraunces:ital,opsz,wght@1,9..144,400;1,9..144,600&family=IBM+Plex+Mono:wght@400;500&family=Inter:wght@300;400;500;600&display=swap'

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
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    return () => {
      font.remove()
      document.documentElement.classList.remove('rd-root')
    }
  }, [])

  return (
    <LightboxProvider>
      <NoteProvider>
        <HeadCtx.Provider value={MgHead}>
          <div className="rd mg" id="top" ref={root}>
            <a className="rd-skip" href="#work">
              Skip to projects
            </a>
            <Header />
            <main>
              <Cover />
              <Contents />
              <PostcardWall />
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
      </NoteProvider>
    </LightboxProvider>
  )
}
