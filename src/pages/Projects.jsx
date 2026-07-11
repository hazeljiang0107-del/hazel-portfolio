import { useState, useMemo } from 'react'
import PageMeta from '../components/PageMeta'
import ProjectGrid from '../components/ProjectGrid'
import FilterBar from '../components/FilterBar'
import SectionHeader from '../components/SectionHeader'
import { SITE, projects } from '../data/projects'

export default function Projects() {
  const [filter, setFilter] = useState('All')

  const filtered = useMemo(() => {
    const sorted = [...projects].sort((a, b) => a.order - b.order)
    if (filter === 'All') return sorted
    return sorted.filter((p) => p.categories.includes(filter))
  }, [filter])

  return (
    <>
      <PageMeta
        title={`Work — ${SITE.name}`}
        description="UX and product design case studies."
      />

      <div className="px-6 pb-20 pt-28 md:pt-32">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            index={1}
            label="Portfolio"
            title="All projects"
            description="Research, product, automotive, e-commerce, and healthcare."
          />

          <div className="mb-10 border-b border-line pb-8">
            <FilterBar active={filter} onChange={setFilter} />
          </div>

          <ProjectGrid projects={filtered} variant="index" />

          {filtered.length === 0 && (
            <p className="mt-12 text-center text-ink-muted">No projects in this category.</p>
          )}
        </div>
      </div>
    </>
  )
}
