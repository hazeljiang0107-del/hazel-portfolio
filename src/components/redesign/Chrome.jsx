import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { NAV, SITE } from '../../data/redesignPreview'

/** Fixed header. `mix-blend-mode: difference` keeps white type legible over the pale paper cards. */
export function Header({ nav = NAV, brand }) {
  return (
    <header className="rd-header">
      <nav className="rd-nav" aria-label="Primary">
        {brand ? (
          <Link className="rd-nav__brand" to={brand} aria-label={`${SITE.name}, all work`}>
            {SITE.name}
          </Link>
        ) : (
          <a className="rd-nav__brand" href="#top" aria-label={`${SITE.name}, back to top`}>
            {SITE.name}
          </a>
        )}
        <ul>
          {nav.map((n) => (
            <li key={n.label}>
              {n.to ? (
                <Link to={n.to}>{n.label}</Link>
              ) : n.external ? (
                <a href={n.href} target="_blank" rel="noopener noreferrer">
                  {n.label}
                </a>
              ) : (
                <a href={n.href}>{n.label}</a>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

/** Floating contact card: shows after the hero, tucks away at the footer, can be dismissed. */
export function Cta() {
  const [show, setShow] = useState(false)
  const [gone, setGone] = useState(false)

  useEffect(() => {
    let raf = 0
    const on = () => {
      raf = 0
      const vh = window.innerHeight
      const foot = document.getElementById('contact')
      const nearFoot = foot ? foot.getBoundingClientRect().top < vh * 0.85 : false
      setShow(window.scrollY > vh * 0.6 && !nearFoot)
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
    <aside className={`rd-cta${show && !gone ? ' is-on' : ''}`} aria-label="Contact" aria-hidden={!(show && !gone)}>
      <button type="button" className="rd-cta__x" onClick={() => setGone(true)} aria-label="Dismiss contact card" tabIndex={show && !gone ? 0 : -1}>
        ×
      </button>
      <p className="rd-cta__t">
        Open to
        <br />
        internships
      </p>
      <a className="rd-cta__b" href={`mailto:${SITE.email}`} tabIndex={show && !gone ? 0 : -1}>
        Email Hazel
      </a>
    </aside>
  )
}
