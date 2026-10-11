import { TEMPLATE_MAP } from '../../data/luminipetPreviewAssets'

/**
 * Retrospective diagram (chapter B). Names come from the storefront menu capture and the
 * theme export's template file names; the drawing itself is mine, not an original artifact.
 */
export function StructureMap({ caption }) {
  const four = [
    { k: 'Gallery-Printed', t: 'product.print' },
    { k: '2D Hand-Painted', t: 'product.hand-painted' },
    { k: '3D Hand-Sculpted', t: 'product.hand-sculpted' },
    { k: 'Keepsakes', t: 'product.keepsakes' },
  ]
  return (
    <figure className="pp-map" aria-label="Before and after structure of the catalog">
      <div className="pp-map__row">
        <p className="pp-map__tag">Legacy theme</p>
        <div className="pp-map__one">
          <span>All four formats, one catalog</span>
          <i>one template</i>
        </div>
      </div>
      <div className="pp-map__row">
        <p className="pp-map__tag">Rebuilt</p>
        <ul className="pp-map__four">
          {four.map((f) => (
            <li key={f.t}>
              <span>{f.k}</span>
              <i>{f.t}</i>
            </li>
          ))}
        </ul>
      </div>
      <figcaption className="pp-cap-text">{caption}</figcaption>
    </figure>
  )
}

/** Chapter 03: shared sections on top, what each template adds underneath. */
export function TemplateMap({ caption }) {
  return (
    <figure className="pp-tmap" aria-label="Sections shared by all four product templates and sections unique to each">
      <div className="pp-tmap__shared">
        <p className="pp-tmap__tag">Shared by all four</p>
        <ul>
          {TEMPLATE_MAP.shared.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </div>
      <div className="pp-tmap__cols">
        {TEMPLATE_MAP.templates.map((t) => (
          <div key={t.id} className="pp-tmap__col">
            <p className="pp-tmap__tag">{t.label}</p>
            <ul>
              {t.unique.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <figcaption className="pp-cap-text">{caption}</figcaption>
    </figure>
  )
}