/**
 * /preview/redesign/surveys-of-consumers — content manifest.
 *
 * ALL copy, numbers, quotes and alt text come from the published case study in
 * src/data/projects.js (slug `surveys-of-consumers`) — this file only picks them out and attaches
 * web-weight copies of the same images (public/assets/redesign/soc/*.webp, resized from the
 * originals in public/assets/soc/). Nothing is written, generated or measured here.
 */
import { projects, SITE, RESUME_URL } from './projects'

export { SITE, RESUME_URL }

export const P = projects.find((p) => p.slug === 'surveys-of-consumers')

/** section by id, and module(s) by type inside it */
const bySection = Object.fromEntries(P.sections.map((s) => [s.id, s]))
export const sec = (id) => bySection[id]
export const mods = (id, type) => bySection[id].modules.filter((m) => m.type === type)
export const mod = (id, type, i = 0) => mods(id, type)[i]

const A = '/assets/redesign/soc/'

/** Still. `crop` = [w, h] shows the top of a tall page in a fixed frame; the lightbox opens the full page. */
const still = (key, [w, h], alt, cap, tag, { crop, full = true } = {}) => ({
  kind: 'img',
  src: `${A}${key}.webp`,
  full: full ? `${A}${key}-full.webp` : undefined,
  width: crop ? crop[0] : w,
  height: crop ? crop[1] : h,
  alt,
  cap,
  tag,
  tall: crop ? true : undefined,
})

const flow = mod('solution', 'flow-showcase').steps
const FLOW_KEYS = ['home', 'post-search', 'report-found', 'no-report', 'all-reports', 'monthly']
const FLOW_DIMS = [
  [1100, 2175],
  [1100, 1661],
  [1100, 1752],
  [1100, 1752],
  [1100, 1862],
  [1100, 1514],
]

/** the six prototype screens, in the order of the published case study */
export const FLOW = flow.map((s, i) => ({
  label: s.label,
  description: s.description,
  item: still(FLOW_KEYS[i], FLOW_DIMS[i], s.alt, s.label, 'Hi-fi screen', { crop: [1600, 1000] }),
}))

/** Hero collage: the same three real screens, cropped to the top of the page */
export const HERO_SHOTS = [0, 1, 2].map((i) => ({
  ...FLOW[i].item,
  width: 1600,
  height: 1000,
}))

const currentVideo = mod('context', 'video')
const resultsVideo = mod('validation', 'video')

export const MEDIA = {
  current: {
    kind: 'video',
    src: `${A}current-site.mp4`,
    poster: `${A}current-site-poster.jpg`,
    width: 1280,
    height: 736,
    alt: currentVideo.alt,
    cap: 'The existing site',
    tag: 'Recording',
  },
  // the prototype walkthrough — same file the homepage reel already uses
  walkthrough: {
    kind: 'video',
    src: '/assets/preview/soc-walkthrough.mp4',
    poster: '/assets/preview/soc-walkthrough-poster.jpg',
    width: 1280,
    height: 800,
    alt: resultsVideo.alt,
    cap: 'Final hi-fi prototype walkthrough',
    tag: 'Recording',
  },
  affinity: still('affinity', [1800, 1176], mod('qualitative', 'media', 0).alt, 'Affinity diagram · participant quotes', 'FigJam'),
  persona: still('persona', [1375, 912], mod('qualitative', 'media', 1).alt, 'Persona · Daniel McGuarth', 'Artifact', { full: false }),
  journey: still('journey', [1800, 1059], mod('journey', 'media').alt, 'Journey map · four tasks', 'Diagram'),
  sitemap: still('sitemap', [1800, 1453], mod('ia', 'media').alt, 'Proposed sitemap', 'Diagram'),
}

const compImgs = mod('competitive', 'competitor-cards').images
const COMP = [
  ['map-fred', [1300, 1207]],
  ['map-census', [1300, 1222]],
  ['map-bls', [1300, 966]],
  ['map-soc', [1800, 620]],
]
/** competitor name → sitemap still + its three observations */
export const COMPETITORS = mod('competitive', 'competitor-cards').items.map((it, i) => ({
  name: it.name,
  points: it.points,
  item: still(COMP[i][0], COMP[i][1], compImgs[i].alt, `${it.name} · site map`, 'Diagram'),
}))

/** the three before/after pairs in "Insight → design decisions" */
const RESP_KEYS = [
  ['home', [1100, 2175]],
  ['home', [1100, 2175]],
  ['post-search', [1100, 1661]],
]
export const RESPONSES = mod('decisions', 'design-response').items.map((it, i) => ({
  finding: it.finding,
  response: it.response,
  item: still(RESP_KEYS[i][0], RESP_KEYS[i][1], it.image.alt, it.response, 'Hi-fi screen', { crop: [1600, 1000] }),
}))

/** Short in-page index for the header */
export const SEC_NAV = [
  { label: 'Challenge', href: '#context' },
  { label: 'Research', href: '#research-evidence' },
  { label: 'Design', href: '#decisions' },
  { label: 'Results', href: '#validation' },
]
