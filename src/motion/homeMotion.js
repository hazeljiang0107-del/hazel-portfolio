/** Shared homepage motion tokens — editorial, no spring/bounce */
export const HOME_EASE = [0.22, 1, 0.36, 1]

export const HOME_VIEWPORT = { once: true, margin: '-72px' }

export const sectionEntrance = {
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.95, ease: HOME_EASE },
}

export const imageEntrance = {
  initial: { opacity: 0, scale: 1.03 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 1.05, ease: HOME_EASE },
}

export const copyEntrance = (delay = 0.18) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease: HOME_EASE },
})

export const indexEntrance = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.85, delay, ease: HOME_EASE },
})

export const imageHover = {
  scale: 1.02,
  transition: { duration: 0.55, ease: HOME_EASE },
}

/** Selected work carousel — editorial slide, no springs */
export const CAROUSEL_EASE = HOME_EASE

export const carouselSlide = {
  duration: 0.72,
  ease: CAROUSEL_EASE,
}

export const carouselImage = {
  duration: 0.82,
  ease: CAROUSEL_EASE,
}

export const carouselMeta = {
  duration: 0.38,
  ease: CAROUSEL_EASE,
}

export const carouselTitle = {
  duration: 0.58,
  ease: CAROUSEL_EASE,
}

export const carouselBg = {
  duration: 0.9,
  ease: CAROUSEL_EASE,
}

export const carouselPeek = {
  duration: 0.55,
  ease: CAROUSEL_EASE,
}

export const DRAG_VELOCITY_THRESHOLD = 420
export const DRAG_OFFSET_THRESHOLD = 56
