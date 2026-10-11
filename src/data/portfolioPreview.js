/**
 * Portfolio PREVIEW — homepage manifest (/preview/portfolio).
 *
 * One place to edit every showcase: media path, poster, caption, evidence status
 * and layout. Titles, roles, timelines and links come from src/data/projects.js
 * (single source of truth); the one-sentence descriptions below are condensed
 * from each project's existing subtitle / tagline / summary, not new claims.
 *
 * Project selection and order are unchanged from projects.js (`order` field).
 * Nothing here is imported by the published site.
 *
 * evidence values
 *   'recording'  – a real screen recording of the designed interface
 *   'screenshot' – a real screenshot / export of the designed interface
 *   'composite'  – a designer-made composite of real screens (not a live capture)
 *   'draft'      – screenshot of an unpublished Shopify theme (internship-period)
 */

import { SITE, RESUME_URL, projects } from './projects'

export { SITE, RESUME_URL }

export const PREVIEW_BASE = '/assets/preview/'

export const NAV = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Resume', href: RESUME_URL, external: true },
  { label: 'Contact', href: '#contact' },
]

/** Compact identity block. The sentence is SITE.tagline from the current site. */
export const IDENTITY = {
  name: SITE.name,
  title: SITE.title,
  sentence: SITE.tagline,
  status: `${SITE.status} · Ann Arbor`,
}

/** Short about strip. Longer story stays on the existing /about page. */
export const ABOUT = {
  portrait: SITE.portrait,
  portraitAlt: 'Hazel Jiang on a bridge in Rome',
  line: 'BSI at Michigan: UX Design and Biopsychology, Cognition, Neuroscience.',
  more: { label: 'More about me', to: '/about' },
}

const byOrder = [...projects].sort((a, b) => a.order - b.order)
const P = Object.fromEntries(byOrder.map((p) => [p.slug, p]))

/** "Fall 2025 · SI 394" → "2025", "Jul – Aug 2026 · Senaura" → "2026", "2024–2025" → "2024–25" */
const yearOf = (t) => {
  const range = t.match(/(20\d\d)\s*[–-]\s*(20\d\d)/)
  if (range) return `${range[1]}–${range[2].slice(2)}`
  const ys = t.match(/20\d\d/g)
  return ys ? ys[ys.length - 1] : t
}

const base = (slug) => ({
  slug,
  title: P[slug].title,
  role: P[slug].role,
  year: yearOf(P[slug].timeline),
  caseStudy: `/projects/${slug}`,
})

/**
 * Layout keys (see Showcase.jsx):
 *   wide    – media first, full width; caption row beneath
 *   paired  – wide screen + tall detail, caption beneath the wide screen
 *   title   – oversized title, then product with a short text column
 *   quiet   – smaller static artifact, hairline frame, low-key caption
 *   dark    – full-bleed dark band for media that carries its own dark ground
 *   split   – text column beside a wide recording
 */
