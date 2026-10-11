import { NAV } from '../../data/luminipetPreviewAssets'
import { useReview } from './ReviewContext'

/**
 * Compact structure diagram. Names come from the captured storefront menu.
 * The “before” side is a summary of my own project notes, not a screenshot,
 * and is labeled as such.
 */
export default function StructureDiagram() {
  const { show } = useReview()
  return (
    <figure className="lpv-diagram">
      <div className="lpv-diagram__grid">
        <div className="lpv-diagram__col">
          <p className="lpv-diagram__k">Before · summary</p>
          <div className="lpv-diagram__node">Bespoke Art Collection</div>
          <div className="lpv-diagram__line" aria-hidden="true" />
          <div className="lpv-diagram__node">One product template</div>
          <p className="lpv-diagram__note">All four formats, same questions.</p>
        </div>

        <div className="lpv-diagram__arrow" aria-hidden="true">
          →
        </div>

        <div className="lpv-diagram__col lpv-diagram__col--wide">
          <p className="lpv-diagram__k">After · storefront menu</p>
          <div className="lpv-diagram__node lpv-diagram__node--head">Shop All</div>
          <div className="lpv-diagram__branches">
            <div>
              <h4>By Medium</h4>
              <ul>
                {NAV.medium.map((n) => (
                  <li key={n}>{n}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4>By Series</h4>
              <ul>
                {NAV.series.map((n) => (
                  <li key={n}>{n}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4>Custom Pet Keepsakes</h4>
              <ul>
                {NAV.keepsakes.map((n) => (
                  <li key={n}>{n}</li>
                ))}
              </ul>
            </div>
          </div>
          <p className="lpv-diagram__note">
            Each medium opens its own product template: print, hand-painted, hand-sculpted, keepsakes.
          </p>
        </div>
      </div>
      <figcaption className="lpv-cap">
        Summary diagram, not a screenshot.
        {show && ' The “before” side is reconstructed from my project notes; no earlier screenshot exists in this preview.'}
      </figcaption>
    </figure>
  )
}
