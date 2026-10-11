import { CHECKLIST, CAPTURE_DATE, SOURCES } from '../../data/luminipetPreviewAssets'

/** Claims whose only support is the owner's own notes, or that need a human decision. */
const CLAIMS = [
  {
    t: 'Every image carries one of three tags: My spec, I built, Live today.',
    d: '“My spec” is a crop of your audit PDF. “I built” is a screenshot of your draft (0720) or dev (0813) theme. “Live today” is luminipet.com as published on the capture date.',
  },
  {
    t: '“Live today” is worded as “specified in my audit”, not “I built”.',
    d: 'The Style Quiz, By Medium / By Style menu, trust bar, pet-parent reactions and standalone character pages are on the live store and match your spec. Nothing I have shows who built them after you left. If you built them, change COPY.liveTag, the “Live today” column in COPY.shipped and the Chapter “What I did” lines. If you did not, keep the wording.',
  },
  {
    t: 'Things in your spec that are NOT on the live store.',
    d: 'The slogan “Illuminate Every Bond” and the brand position do not appear on luminipet.com. The “Brushstroke & Detail Proof” hotspot and the 3D depth module render with zero height on the live product pages. They appear only in dev-theme captures, so they are tagged “I built”, never “Live today”.',
  },
  {
    t: 'Audit items stated as done.',
    d: 'The PDF lists “sitemap submitted” (marked 已处理), “GSC linked to GA4” and a new Business Manager. I wrote the first two as things you did. Confirm. I left the Business Manager purchase out of the “did” list because the PDF does not say who bought it.',
  },
  {
    t: 'Spec → theme trace is by name.',
    d: 'The six pairs (e.g. “3D depth & tactility” → hs-depth-tactility) match the PDF’s section names to section files in the 08-21 theme export. It shows the build follows your spec; it does not show who wrote the Liquid.',
  },
  {
    t: 'You built the navigation, the four templates and the sections.',
    d: 'The export proves these exist, not who wrote them. The copy credits you, per your project notes. Confirm.',
  },
  {
    t: 'Role label.',
    d: 'The audit covers SEO, paid media, CRM and campaigns, not only UX/UI. The role “UX/UI Design Intern” comes from your notes; adjust if it should be broader. The “Also in the audit” line claims only that these were planned.',
  },
  {
    t: 'The 70% visual / 30% text rule and the dev-theme safeguard.',
    d: 'These come only from your earlier project notes. Nothing in the screenshots proves them.',
  },
  {
    t: 'Iteration pair is a candidate.',
    d: 'The 0720 story rows and the 0813 hotspot module are real, but I cannot show that one replaced the other, or that the 0720 version is yours.',
  },
  {
    t: 'Chinese in the audit crops.',
    d: 'The tables are in Chinese with English section names. Captions are English. Decide whether to keep the originals, translate them, or redraw them.',
  },
  {
    t: 'Draft-theme content defects.',
    d: 'Menu product tiles return 404 in the draft theme. The hand-painted draft page carries “Collector’s relief art” copy, and the mug page carries “From Photo to 2D Hand-Painted Portrait” text. Fix, or re-capture, before publishing.',
  },
  {
    t: 'Not claimed anywhere.',
    d: 'No conversion, sales, traffic or usability results. The audit sets targets and a plan, not outcomes.',
  },
]

const LIMITS = [
  'Live screenshots include the store’s seasonal Halloween banner. They will date quickly; re-capture before publishing.',
  'Audit crops are taken from the PDF as exported. Some tables (e.g. the priority map) are cut off at the right edge in the PDF itself.',
  'The sticky interaction runs at 1024 px and wider. Below that, the screenshot comes first and the steps stack beneath it.',
  'Dev-theme (0813) captures were taken in a 600 px-wide browser pane, so they are narrower than the desktop frames.',
  'Region highlights are positioned by hand on the detail crops; if you swap screenshots, re-tune them in the manifest.',
  'No print product page exists in the draft theme, so that explorer tab shows a placeholder.',
]

export default function ReviewPanel() {
  return (
    <section className="lpv-review" aria-labelledby="lpv-review-h">
      <div className="lpv-wrap">
        <p className="lpv-kicker">Preview only · delete before publishing</p>
        <h2 id="lpv-review-h" className="lpv-h2">
          Review notes
        </h2>
        <p className="lpv-review__lede">
          Everything below is for you, not for visitors. Captured {CAPTURE_DATE}. Sources used:{' '}
          {Object.values(SOURCES)
            .map((s) => s.short)
            .join(' · ')}
          .
        </p>

        <div className="lpv-review__grid">
          <div>
            <h3 className="lpv-h3">Screenshots to capture</h3>
            <ul className="lpv-review__list">
              {CHECKLIST.map((c) => (
                <li key={c.file}>
                  <code>{c.file}</code> — {c.where}. <span>{c.url}.</span> {c.note}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="lpv-h3">Claims to verify</h3>
            <ul className="lpv-review__list">
              {CLAIMS.map((c) => (
                <li key={c.t}>
                  <strong>{c.t}</strong> {c.d}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="lpv-h3">Limitations</h3>
            <ul className="lpv-review__list">
              {LIMITS.map((l) => (
                <li key={l}>{l}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
