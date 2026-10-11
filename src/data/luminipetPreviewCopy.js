/**
 * LuminiPet case-study PREVIEW — narrative copy.
 *
 * Deliberately short: the screenshots carry the story. Every line is traceable to
 *   (a) the owner's audit PDF (Luminipet独立站盘点, Jul 2026),
 *   (b) a captured screenshot (draft/dev theme or the published store),
 *   (c) the 2026-08-21 theme export, or
 *   (d) the existing LuminiPet entry in src/data/projects.js (owner's notes).
 * Claims that rest on (d) alone are listed in the preview's “Review notes” panel.
 *
 * Attribution rule used throughout:
 *   “I specified” → the audit PDF says it. “I built” → the owner's notes say it
 *   and the theme export contains it. “Live today” → visible on luminipet.com
 *   and matches the audit spec, but who built it is NOT shown by any artifact.
 */

export const COPY = {
  metaRow: [
    { label: 'Role', value: 'UX/UI Design Intern' },
    { label: 'Timeline', value: 'Jul – Aug 2026 · Senaura' },
    { label: 'Scope', value: 'Site audit, navigation, product templates, Shopify Liquid' },
  ],
  liveUrl: 'https://luminipet.com/',

  hero: {
    headline: 'I audited a flat pet-portrait store, then specified and built its structure.',
    sentence:
      'LuminiPet sells four kinds of custom pet art on Shopify. My audit decided what to fix first. Then I specified every page and built the navigation and product templates.',
  },

  method: {
    kicker: '01 · Method',
    heading: 'How I read the site.',
    steps: [
      { t: 'Inventory', d: 'Every page, setting and tracking gap.' },
      { t: 'Diagnose', d: 'Issue, impact, direction.' },
      { t: 'Prioritize', d: 'P0 to P3 on one table.' },
      { t: 'Specify', d: 'Section order, page by page.' },
    ],
    facts: [
      { n: '59', l: 'pages of audit' },
      { n: '11', l: 'workstreams' },
      { n: 'P0–P3', l: 'priority tiers' },
    ],
    setup: 'Inventory also found the sitemap unreadable. I submitted it and linked analytics.',
  },

  liveTag: 'Specified in my audit. Live today.',

  chapters: {
    home: {
      kicker: '02 · Homepage',
      heading: 'Proof before promise.',
      finding: 'The first screen promised more than it showed.',
      fix: 'I specified a proof-first order: before/after, format chooser, reasons to trust, reactions.',
    },
    a: {
      kicker: '03 · Routes',
      heading: 'Choose the format first.',
      finding: 'Shoppers had no format-first route into the catalog.',
      fix: 'I specified a three-level menu, then rebuilt Shop All by medium, series and keepsake.',
    },
    b: {
      kicker: '04 · Product pages',
      heading: 'One page, one decision.',
      finding: 'Every character was a variant on one page.',
      fix: 'I specified standalone pages and one four-step order path, then built each format’s option set.',
      annotations: [
        'Hand-painted: six canvas sizes and a frame finish.',
        'Hand-sculpted: adds Portrait Style and offers two sizes.',
        'Shared: pet count and the Customize, Upload, Complete bar.',
      ],
    },
    c: {
      kicker: '05 · System',
      heading: 'One spec, four builds.',
      finding: 'Each format has to prove something different.',
      fix: 'I wrote the section order per format, then built each section once as reusable Liquid.',
      lead: 'Each tab is a real screen from that format’s page.',
    },
  },

  iteration: {
    kicker: '06 · Iteration',
    heading: 'From text rows to visual proof.',
    earlier: 'Generic text-and-image rows and accordion copy.',
    change: 'Handmade work has to be seen, not read. I set a 70% visual, 30% text rule for proof modules.',
    final: 'Hotspots and a stepped process replaced paragraphs.',
  },

  shipped: {
    kicker: '07 · What I did',
    heading: 'What I did',
    columns: [
      {
        t: 'Audited',
        items: ['59-page audit and P0–P3 map', 'Sitemap, GA4 link, new Business Manager'],
      },
      {
        t: 'Specified',
        items: [
          'Homepage order',
          'Menu and collection pages',
          'Section order for every product page',
          'Four-step order path',
          'Brand position and slogan',
        ],
      },
      {
        t: 'Built',
        items: [
          'Shop All structure',
          'Four product templates',
          'Format-specific proof modules',
          'A separate dev theme',
        ],
      },
      {
        t: 'Live today',
        items: ['By Medium / By Style menu', 'Style Quiz', 'Trust bar', 'Pet-parent reactions'],
      },
    ],
    also: 'Also in the audit: SEO, brand, paid media, campaigns, CRM.',
    takeaway: 'The brand stayed fixed. I changed what a shopper chooses first and what each format has to prove.',
  },
}

export function wordCount() {
  const bits = []
  const walk = (v) => {
    if (typeof v === 'string') bits.push(v)
    else if (Array.isArray(v)) v.forEach(walk)
    else if (v && typeof v === 'object') Object.values(v).forEach(walk)
  }
  const { metaRow, liveUrl, ...narrative } = COPY
  walk(narrative)
  // kickers like "01 · Routes" are navigation labels, not narrative
  const text = bits.filter((b) => !/^\d\d · /.test(b)).join(' ')
  return text.split(/\s+/).filter(Boolean).length
}
