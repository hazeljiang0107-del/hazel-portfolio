import { useCallback, useEffect, useRef, useState } from 'react'
import { useMediaQuery } from '../luminipet-preview/useMediaQuery'
import { useNotes } from './notes'
import { useLightbox } from './Lightbox'
import { EVIDENCE_LABEL } from '../../data/portfolioPreview'

/** Only one clip plays at a time, even if two are on screen together. */
const playing = new Set()

function Icon({ paused }) {
  return paused ? (
    <svg viewBox="0 0 12 12" width="12" height="12" aria-hidden="true">
      <path d="M2.5 1.2v9.6L10.5 6z" fill="currentColor" />
    </svg>
  ) : (
    <svg viewBox="0 0 12 12" width="12" height="12" aria-hidden="true">
      <path d="M2.5 1.5h2.6v9H2.5zM6.9 1.5h2.6v9H6.9z" fill="currentColor" />
    </svg>
  )
}

/**
 * Silent, looping preview of a real recording.
 *  - Nothing is downloaded until the clip is within ~400 px of the viewport.
 *  - Plays only while ≥ 40% visible; pauses offscreen and when the tab is hidden.
 *  - One clip at a time. A poster is always shown first and fades out once playing.
 *  - A visible Play/Pause button works on touch and keyboard.
 *  - With prefers-reduced-motion it never autoplays; the viewer can still press Play.
 */
export default function VideoClip({ item, className = '', priority = false, enlarge = false }) {
  const { open } = useLightbox()
  const wrap = useRef(null)
  const vid = useRef(null)
  const visible = useRef(false)
  const userPaused = useRef(false)
  const [src, setSrc] = useState(priority ? item.src : null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [started, setStarted] = useState(false)
  const reduce = useMediaQuery('(prefers-reduced-motion: reduce)')
  const { show } = useNotes()

  const tryPlay = useCallback(() => {
    const v = vid.current
    if (!v || !visible.current || userPaused.current || document.hidden) return
    playing.forEach((o) => o !== v && o.pause())
    v.play().catch(() => {})
  }, [])

  // preload="none" means the browser waits for play(); kick it once the source is attached
  useEffect(() => {
    if (src) tryPlay()
  }, [src, tryPlay])

  // reduced motion: start paused, user may opt in
  useEffect(() => {
    userPaused.current = reduce
    if (reduce) vid.current?.pause()
    else tryPlay()
  }, [reduce, tryPlay])

  useEffect(() => {
    const el = wrap.current
    if (!el || typeof IntersectionObserver === 'undefined') return undefined
    const near = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSrc((s) => s || item.src)
          near.disconnect()
        }
      },
      { rootMargin: '400px 0px' },
    )
    const see = new IntersectionObserver(
      ([e]) => {
        visible.current = e.isIntersecting
        if (e.isIntersecting) tryPlay()
        else vid.current?.pause()
      },
      { threshold: 0.4 },
    )
    near.observe(el)
    see.observe(el)
    const onVis = () => (document.hidden ? vid.current?.pause() : tryPlay())
    document.addEventListener('visibilitychange', onVis)
    return () => {
      near.disconnect()
      see.disconnect()
      document.removeEventListener('visibilitychange', onVis)
      if (vid.current) playing.delete(vid.current)
    }
  }, [item.src, tryPlay])

  const toggle = () => {
    const v = vid.current
    if (!v) return
    if (v.paused) {
      userPaused.current = false
      setSrc((s) => s || item.src)
      playing.forEach((o) => o !== v && o.pause())
      v.play().catch(() => {})
    } else {
      userPaused.current = true
      v.pause()
    }
  }

  return (
    <figure className={`pp-fig pp-video ${className}`}>
      <div className="pp-fig__frame pp-video__frame" ref={wrap} style={{ aspectRatio: `${item.width} / ${item.height}` }}>
        <video
          ref={vid}
          src={src || undefined}
          poster={item.poster}
          width={item.width}
          height={item.height}
          muted
          loop
          playsInline
          preload="none"
          aria-label={item.alt}
          onPlay={(e) => {
            playing.add(e.currentTarget)
            setIsPlaying(true)
            setStarted(true)
          }}
          onPause={(e) => {
            playing.delete(e.currentTarget)
            setIsPlaying(false)
          }}
          onLoadedData={tryPlay}
        />
        {item.poster && (
          <img
            className={`pp-video__poster${started ? ' is-gone' : ''}`}
            src={item.poster}
            width={item.width}
            height={item.height}
            alt=""
            aria-hidden="true"
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
          />
        )}
        <button type="button" className="pp-video__btn" onClick={toggle} aria-label={isPlaying ? 'Pause video' : 'Play video'}>
          <Icon paused={!isPlaying} />
          <span>{isPlaying ? 'Pause' : 'Play'}</span>
        </button>
        {enlarge && (
          <button
            type="button"
            className="pp-video__btn pp-video__zoom"
            aria-haspopup="dialog"
            aria-label={`Enlarge video: ${item.caption || item.alt}`}
            onClick={() => {
              vid.current?.pause()
              open({ ...item, video: true })
            }}
          >
            <svg viewBox="0 0 12 12" width="12" height="12" aria-hidden="true">
              <path d="M1.5 4.5v-3h3M10.5 7.5v3h-3M1.5 1.5l3.5 3.5M10.5 10.5 7 7" fill="none" stroke="currentColor" strokeWidth="1.4" />
            </svg>
            <span>Enlarge</span>
          </button>
        )}
        {show && item.evidence && <span className="pp-evidence">{EVIDENCE_LABEL[item.evidence]}</span>}
      </div>
    </figure>
  )
}
