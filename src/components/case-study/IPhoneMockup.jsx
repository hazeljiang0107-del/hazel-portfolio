import { motion, useReducedMotion } from 'framer-motion'

export default function IPhoneMockup({
  src,
  alt,
  className = '',
  size = 'md',
  tilt = 0,
  float = false,
  priority = false,
}) {
  const prefersReducedMotion = useReducedMotion()
  const width =
    size === 'lg' ? 'w-[min(280px,78vw)]' : size === 'sm' ? 'w-[min(200px,56vw)]' : 'w-[min(240px,68vw)]'

  const shell = (
    <div
      className={`iphone-mockup ${width} ${className}`}
      style={{ '--iphone-tilt': `${tilt}deg` }}
    >
      <div className="iphone-mockup__bezel">
        <div className="iphone-mockup__island" aria-hidden="true" />
        <div className="iphone-mockup__screen">
          {src ? (
            <img
              src={src}
              alt={alt}
              className="iphone-mockup__image"
              loading={priority ? 'eager' : 'lazy'}
            />
          ) : (
            <div className="iphone-mockup__placeholder" />
          )}
        </div>
      </div>
    </div>
  )

  if (!float || prefersReducedMotion) return shell

  return (
    <motion.div
      animate={{ y: [0, -6, 0] }}
      transition={{
        duration: 5.5,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {shell}
    </motion.div>
  )
}
