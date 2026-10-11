import { TEMPLATE_MAP } from '../../data/luminipetPreviewAssets'

/**
 * Which Liquid sections each product template uses. Derived from the
 * templates/product.*.json files in the 2026-08-21 theme export.
 */
export default function TemplateMap() {
  return (
    <figure className="lpv-tmap">
      <div className="lpv-tmap__shared">
        <p className="lpv-tmap__k">Shared by all four templates</p>
        <ul>
          {TEMPLATE_MAP.shared.map((s) => (
            <li key={s}>
              <code>{s}</code>
            </li>
          ))}
        </ul>
      </div>
      <div className="lpv-tmap__cols">
        {TEMPLATE_MAP.templates.map((t) => (
          <div key={t.id}>
            <p className="lpv-tmap__k">{t.label}</p>
            <p className="lpv-tmap__tid">
              <code>{t.id}</code>
            </p>
            <ul>
              {t.unique.map((s) => (
                <li key={s}>
                  <code>{s}</code>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <figcaption className="lpv-cap">
        Summary from the theme export dated 2026-08-21 (<code>templates/product.*.json</code>). Section names are as
        exported.
      </figcaption>
    </figure>
  )
}
