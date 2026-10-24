/**
 * LuminiPet UX story — /projects/luminipet-shopify
 *
 * SOURCE MAP:
 *   BEFORE – Shopify preview Backend Lumini Dev Export 20260813 Draft
 *   NOW    – https://luminipet.com/
 *   STYLE  – https://train-sable-79246720.figma.site (brand system I designed)
 *
 * Framing: “From an incomplete storefront to a coherent shopping experience.”
 * Captions stay short. No “team continued after departure” language on-page.
 */
import { assets as A } from './luminipetPreviewAssets'
import { MEDIA as M } from './luminipetVisualMedia'

/** Short compare note — labels only, no departure narrative. */
export const COMPARE_CAPTION = 'Earlier preview · Current live'

const BASE = '/assets/luminipet/compare/'

export const SOURCES = {
  before: {
    label: 'Earlier theme preview',
    short: 'Earlier preview',
    url: 'https://lc5wkybtve8yjjlg-74965319848.shopifypreview.com',
  },
  now: {
    label: 'Current live site',
    short: 'Current live',
    url: 'https://luminipet.com/',
  },
  style: {
    label: 'Brand style guide',
    short: 'Style guide',
    url: 'https://train-sable-79246720.figma.site',
  },
}

export const STORY = {
  hero: {
    title: 'LuminiPet',
    line: 'From an incomplete storefront to a coherent shopping experience.',
    intro:
      'My director supplied the required pages. I designed the information architecture, navigation, homepage hierarchy, branding style guide, and Shopify implementation so shoppers can find a format, trust the craft, and move toward purchase.',
    meta: 'UX/UI Design Intern · Senaura · Jul–Aug 2026',
    live: SOURCES.now.url,
    style: SOURCES.style.url,
  },
  features: [
    {
      id: 'home',
      label: 'Live storefront',
      note: 'Current launched homepage on luminipet.com.',
      media: 'featHome',
    },
    {
      id: 'guide',
      label: 'Brand style guide',
      note: 'Digital brand system I designed — color, type, components, voice.',
      media: 'featGuide',
    },
    {
      id: 'path',
      label: 'Guided shopping path',
      note: 'Format first, then style — fewer dead ends before purchase.',
      media: 'featPath',
    },
  ],
  process: {
    id: 'priorities',
    h: 'How priorities took shape',
    steps: [
      {
        k: 'Starting point',
        v: 'Required pages were named, but routes into collections and format choice were still incomplete.',
        src: 'Director requirements + audit notes.',
      },
      {
        k: 'Competitor observations',
        v: 'Crown & Paw for category logic; Design Within Reach for context → compare → configure.',
        src: 'Project notes.',
      },
      {
        k: 'Design priorities',
        v: 'Find by format. Prove the offer. Keep one visual system.',
        src: 'What I designed and built.',
      },
    ],
  },
  chapters: {
    find: {
      id: 'find',
      n: 1,
      h: 'A clearer path from browse to the right product',
      unclear: 'Format, style, and gifts lacked clear routes into collections.',
      designed: 'I built format-first navigation and a guided chooser so shoppers decide how the portrait is made before they drown in options.',
      shows: 'Live path: Shop All → Find Your Style → collection → product.',
      annos: ['By Medium', 'By Style', 'Guided steps'],
    },
    trust: {
      id: 'trust',
      n: 2,
      h: 'Homepage hierarchy that proves the offer',
      unclear: 'Without craft proof, shoppers could not see how formats differ.',
      designed: 'I designed hero imagery and homepage sections that lead with handmade quality, then open into format choice.',
      shows: 'Hero and format sections on the live storefront.',
      annos: ['Craft first', 'Format cards', 'Trust next'],
    },
    identity: {
      id: 'identity',
      n: 3,
      h: 'One brand system across the shopping experience',
      unclear: 'Pages risked feeling like separate sites without shared type, color, and components.',
      designed: 'I designed the LuminiPet brand style guide and applied its patterns across homepage, collections, and chooser flows.',
      shows: 'Style guide foundations beside live page patterns.',
      annos: ['Color system', 'Typography', 'Components'],
    },
  },
  flow: {
    id: 'flow',
    h: 'How the path simplifies shopping',
    lead: 'Four screens on the live site: decide format, pick a style path, land in a collection, configure the product.',
    steps: [
      { k: '01 · Navigate', v: 'Shop All splits by medium, then style.', media: 'flowMenu' },
      { k: '02 · Guide', v: 'Find Your Style asks product type first.', media: 'flowQuiz' },
      { k: '03 · Browse', v: 'Collections stay format-specific.', media: 'flowCol' },
      { k: '04 · Configure', v: 'Product pages match the chosen craft.', media: 'flowPdp' },
    ],
  },
  delivered: {
    id: 'delivered',
    n: 4,
    h: 'What I delivered',
    body: 'Competitor analysis, IA, navigation, homepage hierarchy, the brand style guide, and Shopify pages for the required formats—so discovery, trust, and configuration share one storefront.',
  },
}

const still = (src, w, h, alt, cap, tag) => ({
  kind: 'img',
  src,
  width: w,
  height: h,
  alt,
  cap,
  tag,
})

const fromCompare = (file, alt, cap, tag) => still(BASE + file, 1440, 900, alt, cap, tag)

const fromAsset = (a, cap, tag) => still(a.src, a.width, a.height, a.alt, cap, tag)

