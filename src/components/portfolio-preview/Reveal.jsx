import { useLayoutEffect, useRef } from 'react'

/**
 * Section entrance that never hides content.
 *
 * The element is fully visible by default. Only if it starts below the fold does JS
 * mark it `data-pre` (14 px down, 55% opacity); an IntersectionObserver clears the mark
 * as it scrolls in and CSS transitions it over ~450 ms. Without JS, or with
 * prefers-reduced-motion, nothing is ever offset or dimmed.
 */
export default function Reveal({ as: Tag = 'div', className = '', children, ...rest }) {
  const ref = useRef(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') return undefined
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return undefined
    el.setAttribute('data-pre', '')
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.removeAttribute('data-pre')
          io.disconnect()
        }
      },
      { rootMargin: '0px 0px -8% 0px' },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      el.removeAttribute('data-pre')
    }
  }, [])

  return (
    <Tag ref={ref} className={`pp-reveal ${className}`} {...rest}>
      {children}
    </Tag>
  )
}
