export default function SectionHeader({ label, title, description, action, index }) {
  return (
    <div className="mb-12 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {label && (
          <p className="type-eyebrow mb-3">
            {index != null ? `${String(index).padStart(2, '0')} — ${label}` : label}
          </p>
        )}
        <h2 className="type-display type-display-lg">{title}</h2>
        {description && (
          <p className="type-body mt-4 max-w-lg">{description}</p>
        )}
      </div>
      {action}
    </div>
  )
}
