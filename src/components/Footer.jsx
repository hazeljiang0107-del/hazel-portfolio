import { Link } from 'react-router-dom'
import { SITE, RESUME_URL } from '../data/projects'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 py-14 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="font-display text-xl text-ink">{SITE.name}</p>
          <p className="mt-2 max-w-xs text-sm text-ink-muted">{SITE.tagline}</p>
          <p className="mt-4">
            <a
              href={`mailto:${SITE.email}`}
              className="text-sm text-ink-secondary transition hover:text-ink"
            >
              {SITE.email}
            </a>
          </p>
        </div>

        <div className="flex gap-12 text-sm">
          <ul className="flex flex-col gap-2">
            <li>
              <Link to="/" className="text-ink-secondary transition hover:text-ink">
                Home
              </Link>
            </li>
            <li>
              <a href="/#work" className="text-ink-secondary transition hover:text-ink">
                Work
              </a>
            </li>
            <li>
              <Link to="/about" className="text-ink-secondary transition hover:text-ink">
                About
              </Link>
            </li>
          </ul>
          <ul className="flex flex-col gap-2">
            <li>
              <a
                href={SITE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink-secondary transition hover:text-ink"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink-secondary transition hover:text-ink"
              >
                Resume
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line px-6 py-4 text-center text-xs text-ink-muted">
        © {year} {SITE.name}
      </div>
    </footer>
  )
}
