import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { SITE, RESUME_URL } from '../data/projects'

const links = [
  { to: '/', label: 'Home', isHome: true },
  { to: '/#work', label: 'Work', isHash: true },
  { to: '/about', label: 'About' },
  { to: RESUME_URL, label: 'Resume', external: true },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [pastHero, setPastHero] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'
  const cinematic = isHome && !pastHero

  useEffect(() => {
    setOpen(false)
  }, [location])

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24)
      setPastHero(window.scrollY > window.innerHeight * 0.75)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [location.pathname])

  const linkClass = (active = false) => {
    if (cinematic) {
      return `text-sm font-medium uppercase tracking-[0.08em] transition-colors ${
        active ? 'text-white' : 'text-[hsl(240_4%_66%)] hover:text-white'
      }`
    }
    return `text-sm font-medium uppercase tracking-[0.08em] transition-colors ${
      active ? 'text-ink' : 'text-ink-secondary hover:text-ink'
    }`
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        cinematic
          ? 'bg-transparent'
          : scrolled
            ? 'border-b border-line bg-base/90 backdrop-blur-md'
            : 'bg-transparent'
      }`}
    >
      <nav
        className="relative z-10 mx-auto flex max-w-7xl flex-row items-center justify-between px-8 py-6"
        aria-label="Main navigation"
      >
        <Link
          to="/"
          className={`text-3xl tracking-tight transition ${
            cinematic ? 'text-white hover:text-white/80' : 'font-display text-lg text-ink hover:text-ink-secondary'
          }`}
          style={cinematic ? { fontFamily: "'Instrument Serif', serif" } : undefined}
        >
          HJ
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map(({ to, label, external, isHash, isHome: homeLink }) => (
            <li key={label}>
              {external ? (
                <a
                  href={to}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass()}
                >
                  {label}
                </a>
              ) : isHash ? (
                <a href={to} className={linkClass()}>
                  {label}
                </a>
              ) : homeLink ? (
                <NavLink to={to} className={({ isActive }) => linkClass(isActive)}>
                  {label}
                </NavLink>
              ) : (
                <NavLink to={to} className={({ isActive }) => linkClass(isActive)}>
                  {label}
                </NavLink>
              )}
            </li>
          ))}
          <li>
            <a
              href={`mailto:${SITE.email}`}
              className={`liquid-glass type-nav rounded-full px-6 py-2.5 ${
                cinematic ? 'text-white' : 'text-ink'
              }`}
            >
              Contact
            </a>
          </li>
        </ul>

        <button
          type="button"
          className={`flex h-9 w-9 items-center justify-center md:hidden ${
            cinematic ? 'text-white' : 'text-ink-secondary'
          }`}
          aria-expanded={open}
          aria-label="Toggle menu"
          onClick={() => setOpen(!open)}
        >
          {open ? '✕' : '☰'}
        </button>
      </nav>

      {open && (
        <div
          className={`px-6 py-4 md:hidden ${
            cinematic ? 'liquid-glass mx-4 mb-4 rounded-2xl' : 'border-t border-line bg-base'
          }`}
        >
          <ul className="flex flex-col gap-3">
            {links.map(({ to, label, external, isHash }) => (
              <li key={label}>
                {external ? (
                  <a
                    href={to}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClass()}
                  >
                    {label}
                  </a>
                ) : isHash ? (
                  <a href={to} className={linkClass()}>
                    {label}
                  </a>
                ) : (
                  <NavLink to={to} className={({ isActive }) => linkClass(isActive)}>
                    {label}
                  </NavLink>
                )}
              </li>
            ))}
            <li>
              <a href={`mailto:${SITE.email}`} className={linkClass(true)}>
                Contact
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
