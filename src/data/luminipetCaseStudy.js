/**
 * LuminiPet case study (/preview/projects/luminipet) — narrative copy.
 *
 * Structure follows Nadia Malik's case studies (Oracle Navigator, Lume Health):
 *   hook title → meta strip → PROBLEM / THE BET / RESULT + facts → “The problem” scene →
 *   first workstream (PROBLEM · RESEARCH · INSIGHT) → the bigger issue as a headline →
 *   “What I built” numbered list + views → iteration (earlier vs final) →
 *   Must / Should / Later → what shipped → “What this taught me”.
 *
 * Images, alt text and evidence status live in src/data/luminipetPreviewAssets.js; the
 * problem list lives in src/data/luminipetProblems.js. Every claim below is traceable to
 * my audit PDF (page noted), my project notes, or the 2026-08-21 theme export.
 *
 * Attribution: “I specified” → the audit says it. “I built” → my notes + the theme export.
 * The live store has changed since; live screenshots are captioned as “today”, not as built.
 */

import { MENU_STEPS } from './luminipetPreviewAssets'

export const CASE = {
  slug: 'luminipet-shopify',
  liveUrl: 'https://luminipet.com/',

  hero: {
    title: 'LuminiPet: Turning a Flat Catalog into Four Shopping Paths',
    subtitle:
      'A summer internship on a live Shopify store. I wrote a 59-page audit, then specified and built the navigation and product templates that answer it.',
  },

  meta: [
    { label: 'Timeline', value: 'Jul – Aug 2026' },
    { label: 'Role', value: 'UX/UI Design Intern, Senaura' },
    { label: 'Platform', value: 'Shopify storefront, Liquid theme' },
    { label: 'Tools', value: 'Shopify, Liquid, Search Console, GA4' },
  ],

  // audit p. 1–4 (bet), notes + theme export (result), audit p. 4 (0 → 59)
  trio: [
    {
      label: 'Problem',
      text: 'Four kinds of handmade pet art sat in one flat catalog, and the pages gave shoppers little proof.',
    },
    {
      label: 'The bet',
      text: 'Fix the store before buying traffic. My audit ranked the core site rebuild P0 and held large ad spend until pages, tracking and proof were ready.',
    },
    {
      label: 'Result',
      text: 'A format-first menu, four product templates and proof modules in the theme. Search Console went from 0 to 59 pages found.',
    },
  ],

  facts: [
    { n: '59', label: 'page audit' },
    { n: '21', label: 'problems named' },
    { n: '4', label: 'product templates' },
    { n: '0 → 59', label: 'pages found in Search Console' },
  ],

  // audit p. 17 (role variants), p. 10 (first screen), notes (one template)
  problem: {
    heading: 'The problem',
    scene:
      'Picture this: you click an ad for an astronaut portrait of your dog. The page makes you pick the role again, from a list that also holds Pilot, Doctor and Nurse. Prints, hand-painted canvases, sculpted reliefs and mugs all ask the same questions, and nothing on the first screen shows what your photo will become.',
    lead: 'My audit named 21 problems. All of them, in English:',
  },

  // audit p. 1–4, 27
  audit: {
    heading: 'Auditing a live store',
    problem: 'The store was live and ads were next. Before spending, it needed a clear read on what would stop a sale.',
    research:
      'A 59-page audit: 11 areas rated by maturity, every workstream ranked P0 to P3, four competitors compared, and a section order for every page type.',
    insights: [
      { k: 'Conversion', v: 'was the weak link. Website conversion scored medium-low.' },
      { k: 'Positioning', v: 'needed an edge. Each competitor owns one reason to buy; LuminiPet’s became real artists who capture what only family would recognize.' },
      { k: 'Order', v: 'mattered. Brand and product first, then the core site and real assets, then social and UGC, then ads.' },
      { k: 'Tracking', v: 'came first. I submitted the sitemap and linked Search Console to GA4.' },
    ],
    turn: 'But the audit pointed at a bigger issue.',
  },

  // notes (one template), audit p. 20–23 (what each format must prove)
  pivot: {
    heading: 'One catalog was selling four different products.',
    problem: 'Prints, hand-painted canvases, hand-sculpted reliefs and keepsakes shared one catalog and one product template.',
    insight:
      'Each format has a different thing to prove. A print, that it is not an AI filter. A painting, real brushwork. A relief, real depth. A keepsake, real use.',
    decision: 'Give each format its own path and its own page, on one shared system.',
    mapCaption: 'The structure, redrawn. A retrospective summary, not an original process artifact.',
  },

  built: {
    heading: 'What I built',
    items: [
      'Shop All by medium, series and keepsake, so the format comes first.',
      'Four format-specific product templates that ask only what each format needs.',
      'Reusable Liquid sections: one shared guarantee, FAQ and service promise; each format adds its own proof.',
      'Proof modules: tappable detail hotspots and a stepped making process.',
      'A separate dev theme, so the build never touched the live store.',
    ],
  },

  views: {
    routes: {
      n: '1',
      heading: 'The format comes first',
      decision: 'I specified a three-level menu in my audit, then rebuilt Shop All by medium, series and keepsake.',
      specCaption: 'The three-level menu from my audit, p. 8–9, translated from Chinese. Pick a top-level menu to see its branches.',
    },
    pages: {
      n: '2',
      heading: 'Each format asks its own questions',
      decision: 'One template became four, so each page asks only what its format needs.',
      tabs: {
        painted: {
          label: 'Hand-painted',
          notes: [
            'Six canvas sizes, from 8 × 12 to 24 × 35.5 in.',
            'Frame finish: unframed, white or black.',
            'Shared: pet count and the Customize, Upload, Complete bar.',
          ],
        },
        sculpted: {
          label: 'Hand-sculpted',
          notes: [
            'Adds Portrait Style: Crown Only, Half Body, Full Body.',
            'Two sizes and three wood frames.',
            'Shared: pet count and the Customize, Upload, Complete bar.',
          ],
        },
      },
    },
    system: {
      n: '3',
      heading: 'Patterns built for reuse',
      decision:
        'I built section patterns that can be reused again and again. Each template is assembled from the same shared sections, so a fix to one reaches all four.',
    },
  },

  iteration: {
    heading: 'From text rows to visual proof',
    earlier: 'Generic text-and-image rows and accordion copy.',
    change: 'Handmade work has to be seen, not read. I set a 70% visual, 30% text rule for proof modules.',
    final: 'Hotspots and a stepped process replaced paragraphs.',
  },

  shipped: {
    heading: 'What shipped',
    items: [
      'A Shop All structure by medium, series and keepsake.',
      'Four product templates: print, hand-painted, hand-sculpted, keepsakes.',
      'Format-specific proof modules and a separate dev theme.',
    ],
    live: 'Specified in my audit. Live today.',
  },

  lesson: {
    heading: 'What this taught me',
    quote: 'The brand stayed fixed. I changed what a shopper chooses first and what each format has to prove.',
  },
}

/** Words in the main narrative, excluding meta rows, captions, the problem list and labels. */
export function caseWordCount() {
  const c = CASE
  const v = c.views
  const parts = [
    c.hero.title,
    c.hero.subtitle,
    ...c.trio.map((t) => t.text),
    c.problem.scene,
    c.problem.lead,
    c.audit.problem,
    c.audit.research,
    ...c.audit.insights.map((i) => `${i.k} ${i.v}`),
    c.audit.turn,
    c.pivot.heading,
    c.pivot.problem,
    c.pivot.insight,
    c.pivot.decision,
    ...c.built.items,
    ...['routes', 'pages', 'system'].flatMap((k) => [v[k].heading, v[k].decision]),
    ...MENU_STEPS.map((s) => `${s.label} ${s.text}`),
    ...v.pages.tabs.painted.notes,
    ...v.pages.tabs.sculpted.notes.slice(0, 2),
    c.iteration.heading,
    c.iteration.earlier,
    c.iteration.change,
    c.iteration.final,
    ...c.shipped.items,
    c.lesson.quote,
  ]
  return parts.join(' ').split(/\s+/).filter(Boolean).length
}
