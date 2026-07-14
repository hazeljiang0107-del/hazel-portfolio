import { useEffect, useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

const PLAYBACK_RATE = 0.7

/**
 * Hero media for Echoes — slowed walkthrough with cinematic drift.
 */
export default function EchoesCover({
  src = '/assets/echoes/demo/echoes-walkthrough.mp4',
  poster = '/assets/echoes/demo/hero-poster.jpg',
}) {
  const prefersReducedMotion = useReducedMotion()
  const videoRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video || prefersReducedMotion) return
    video.playbackRate = PLAYBACK_RATE
    const applyRate = () => {
      video.playbackRate = PLAYBACK_RATE
    }
    video.addEventListener('loadedmetadata', applyRate)
    video.addEventListener('play', applyRate)
    return () => {
      video.removeEventListener('loadedmetadata', applyRate)
      video.removeEventListener('play', applyRate)
    }
  }, [prefersReducedMotion])

  return (
    <div className="echoes-cover">
      {prefersReducedMotion ? (
        <img src={poster} alt="" className="echoes-cover__media" />
      ) : (
        <motion.div
          className="echoes-cover__stage"
          initial={{ scale: 1.08, opacity: 0.7 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <video
            ref={videoRef}
            className="echoes-cover__media echoes-cover__media--drift"
            src={src}
            poster={poster}
            autoPlay
            muted
            loop
            playsInline
            aria-label="Echoes You Can Touch gameplay walkthrough"
          />
        </motion.div>
      )}
      <div className="echoes-cover__sheen" aria-hidden="true" />
      <div className="echoes-cover__gradient" />
      <motion.div
        className="echoes-cover__label"
        initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="echoes-cover__live" />
        In-engine walkthrough
      </motion.div>
    </div>
  )
}
