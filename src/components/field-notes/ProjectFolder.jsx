import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'

export default function ProjectFolder({ project, index }) {
  const prefersReducedMotion = useReducedMotion()
  const number = String(index).padStart(2, '0')

  const content = (
    <div className="fn-folder">
      <div className="fn-folder__tab">
        <span className="fn-folder__tab-number">{number}</span>
        <span className="fn-folder__tab-title">{project.title}</span>
      </div>

      <div className="fn-folder__grid">
        <div>
          <p className="fn-folder__meta">
            {project.role} · {project.type}
          </p>
          <p className="fn-folder__statement">{project.subtitle}</p>
          <Link to={`/projects/${project.slug}`} className="fn-folder__cta">
            View case study →
          </Link>
        </div>

        <div className="fn-folder__image-frame">
          <img
            src={project.heroImage}
            alt={`${project.title} — selected project screen`}
            loading="lazy"
            decoding="async"
            width={1600}
            height={900}
          />
        </div>
      </div>
    </div>
  )

  if (prefersReducedMotion) {
    return content
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      {content}
    </motion.div>
  )
}
