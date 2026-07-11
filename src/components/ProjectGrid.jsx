import CoverSpread, { getEditorialLayout } from './CoverSpread'
import ProjectIndexRow from './ProjectIndexRow'
import ProjectCard from './ProjectCard'

export default function ProjectGrid({ projects, variant = 'editorial' }) {
  const sorted = [...projects].sort((a, b) => a.order - b.order)

  if (variant === 'index') {
    return (
      <div className="border-t border-line">
        {sorted.map((project, i) => (
          <ProjectIndexRow
            key={project.id}
            project={project}
            index={i + 1}
            variant="editorial"
            animate
          />
        ))}
      </div>
    )
  }

  if (variant === 'editorial') {
    const featured = sorted.find((p) => p.featuredSize === 'large') || sorted[0]
    const rest = sorted.filter((p) => p.id !== featured?.id)
    let rowIndex = 2

    return (
      <div>
        {featured && (
          <CoverSpread project={featured} index={1} layout={getEditorialLayout(1)} />
        )}
        {rest.length > 0 && (
          <div className="border-b border-line">
            {rest.map((project) => (
              <ProjectIndexRow key={project.id} project={project} index={rowIndex++} />
            ))}
          </div>
        )}
      </div>
    )
  }

  if (variant === 'mixed') {
    return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {sorted.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            layout={index === 0 ? 'wide' : 'standard'}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {sorted.map((project, index) => (
        <ProjectCard key={project.id} project={project} index={index} />
      ))}
    </div>
  )
}
