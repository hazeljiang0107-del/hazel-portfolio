/**
 * /projects/luminipet-shopify — content manifest.
 *
 * Every word comes from the visual case study (src/data/luminipetVisual.js); every image or clip
 * is an existing file already used by /preview/projects/luminipet-visual (no new media, nothing
 * recaptured, nothing edited). This file only attaches a short honest tag to each visual:
 *
 *   Live site       – luminipet.com as published, screenshots you supplied
 *   Dev theme       – captured from the dev theme “Backend Lumini Dev Export 20260813”
 *   Recording       – a screen recording of that dev theme
 *   Draft theme     – captured from the older 0720 draft theme
 *   Audit           – a crop of my 59-page audit PDF
 *   Diagram         – redrawn by me from the audit / theme export
 */
import { VIS } from './luminipetVisual'
import { MEDIA as M } from './luminipetVisualMedia'
import { assets as A, TEMPLATE_MAP } from './luminipetPreviewAssets'
import { PROBLEM_GROUPS, PROBLEM_COUNT, PRIORITY_MAP, STATUS_LABEL } from './luminipetProblems'
import { MENU, MENU_PAGE_COUNT } from './luminipetMenu'

export { VIS, TEMPLATE_MAP, PROBLEM_GROUPS, PROBLEM_COUNT, PRIORITY_MAP, STATUS_LABEL, MENU, MENU_PAGE_COUNT }

/**
 * Public-facing evidence notes. Same claims as the visual version's FLAGS, minus the to-do
 * wording ("add one from…", "needs your confirmation") that only made sense while reviewing.
 */
export const FLAGS = {
  before: 'I have no screenshot of the old catalog, so the legacy structure is redrawn from my audit.',
  earlier: 'The earlier frame comes from a 0720 draft of the theme. It is not a record of the module before the final version.',
}

const plain = (s) => s.replace(/,? dev theme\.?$/, '').replace(/\.$/, '')
const still = (a, cap, tag) => ({ kind: 'img', src: a.src, width: a.width, height: a.height, alt: a.alt, cap, tag })
const clip = (m, tag = 'Recording · dev theme') => ({
  kind: 'video',
  src: m.src,
  poster: m.poster,
  width: m.width,
  height: m.height,
  alt: m.alt,
  cap: plain(m.caption),
  tag,
})

export const HERO = [
  still(A.tourHero, 'Homepage', 'Live site'),
  still(A.tourMenu, 'Shop All menu', 'Live site'),
  still(A.tourQuiz, 'Find Your Style', 'Live site'),
]

export const MED = {
  menu: clip(M.recMenu),
  quiz: clip(M.recQuiz),
  home: [
    still(M.homeHero, plain(M.homeHero.caption), 'Dev theme'),
    still(M.homeRelief, plain(M.homeRelief.caption), 'Dev theme'),
    still(M.homeGift, plain(M.homeGift.caption), 'Dev theme'),
  ],
  proof: {
    hpDetail: clip(M.recHpDetail),
    hsDepth: clip(M.recHsDepth),
    hpCanvas: clip(M.recHpCanvas),
    hsLight: clip(M.recHsLight),
  },
  earlier: still(A.iterationEarlier, 'Earlier', 'Draft theme 0720'),
  final: still(M.hpDetail, 'Final', 'Dev theme'),
  gsc: still(A.auditGsc, 'Search Console, before and after', 'Audit'),
}

/** Hand-painted ⇄ hand-sculpted option panels; regions[i] is the pin for notes[i]. */
export const SWAP = [
  {
    id: 'painted',
    label: 'Hand-painted',
    item: still(A.pdpPaintedConfig, 'Hand-painted options', 'Draft theme 0720'),
    notes: VIS.pages.painted,
    regions: [
      { x: 0, y: 27.5, w: 100, h: 47 },
      { x: 0, y: 76, w: 100, h: 24 },
    ],
  },
  {
    id: 'sculpted',
    label: 'Hand-sculpted',
    item: still(A.pdpSculptedConfig, 'Hand-sculpted options', 'Draft theme 0720'),
    notes: VIS.pages.sculpted,
    regions: [
      { x: 0, y: 27.5, w: 100, h: 22 },
      { x: 0, y: 51.5, w: 100, h: 48.5 },
    ],
  },
]

/** the four formats shown in “One catalog, four products” */
export const FORMATS = [
  { k: 'Gallery-Printed', t: 'product.print' },
  { k: '2D Hand-Painted', t: 'product.hand-painted' },
  { k: '3D Hand-Sculpted', t: 'product.hand-sculpted' },
  { k: 'Keepsakes', t: 'product.keepsakes' },
]

const [role, company, timeline] = VIS.hero.meta.split(' · ')
export const FACTS = [
  ['Role', role],
  ['Company', company],
  ['Timeline', timeline],
]

export const SEC_NAV = [
  { label: 'Problem', href: '#problem' },
  { label: 'Build', href: '#menu' },
  { label: 'Proof', href: '#proof' },
  { label: 'Result', href: '#search' },
]
