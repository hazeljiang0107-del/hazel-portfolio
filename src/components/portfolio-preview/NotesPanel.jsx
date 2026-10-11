/** Preview-only review notes. Shown when “Evidence” is switched on; delete before publishing. */
export default function NotesPanel({ title, sections }) {
  return (
    <section className="pp-notes" aria-labelledby="pp-notes-h">
      <div className="pp-wrap">
        <p className="pp-eyebrow">Preview only · delete before publishing</p>
        <h2 id="pp-notes-h" className="pp-notes__h">
          {title}
        </h2>
        <div className="pp-notes__grid">
          {sections.map((s) => (
            <div key={s.title}>
              <h3 className="pp-eyebrow">{s.title}</h3>
              <ul>
                {s.items.map((it, i) => (
                  <li key={i}>
                    {it.head && <strong>{it.head} </strong>}
                    {it.body ?? it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
