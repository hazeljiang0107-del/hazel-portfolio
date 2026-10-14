import { SITE } from '../../data/projects'

/**
 * Compact index-card About panel.
 * Uses the site's actual SITE.education data (University of Michigan,
 * Ann Arbor) — NOT the "Columbia / New York" detail from the brief,
 * which doesn't match the current site content. Flagged separately
 * in the chat response; update here if that detail is confirmed.
 */
export default function FieldNotesAbout() {
  const rows = [
    { label: 'School', value: SITE.education.school },
    { label: 'Program', value: SITE.education.detail },
    { label: 'Based', value: 'Ann Arbor, MI' },
    { label: 'Status', value: SITE.status },
  ]

  return (
    <section className="fn-about">
      <div className="fn-index-card">
        <span className="fn-index-card__hole fn-index-card__hole--left" aria-hidden="true" />
        <span className="fn-index-card__hole fn-index-card__hole--right" aria-hidden="true" />

        <h2 className="fn-index-card__heading">About</h2>
        <p className="fn-index-card__copy">
          UX design background with a biopsychology, cognition, and neuroscience minor — I design
          interfaces by first understanding how people actually read, decide, and trust.
        </p>

        <div className="fn-index-card__rows">
          {rows.map((row) => (
            <div className="fn-index-card__row" key={row.label}>
              <span className="fn-index-card__row-label">{row.label}</span>
              <span className="fn-index-card__row-value">{row.value}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
