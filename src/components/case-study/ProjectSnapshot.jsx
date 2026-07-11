export default function ProjectSnapshot({ snapshot, accent }) {
  const items = [
    { label: 'Project', value: snapshot.project },
    { label: 'Type', value: snapshot.type },
    { label: 'Role', value: snapshot.role },
    { label: 'Timeline', value: snapshot.timeline },
    { label: 'Team', value: snapshot.team },
    { label: 'Tools', value: snapshot.tools },
    { label: 'Methods', value: snapshot.methods },
    { label: 'Deliverable', value: snapshot.deliverable },
  ].filter((row) => row.value).filter((item) => item.value)

  return (
    <div>
      <p className="text-chapter mb-4">Snapshot</p>
      <dl className="grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <div key={item.label} className="min-w-0 border-t border-line pt-4">
            <dt className="text-label">{item.label}</dt>
            <dd className="mt-1.5 text-sm leading-relaxed text-ink">{item.value}</dd>
          </div>
        ))}
      </dl>

      {snapshot.note && (
        <p className="mt-6 max-w-2xl text-xs text-ink-muted">{snapshot.note}</p>
      )}

      <div
        className="mt-6 h-px w-12"
        style={{ backgroundColor: accent || 'var(--color-accent-warm)' }}
        aria-hidden="true"
      />
    </div>
  )
}
