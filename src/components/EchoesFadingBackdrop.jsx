import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

const CLIPS = [
  { src: '/assets/echoes/demo/bg-portals.mp4', motion: 'drift-in' },
  { src: '/assets/echoes/demo/bg-tent.mp4', motion: 'drift-left' },
  { src: '/assets/echoes/demo/bg-carnival.mp4', motion: 'drift-right' },
  { src: '/assets/echoes/demo/bg-bedroom.mp4', motion: 'drift-out' },
]

const HOLD_MS = 12000
const PLAYBACK_RATE = 0.62

/**
 * Full-page ambient backdrop: slow crossfades + Ken Burns drift
 * behind the Echoes case study.
 */
export default function EchoesFadingBackdrop() {
  const prefersReducedMotion = useReducedMotion()
  const [active, setActive] = useState(0)
  const videosRef = useRef([])

  useEffect(() => {
    if (prefersReducedMotion) return undefined

    const id = window.setInterval(() => {
      setActive((prev) => (prev + 1) % CLIPS.length)
    }, HOLD_MS)

    return () => window.clearInterval(id)
  }, [prefersReducedMotion])

  useEffect(() => {
    if (prefersReducedMotion) return

    videosRef.current.forEach((video, i) => {
      if (!video) return
      video.playbackRate = PLAYBACK_RATE
      if (i === active) {
        video.play().catch(() => {})
      } else {
        video.pause()
      }
    })
  }, [active, prefersReducedMotion])

  if (prefersReducedMotion) {
    return (
      <div className="echoes-backdrop" aria-hidden="true">
        <div
          className="echoes-backdrop__static"
          style={{ backgroundImage: "url('/assets/echoes/demo/hero-poster.jpg')" }}
        />
        <div className="echoes-backdrop__veil" />
      </div>
    )
  }

  return (
    <div className="echoes-backdrop" aria-hidden="true">
      {CLIPS.map((clip, i) => (
        <video
          key={clip.src}
          ref={(el) => {
            videosRef.current[i] = el
            if (el) el.playbackRate = PLAYBACK_RATE
          }}
          className={`echoes-backdrop__clip echoes-backdrop__clip--${clip.motion} ${
            i === active ? 'is-active' : ''
          }`}
          src={clip.src}
          muted
          playsInline
          loop
          preload={i === 0 ? 'auto' : 'metadata'}
        />
      ))}
      <div className="echoes-backdrop__glow echoes-backdrop__glow--a" />
      <div className="echoes-backdrop__glow echoes-backdrop__glow--b" />
      <div className="echoes-backdrop__veil" />
    </div>
  )
}
