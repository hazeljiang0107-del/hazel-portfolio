export default function CaseStudyNav({
  sections,
  variant = 'sidebar',
  accent,
}) {
  const accentColor = accent || 'var(--color-accent-warm)'
  const links = sections.map((section) => ({ id: section.id, label: section.title }))

  if (variant === 'mobile') {
    return (
      <nav className="mb-4 lg:hidden" aria-label="Case study sections">
        <div className="flex gap-2 overflow-x-auto overscroll-x-contain border-b border-line pb-3 [-webkit-overflow-scrolling:touch]">
          {links.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className="shrink-0 border border-line px-3 py-1.5 text-xs text-ink-secondary transition hover:border-ink/20 hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </div>
      </nav>
    )
  }

  return (
    <nav className="hidden lg:block" aria-label="Case study sections">
      <p className="text-label mb-4">On this page</p>
      <ul className="space-y-1">
        {links.map((link) => (
          <li key={link.id}>
            <a
              href={`#${link.id}`}
              className="cs-nav-link block border-l-2 border-transparent py-1.5 pl-3 text-sm text-ink-muted transition hover:text-ink"
              style={{ '--nav-accent': accentColor }}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
