import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

function createStar(container) {
  const element = document.createElement('div')
  element.className = 'falling-stars__star'

  const size = Math.random() * 2.2 + 0.8
  element.style.width = `${size}px`
  element.style.height = `${size}px`
  element.style.left = `${Math.random() * 100}%`
  element.style.top = `${Math.random() * 100}%`

  const twinkleDuration = 2 + Math.random() * 5
  element.style.animation = `falling-star-twinkle ${twinkleDuration}s ease-in-out infinite`
  element.style.animationDelay = `${Math.random() * twinkleDuration}s`
  element.style.opacity = `${Math.random() * 0.35 + 0.15}`

  container.appendChild(element)

  return {
    element,
    speed: Math.random() * 0.22 + 0.04,
    direction: Math.random() > 0.5 ? 1 : -1,
    size,
  }
}

function createShootingStar(container) {
  const shootingStar = document.createElement('div')
  shootingStar.className = 'falling-stars__shooting'

  const startX = Math.random() * 100
  const startY = Math.random() * 35
  shootingStar.style.left = `${startX}%`
  shootingStar.style.top = `${startY}%`

  const duration = 1.1 + Math.random() * 1.6
  shootingStar.style.animation = `falling-star-shoot ${duration}s ease-out forwards`

  container.appendChild(shootingStar)

  window.setTimeout(() => {
    shootingStar.remove()
  }, duration * 1000 + 50)
}

/**
 * Twinkling star field with drifting particles and shooting stars.
 * Adapted from FallingStar (MIT-style demo) for the portfolio homepage.
 */
export default function FallingStars({
  className = '',
  starCount = 240,
  shootingInterval = 3800,
  interactive = false,
}) {
  const containerRef = useRef(null)
  const starsRef = useRef([])
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion || !containerRef.current) return undefined

    const container = containerRef.current
    const stars = Array.from({ length: starCount }, () => createStar(container))
    starsRef.current = stars

    let frameId = 0
    const animate = () => {
      stars.forEach((star) => {
        let top = parseFloat(star.element.style.top)
        let left = parseFloat(star.element.style.left)

        top += star.speed * star.direction * 0.08

        if (top > 100 || top < 0) {
          top = star.direction > 0 ? 0 : 100
          left = Math.random() * 100

          const newSize = Math.random() * 2.2 + 0.8
          star.element.style.width = `${newSize}px`
          star.element.style.height = `${newSize}px`
          star.size = newSize
        }

        star.element.style.top = `${top}%`
        star.element.style.left = `${left}%`
      })

      frameId = window.requestAnimationFrame(animate)
    }

    frameId = window.requestAnimationFrame(animate)

    const shootingTimer = window.setInterval(() => {
      createShootingStar(container)
    }, shootingInterval)

    const root = interactive ? container.closest('[data-falling-stars-root]') : null
    let lastBurst = 0

    const handlePointerMove = (event) => {
      if (!root) return

      const now = Date.now()
      if (now - lastBurst < 2200) return

      const rect = root.getBoundingClientRect()
      const x = ((event.clientX - rect.left) / rect.width) * 100
      const y = ((event.clientY - rect.top) / rect.height) * 100

      stars.forEach((star) => {
        const starX = parseFloat(star.element.style.left)
        const starY = parseFloat(star.element.style.top)
        const distance = Math.hypot(starX - x, starY - y)

        if (distance < 8) {
          star.element.style.opacity = `${Math.min(0.95, parseFloat(star.element.style.opacity) + 0.18)}`
        }
      })
    }

    const handlePointerDown = (event) => {
      if (!root || event.target.closest('a, button')) return

      const now = Date.now()
      if (now - lastBurst < 900) return
      lastBurst = now

      createShootingStar(container)
      window.setTimeout(() => createShootingStar(container), 180)
    }

    if (root) {
      root.addEventListener('pointermove', handlePointerMove, { passive: true })
      root.addEventListener('pointerdown', handlePointerDown)
    }

    return () => {
      window.cancelAnimationFrame(frameId)
      window.clearInterval(shootingTimer)
      if (root) {
        root.removeEventListener('pointermove', handlePointerMove)
        root.removeEventListener('pointerdown', handlePointerDown)
      }
      container.replaceChildren()
      starsRef.current = []
    }
  }, [prefersReducedMotion, starCount, shootingInterval, interactive])

  if (prefersReducedMotion) return null

  return (
    <div
      ref={containerRef}
      className={`falling-stars pointer-events-none absolute inset-0 overflow-hidden ${className}`.trim()}
      aria-hidden="true"
    />
  )
}
