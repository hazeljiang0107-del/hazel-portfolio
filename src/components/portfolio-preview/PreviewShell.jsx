import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { NotesProvider, useNotes } from './notes'
import { LightboxProvider } from './Lightbox'
import { NAV, IDENTITY } from '../../data/portfolioPreview'
import '../../styles/portfolio-preview.css'

const HOME = '/preview/portfolio'

function NavLinkItem({ item, onHome }) {
  if (item.external) {
    return (
      <a className="pp-nav__a" href={item.href} target="_blank" rel="noopener noreferrer">
        {item.label}
      </a>
    )
  }
  // hash targets live on the homepage preview; from other pages route back to it
  return onHome ? (
    <a className="pp-nav__a" href={item.href}>
      {item.label}
    </a>
  ) : (
    <Link className="pp-nav__a" to={`${HOME}${item.href}`}>
      {item.label}
    </Link>
  )
}

function PreviewPill() {
  const { show, setShow } = useNotes()
  return (
    <div className="pp-pill" role="region" aria-label="Preview controls">
      <span>
        <strong>Preview</strong> · not published
      </span>
      <button type="button" aria-pressed={show} onClick={() => setShow(!show)}>
        Evidence {show ? 'on' : 'off'}
      </button>
    </div>
  )
}

function Inner({ page, children, notes, variant }) {
  const { pathname, hash } = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const { show } = useNotes()
  const onHome = pathname === HOME
  // "site" = rendered inside the portfolio's original Layout (its own dark nav, footer, ambient background)
  const site = variant === 'site'

  // preview pages are not indexable and reset scroll like a normal navigation
  useEffect(() => {
    const prevTitle = document.title
    document.title = page.title
    const meta = document.createElement('meta')
    meta.name = 'robots'
    meta.content = 'noindex, nofollow'
    document.head.appendChild(meta)
    return () => {
      document.title = prevTitle
      meta.remove()
    }
  }, [page.title])

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1))
      if (el) {
        el.scrollIntoView({ behavior: 'auto', block: 'start' })
        return
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname, hash])

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])

  if (site) {
    return (
      <div className="pp pp--site">
        <div className="pp-page" key={pathname}>
          {children}
        </div>
        {show && notes}
        <PreviewPill />
      </div>
    )
  }

  return (
    <div className="pp">
      <a className="pp-skip" href="#pp-main">
        Skip to content
      </a>
      <header className={`pp-header${scrolled ? ' is-scrolled' : ''}`}>
        <nav className="pp-nav pp-wrap" aria-label="Preview navigation">
          <Link className="pp-nav__brand" to={HOME} aria-label={`${IDENTITY.name}, preview home`}>
            {IDENTITY.name}
          </Link>
          <ul className="pp-nav__list">
            {NAV.map((n) => (
              <li key={n.label}>
                <NavLinkItem item={n} onHome={onHome} />
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main id="pp-main" className="pp-page" key={pathname}>
        {children}
      </main>

      {show && notes}
      <PreviewPill />
    </div>
  )
}

export default function PreviewShell(props) {
  return (
    <NotesProvider>
      <LightboxProvider dark={props.variant === 'site'}>
        <Inner {...props} />
      </LightboxProvider>
    </NotesProvider>
  )
}