export const SHOWCASES = [
  {
    ...base('surveys-of-consumers'),
    layout: 'wide',
    sentence: 'A search-first redesign so journalists and researchers find consumer-sentiment data in seconds, not five clicks.',
    media: [
      {
        kind: 'video',
        src: `${PREVIEW_BASE}soc-walkthrough.mp4`,
        poster: `${PREVIEW_BASE}soc-walkthrough-poster.jpg`,
        width: 1280,
        height: 800,
        alt: 'Screen recording of the redesigned Surveys of Consumers prototype: the home page with key indices, then a search for “income” and a filtered results list.',
        caption: 'Prototype walkthrough, 32 s.',
        evidence: 'recording',
        note: 'Existing recording from the published case study (soc/demo/prototype-walkthrough.mp4), remuxed for faster start.',
      },
    ],
  },
  {
    ...base('luminipet-shopify'),
    // The redesigned case study lives at the preview route; the published one stays reachable.
    caseStudy: '/preview/projects/luminipet',
    publishedStudy: '/projects/luminipet-shopify',
    layout: 'paired',
    sentence: 'A flat catalog became four format-first shopping paths on a live Shopify store.',
    media: [
      {
        kind: 'image',
        src: '/assets/luminipet/preview/d-menu.jpg',
        width: 2400,
        height: 1377,
        alt: 'LuminiPet Shop All menu open with columns By Medium, By Series, Custom Pet Keepsakes and Help & Info beside four product tiles.',
        caption: 'Shop All menu.',
        evidence: 'draft',
        note: 'Theme preview “lumini 正式版 0720” (unpublished draft), captured 2026-10-09.',
      },
      {
        kind: 'image',
        src: '/assets/luminipet/preview/d-pdp-sculpted-config.jpg',
        width: 1328,
        height: 2124,
        alt: 'Hand-sculpted product page options: Number of Pets, Portrait Style with Crown Only, Half Body and Full Body, two sizes, and three frame styles.',
        caption: 'Hand-sculpted options.',
        evidence: 'draft',
        note: 'Same draft theme, detail crop of a desktop page.',
      },
    ],
  },
  {
    ...base('stellantis-ivi'),
    layout: 'title',
    sentence: 'An AI-HUD that extends the driver’s senses without adding to mental workload.',
    media: [
      {
        kind: 'image',
        src: `${PREVIEW_BASE}stellantis-center-home.jpg`,
        width: 1366,
        height: 1024,
        alt: 'Center display home screen of the 2030 Alfa Romeo IVI: time and date, a white SUV, a media player with source shortcuts and a navigation card.',
        caption: 'Center display home.',
        evidence: 'screenshot',
        note: 'Existing export (stellantis/center-home.png), recompressed to JPEG.',
      },
    ],
  },
  {
    ...base('zingerman-deli'),
    layout: 'quiet',
    sentence: 'One on-brand pickup path, so ordering never leaves Zingerman’s for a third-party checkout.',
    media: [
      {
        kind: 'image',
        src: `${PREVIEW_BASE}zingerman-home.jpg`,
        width: 1800,
        height: 1134,
        alt: 'Redesigned Zingerman’s Deli homepage with a deli-counter photo, a welcome headline, opening hours and an Order Online button.',
        caption: 'Redesigned homepage, desktop.',
        evidence: 'screenshot',
        note: 'Existing export (zingerman/homepage-desktop.png), recompressed to JPEG.',
      },
    ],
  },
  {
    ...base('still-here'),
    layout: 'dark',
    sentence: 'A glove and app that notice rising stress and respond with quiet, dignity-preserving grounding.',
    media: [
      {
        kind: 'image',
        src: `${PREVIEW_BASE}stillhere-composite.jpg`,
        width: 1500,
        height: 1125,
        alt: 'Two phones showing the Still Here app, floating on a black background.',
        caption: 'App screens.',
        evidence: 'composite',
        note: 'Existing composite of real app screens (still-here/figma/iphone-composite.png).',
      },
    ],
  },
  {
    ...base('echoes-you-can-touch'),
    layout: 'split',
    sentence: 'A first-person fantasy carnival where memory portals turn nostalgia into playable space.',
    media: [
      {
        kind: 'video',
        src: `${PREVIEW_BASE}echoes-walkthrough.mp4`,
        poster: `${PREVIEW_BASE}echoes-walkthrough-poster.jpg`,
        width: 1024,
        height: 580,
        alt: 'In-engine walkthrough of the Echoes You Can Touch carnival hub: a glowing portal, string lights, and a tent interior.',
        caption: 'In-engine walkthrough, 34 s.',
        evidence: 'recording',
        note: 'Existing recording (echoes/demo/echoes-walkthrough.mp4), recompressed to 1024 px wide, audio removed.',
      },
    ],
  },
]

export const EVIDENCE_LABEL = {
  recording: 'Recording',
  screenshot: 'Screenshot',
  composite: 'Composite of real screens',
  draft: 'Draft-theme screenshot',
}

/** Surfaced in the preview notes panel. */
export const MISSING_MEDIA = [
  { project: 'LuminiPet', need: 'A short screen recording of the 0813 dev theme: Shop All menu open, then a product page’s options. The case study hero is a still today.' },
  { project: 'LuminiPet', need: 'before-home.jpg: the legacy theme’s flat catalog. Without it there is no true before/after of the catalog.' },
  { project: 'LuminiPet', need: 'Desktop-width (1440 px) captures of the hotspot and depth modules. Current ones are 600 px-wide.' },
  { project: 'Stellantis', need: 'A recording of the Figma prototype (center display to HUD alert). Only stills exist.' },
  { project: 'Zingerman’s', need: 'A recording of the pickup flow (menu to confirmation). Only stills exist.' },
  { project: 'Still Here', need: 'A recording of the app prototype or the glove responding. Only a still composite exists.' },
]

export const UNSUPPORTED = [
  'No claims about metrics, traffic, sales or usability results appear on either page.',
  'Showcase sentences are condensed from each project’s existing subtitle or tagline; edit them in this file.',
  'The homepage sentence is the current site’s tagline, unchanged.',
]