const clip = (m, tag = 'Recording · earlier preview') => ({
  kind: 'video',
  src: m.src,
  poster: m.poster,
  width: m.width,
  height: m.height,
  alt: m.alt,
  cap: m.caption.replace(/,? dev theme\.?$/i, '').replace(/\.$/, ''),
  tag,
})

export const SHOTS = {
  featHome: still(
    '/assets/luminipet/homepage-live.jpg',
    1920,
    1080,
    'luminipet.com live homepage: dark header and Halloween family hero with a framed custom pet portrait.',
    'Current live homepage',
    SOURCES.now.short,
  ),
  featGuide: fromCompare(
    'style/sg-home.jpg',
    'LuminiPet brand system style guide cover: Made with love. Remembered forever.',
    'Brand style guide I designed',
    SOURCES.style.short,
  ),
  featPath: fromCompare(
    'flow/n-quiz.jpg',
    'Live Find Your Style: step 1 pick product type — painted, sculpted, or gifts.',
    'Guided format choice',
    SOURCES.now.short,
  ),

  guideHome: fromCompare(
    'style/sg-home.jpg',
    'Style guide cover with brand north star.',
    'Style guide · cover',
    SOURCES.style.short,
  ),
  guideColor: fromCompare(
    'style/sg-color.jpg',
    'Style guide color section: Ink, Warm white, Camel, Sunshine, Paper, Body.',
    'Style guide · color',
    SOURCES.style.short,
  ),
  guideType: fromCompare(
    'style/sg-typography.jpg',
    'Style guide typography section.',
    'Style guide · typography',
    SOURCES.style.short,
  ),
  guideComponents: fromCompare(
    'style/sg-components.jpg',
    'Style guide components section.',
    'Style guide · components',
    SOURCES.style.short,
  ),

  beforeHome: fromCompare(
    'b-home-clean.jpg',
    'Earlier preview homepage hero with 2D and 3D craft proof.',
    'Homepage hero',
    SOURCES.before.short,
  ),
  nowHome: fromCompare(
    'flow/n-home.jpg',
    'Current live homepage hero.',
    'Homepage hero',
    SOURCES.now.short,
  ),
  beforeFormats: fromCompare(
    'b-formats.jpg',
    'Earlier preview Choose Your Pet Portrait Format.',
    'Format section',
    SOURCES.before.short,
  ),
  nowFormats: fromCompare(
    'flow/n-formats.jpg',
    'Current live hand-painted homepage section.',
    'Format section',
    SOURCES.now.short,
  ),
  beforeCol: fromCompare(
    'b-col-hp-clean.jpg',
    'Earlier preview hand-painted collection.',
    'Collection',
    SOURCES.before.short,
  ),
  nowCol: fromCompare(
    'flow/n-collection.jpg',
    'Current live hand-painted collection.',
    'Collection',
    SOURCES.now.short,
  ),
  beforeChooser: fromCompare(
    'b-chooser.jpg',
    'Earlier preview format chooser.',
    'Chooser',
    SOURCES.before.short,
  ),
  nowQuiz: fromCompare(
    'flow/n-quiz.jpg',
    'Current live Find Your Style quiz.',
    'Find Your Style',
    SOURCES.now.short,
  ),

  flowMenu: fromAsset(A.tourMenu, 'Shop All · By Medium / By Style', SOURCES.now.short),
  flowQuiz: fromCompare(
    'flow/n-quiz.jpg',
    'Find Your Style step 1.',
    'Guided chooser',
    SOURCES.now.short,
  ),
  flowCol: fromCompare(
    'flow/n-collection.jpg',
    'Hand-painted collection.',
    'Format collection',
    SOURCES.now.short,
  ),
  flowPdp: fromCompare(
    'flow/n-pdp.jpg',
    'Hand-painted product page.',
    'Product configure',
    SOURCES.now.short,
  ),

  menuDetail: fromAsset(A.menuDetail, 'Shop All menu detail', SOURCES.before.short),
  liveMenu: fromAsset(A.tourMenu, 'Shop All menu', SOURCES.now.short),
  menuRec: clip(M.recMenu),
  pdpPainted: fromAsset(A.pdpPaintedConfig, 'Hand-painted options', SOURCES.before.short),
}

export const NAV = [
  { label: 'Outcome', href: '#outcome' },
  { label: 'Priorities', href: '#priorities' },
  { label: 'Path', href: '#find' },
  { label: 'Homepage', href: '#trust' },
  { label: 'Brand', href: '#identity' },
  { label: 'Delivered', href: '#delivered' },
]

export const FACTS = [
  ['Role', 'UX/UI Design Intern'],
  ['Company', 'Senaura'],
  ['Timeline', 'Jul–Aug 2026'],
]

const words = (s) => s.split(/\s+/).filter((w) => /[\p{L}\p{N}]/u.test(w)).length

export function storyWordCount() {
  const h = STORY.hero
  const p = STORY.process
  const c = STORY.chapters
  const f = STORY.flow
  const d = STORY.delivered
  const parts = [
    h.line,
    h.intro,
    p.h,
    ...p.steps.flatMap((s) => [s.k, s.v]),
    ...Object.values(c).flatMap((ch) => [ch.h, ch.unclear, ch.designed]),
    f.h,
    f.lead,
    ...f.steps.flatMap((s) => [s.k, s.v]),
    d.h,
    d.body,
    ...STORY.features.flatMap((x) => [x.label, x.note]),
  ]
  return parts.reduce((n, s) => n + words(s), 0)
}
