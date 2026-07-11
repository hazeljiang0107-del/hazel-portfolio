export default function ExternalLink({ href, children, className = '', accent }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 text-sm font-medium underline-offset-4 transition hover:underline ${className}`}
      style={{ color: accent || 'var(--color-accent-warm)' }}
    >
      {children}
      <span aria-hidden="true">↗</span>
    </a>
  )
}
