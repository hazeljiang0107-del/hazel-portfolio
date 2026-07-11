import Tag from './Tag'
import { CATEGORIES } from '../data/projects'

export default function FilterBar({ active, onChange }) {
  return (
    <div
      className="flex flex-wrap gap-2"
      role="group"
      aria-label="Filter projects by category"
    >
      {CATEGORIES.map((cat) => (
        <Tag
          key={cat}
          active={active === cat}
          onClick={() => onChange(cat)}
          variant="filter"
        >
          {cat}
        </Tag>
      ))}
    </div>
  )
}
