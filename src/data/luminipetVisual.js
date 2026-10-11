/**
 * LuminiPet case study, visual version (/preview/projects/luminipet-visual).
 * Every string a visitor reads by default lives here, so the main-copy budget (150–250 words)
 * can be counted in one place. Expandable detail (problem table, priority map, full menu) and
 * evidence flags are not part of the count.
 *
 * Attribution:
 *   “Built”  – in the dev theme “Backend Lumini Dev Export 20260813”, per the project notes
 *              (navigation, four product templates, homepage sections, proof modules).
 *   “Audit”  – my 59-page audit PDF.
 *   “Live”   – luminipet.com today; specified in my audit, builder not shown by any artifact.
 */
export const VIS = {
  hero: {
    title: 'LuminiPet: four formats, four paths',
    line: 'I audited a live Shopify store, then redesigned and built its menu and product pages.',
    meta: 'UX/UI Design Intern · Senaura · Jul–Aug 2026',
    cap: 'luminipet.com today.',
  },
  problem: {
    h: 'One catalog, four products',
    line: 'My audit named 21 problems; the biggest was four formats in one catalog.',
    mapCap: 'Redrawn from my audit.',
  },
  menu: {
    h: 'Format first, then style',
    notes: [
      ['Changed', 'Shop All splits by medium, then style.'],
      ['Why', 'Format sets price and craft.'],
      ['Built', 'Both menu levels.'],
    ],
    quiz: ['Built', 'A three-question style quiz.'],
  },
  pages: {
    h: 'Each format asks its own questions',
    notes: [
      ['Changed', 'One template became four.'],
      ['Built', 'All four templates in Liquid.'],
    ],
    painted: ['Six canvas sizes.', 'Three frame finishes.'],
    sculpted: ['Adds Portrait Style.', 'Two sizes, three frames.'],
  },
  home: {
    h: 'Homepage answers the audit',
    items: [
      ['First screen proves nothing', 'Pet beside its 2D and 3D piece.'],
      ['3D difference not up front', 'Relief close-ups and side depth.'],
      ['Memorial easy to miss', 'Gift and memorial cards.'],
    ],
  },
  proof: {
    h: 'Proof you can tap',
    line: 'Handmade work has to be seen: 70% visual, 30% text.',
    clips: {
      hpDetail: 'Tap to inspect brushwork.',
      hsDepth: 'Zoom into relief depth.',
      hsLight: 'One relief, three lights.',
      hpCanvas: 'Six steps, one tap each.',
    },
  },
  iteration: {
    h: 'From text rows to visual proof',
    earlier: 'Earlier: text rows, FAQ accordion.',
    final: 'Final: same claim, tappable media.',
  },
  system: {
    h: 'One section library, four templates',
    cap: 'Built: shared sections, plus each format’s own.',
  },
  search: {
    h: 'Findable before ads',
    cap: 'Changed: submitted the sitemap and linked GA4.',
  },
  lesson: {
    h: 'What this taught me',
    quote: 'The brand stayed fixed; I changed what shoppers choose first and what pages prove.',
  },
}

/** Evidence flags: shown on the page, not counted as main copy. */
export const FLAGS = {
  before: 'Missing: a screenshot of the old catalog. Add one from Shopify theme history.',
  earlier: 'Needs your confirmation: this frame is from the 0720 draft theme; I can’t prove it predates the final module.',
}

const words = (s) => s.split(/\s+/).filter((w) => /[\p{L}\p{N}]/u.test(w)).length

/** Main copy a visitor reads by default: headings, sentences, captions, labels. */
export function visualWordCount() {
  const v = VIS
  const parts = [
    ...Object.values(v.hero),
    ...Object.values(v.problem),
    v.menu.h,
    ...v.menu.notes.flat(),
    ...v.menu.quiz,
    v.pages.h,
    ...v.pages.notes.flat(),
    ...v.pages.painted,
    ...v.pages.sculpted,
    'Hand-painted Hand-sculpted',
    v.home.h,
    ...v.home.items.flat(),
    ...v.home.items.map(() => 'Audit Built'),
    v.proof.h,
    v.proof.line,
    ...Object.values(v.proof.clips),
    'Built in my dev theme',
    ...Object.values(v.iteration),
    ...Object.values(v.system),
    ...Object.values(v.search),
    'pages found in Search Console Before After',
    ...Object.values(v.lesson),
  ]
  return parts.reduce((n, s) => n + words(s), 0)
}
