export default function Tag({
  children,
  accent,
  active,
  onClick,
  variant = 'default',
  className = '',
}) {
  const isFilter = variant === 'filter' || onClick

  const base = isFilter
    ? `rounded-sm border px-3 py-1.5 text-xs font-medium transition-colors duration-200 ${
        active
          ? 'border-ink/25 bg-surface text-ink'
          : 'border-line bg-transparent text-ink-secondary hover:border-ink/20 hover:text-ink'
      }`
    : `text-meta inline-block rounded-sm border border-line px-2 py-0.5 text-[11px] text-ink-secondary`

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-pressed={active}
        className={`${base} ${className}`}
        style={active && accent ? { borderColor: `${accent}55`, color: accent } : undefined}
      >
        {children}
      </button>
    )
  }

  return (
    <span
      className={`${base} ${className}`}
      style={accent ? { borderColor: `${accent}33`, color: accent } : undefined}
    >
      {children}
    </span>
  )
}
