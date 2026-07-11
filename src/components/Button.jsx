import { Link } from 'react-router-dom'

const variants = {
  primary:
    'border border-ink/20 bg-ink font-medium text-base hover:bg-ink/90',
  secondary:
    'border border-line-strong bg-transparent text-ink hover:border-ink/30 hover:bg-surface',
  ghost: 'text-ink-secondary underline-offset-4 hover:text-ink hover:underline',
  link: 'text-ink-secondary underline-offset-4 hover:text-ink hover:underline p-0',
}

export default function Button({
  children,
  variant = 'primary',
  href,
  to,
  className = '',
  ...props
}) {
  const base =
    variant === 'link'
      ? 'inline-flex items-center gap-1.5 text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-warm focus-visible:ring-offset-2 focus-visible:ring-offset-base'
      : 'inline-flex items-center justify-center gap-2 rounded-sm px-5 py-2.5 text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-warm focus-visible:ring-offset-2 focus-visible:ring-offset-base'

  const classes = `${base} ${variants[variant]} ${className}`

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    )
  }

  if (href) {
    const external = href.startsWith('http') || href.startsWith('mailto')
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...props}
      >
        {children}
      </a>
    )
  }

  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  )
}
