import { Link } from 'react-router-dom'
import Tag from './Tag'
import ProjectThumbnail from './ProjectThumbnail'
import StillHereCover from './StillHereCover'

export default function ProjectCard({ project, index = 0, layout = 'standard' }) {
  const accent = project.accent || 'var(--color-accent-warm)'
  const summary = project.tagline || project.summary
  const isWide = layout === 'wide'

  return (
    <article
      className={`group ${isWide ? 'md:col-span-2' : ''}`}
      style={{ animationDelay: `${index * 40}ms` }}
    >
      <Link
        to={`/projects/${project.slug}`}
        className={`flex h-full flex-col border border-line bg-elevated/40 transition-colors duration-300 hover:border-ink/15 hover:bg-surface/50 ${
          isWide ? 'md:flex-row' : ''
        }`}
      >
        <div
          className={`relative shrink-0 overflow-hidden ${
            project.slug === 'still-here' ? 'bg-[#05071a]' : 'bg-surface'
          } ${
            isWide ? 'aspect-[16/10] md:aspect-auto md:w-[52%] md:min-h-[280px]' : 'aspect-[16/10]'
          }`}
        >
          {project.slug === 'still-here' ? (
            <StillHereCover compact />
          ) : (
          <ProjectThumbnail
            src={project.thumbnail}
            alt={`${project.title} preview`}
            accent={project.accent}
            title={project.title}
          />
          )}
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
            style={{ backgroundColor: accent }}
            aria-hidden="true"
          />
        </div>

        <div className={`flex flex-1 flex-col gap-3 p-5 md:p-6 ${isWide ? 'md:justify-center' : ''}`}>
          {project.type && <p className="text-meta">{project.type}</p>}

          <h3
            className={`font-display leading-snug tracking-[-0.01em] text-ink transition-colors group-hover:text-ink-secondary ${
              isWide ? 'text-2xl md:text-3xl' : 'text-xl'
            }`}
          >
            {project.title}
          </h3>

          {summary && (
            <p className={`text-sm leading-relaxed text-ink-secondary ${isWide ? '' : 'line-clamp-2'}`}>
              {summary}
            </p>
          )}

          <div className="flex flex-wrap gap-2 pt-1">
            {project.categories?.slice(0, 3).map((cat) => (
              <Tag key={cat} accent={project.accent}>
                {cat}
              </Tag>
            ))}
          </div>

          <div className="mt-auto flex items-center justify-between gap-3 border-t border-line pt-4 text-xs text-ink-muted">
            <span>{project.role}</span>
            <span>{project.timeline}</span>
          </div>
        </div>
      </Link>
    </article>
  )
}
