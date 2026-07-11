/**
 * Site-wide atmosphere: warm vignette + film grain.
 * Grain is a live SVG (filters are unreliable as CSS background-image).
 */
export default function AmbientBackground() {
  return (
    <>
      <div className="site-atmosphere" aria-hidden="true">
        <div className="site-atmosphere__wash" />
      </div>
      <svg className="site-grain" aria-hidden="true">
        <defs>
          <filter id="site-film-grain" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.75"
              numOctaves="3"
              stitchTiles="stitch"
              result="noise"
            />
            <feColorMatrix
              in="noise"
              type="matrix"
              values="0 0 0 0 0.94
                      0 0 0 0 0.91
                      0 0 0 0 0.84
                      0 0 0 0.5 0"
            />
          </filter>
        </defs>
        <rect width="100%" height="100%" filter="url(#site-film-grain)" />
      </svg>
    </>
  )
}
