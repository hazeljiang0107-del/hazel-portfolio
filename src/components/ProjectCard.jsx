import { Link } from 'react-router-dom'
import Tag from './Tag'
import ProjectThumbnail from './ProjectThumbnail'
import StillHereCover from './StillHereCover'

export default function ProjectCard({ project, index = 0, layout = 'standard' }) {
  const accent = project.accent || 'var(--color-accent)'
  const summary = project.tagline || project.summary
  const isWide = layout === 'wide'

  return (
    <article
      className={`group ${isWide ? 'md:col-span-2' : ''}`}
      style={{ animationDelay: `${index * 40}ms` }}
    >
      <Link to={`/projects/${project.slug}`} className="flex h-full flex-col gap-4">
        <div
          className={`relative shrink-0 overflow-hidden rounded-[1.75rem] ring-1 ring-white/[0.06] transition duration-500 group-hover:ring-white/[0.12] ${
            project.slug === 'still-here' ? 'bg-[#05071a]' : 'bg-surface'
          } ${
            isWide ? 'aspect-[16/10] md:aspect-[21/11]' : 'aspect-[16/10]'
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
        </div>

        <div className="flex flex-1 flex-col gap-2 px-1">
          {project.type && <p className="text-meta">{project.type}</p>}

          <h3
            className={`font-sans font-semibold tracking-[-0.02em] text-ink transition group-hover:text-ink-secondary ${
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

          <div className="mt-auto flex flex-wrap items-center gap-2 pt-2">
            {project.categories?.slice(0, 2).map((cat) => (
              <Tag key={cat} accent={accent}>
                {cat}
              </Tag>
            ))}
            <span className="ml-auto text-xs text-ink-muted">{project.timeline}</span>
          </div>
        </div>
      </Link>
    </article>
  )
}
