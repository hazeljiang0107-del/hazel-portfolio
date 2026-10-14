/**
 * Surveys of Consumers visual story — /preview/soc-story
 *
 * Framing: “Turning research into clearer access to public economic data.”
 * Team UX capstone; two sites must remain separate.
 *
 * Ownership (from projects.js):
 *   I led  — interview synthesis, information architecture
 *   Co-owned — search results, reports browse, V1→V2 handoff / hi-fi prototyping
 *   Team — dual-site strategy, research stack, handoff delivery
 *
 * Labels: “Existing site” vs “Proposed design” (prototype). Not launched.
 *
 * Unsupported / omitted on-page: 100%, 75%, “five clicks”, “under three clicks”,
 * Qualtrics (not in source), correlations as causal claims.
 *
 * Timeline used: Aug 2025 – Apr 2026 (snapshot). Hero also lists “Sep 2025 – Present”;
 * handoff “May” lacks year — flagged in delivery summary, not invented.
 */
import { MEDIA as SOC, FLOW } from './redesignSoc'

export const LABELS = {
  existing: 'Existing site',
  proposed: 'Proposed design',
  prototype: 'Hi-fi prototype',
  evidence: 'Research evidence',
  diagram: 'Diagram',
}

export const STORY = {
  hero: {
    title: 'Surveys of Consumers',
    line: 'Turning research into clearer access to public economic data.',
    intro:
      'Team UX capstone for U-M Surveys of Consumers. The client required Main and Data to stay separate; we redesigned how people find and interpret releases across both.',
    contribution:
      'I led interview synthesis and information architecture. I co-owned search results, reports browse, and the V1→V2 prototype handoff.',
    note: 'Hi-fi prototype — not a launched search platform.',
    meta: 'UX Designer · Team of 4 · Capstone',
    proto:
      'https://www.figma.com/proto/KnpsSE9JXoaGMCFAvURWrp/Survey-of-Consumers-Redesign?node-id=485-4708',
    figma: 'https://www.figma.com/design/KnpsSE9JXoaGMCFAvURWrp/Survey-of-Consumers-Redesign',
  },
  priorities: {
    id: 'priorities',
    h: 'Three priorities from the evidence',
    items: [
      {
        k: 'Find without guessing',
        v: 'No search — people click through dense pages to reach public data.',
      },
      {
        k: 'Stay oriented',
        v: 'Main and Data stay separate, but switching between them breaks orientation.',
      },
      {
        k: 'Read what matters first',
        v: 'Headline values, dates, and release status sit buried in dense text.',
      },
    ],
  },
  chapters: {
    search: {
      id: 'search',
      n: 1,
      h: 'Finding data should not depend on guessing the right tab',
      finding:
        'Live-site survey (n = 127): 21 described trial-and-error navigation; 15 could not find what they needed.',
      decision:
        'We co-designed search with filters plus a reports browse path; I carried both through the hi-fi prototype.',
      mine: 'Co-owned · search results + reports browse',
      annos: ['Filters', 'Mixed results', 'Reports path'],
    },
    orient: {
      id: 'orient',
      n: 2,
      h: 'Two sites, one understandable experience',
      finding:
        'Journey maps and affinity themes showed the Main ↔ Data jump breaks orientation — a mental-model gap, not only URLs.',
      decision:
        'I led dual-site IA. We kept both sites separate and tied orientation with a shared header and Main | Data control.',
      mine: 'I led · information architecture',
      annos: ['Main | Data', 'Shared header', 'Proposed IA'],
    },
    entry: {
      id: 'entry',
      n: 3,
      h: 'Important numbers belong at the point of entry',
      finding:
        'Same survey (n = 127): checking the latest release (43) and finding a headline number (38) led visit purposes.',
      decision:
        'We proposed search-first entry with headline metrics, explicit time labels, and next-release cues.',
      mine: 'Team · homepage hierarchy in the prototype I helped ship',
      annos: ['Headline metrics', 'Time labels', 'Next release'],
    },
  },
  delivery: {
    id: 'delivery',
    n: 4,
    h: 'Iteration and delivery',
    lead:
      'Interactive search needs tagged structured data SoC does not serve yet. V1 links existing files; V2 keeps the same UI once live data exists.',
    status:
      'Handoff: developer-ready Figma and static HTML for ISR. Timeline Aug 2025 – Apr 2026; May handoff year unconfirmed in notes.',
    mine: 'Co-owned · V1→V2 handoff path',
  },
}

const still = (src, w, h, alt, cap, tag, full) => ({
  kind: 'img',
  src,
  full,
  width: w,
  height: h,
  alt,
  cap,
  tag,
})

const A = '/assets/redesign/soc/'
const F = '/assets/soc/figma/'
const R = '/assets/soc/research/'

export const SHOTS = {
  walkthrough: {
    ...SOC.walkthrough,
    cap: 'Prototype walkthrough · homepage → search → report',
    tag: LABELS.prototype,
  },
  existing: {
    ...SOC.current,
    cap: 'Existing dual-site experience',
    tag: LABELS.existing,
  },

  home: still(
    `${A}home.webp`,
    1600,
    1000,
    'Proposed homepage with search, headline metrics, and Main | Data toggle',
    'Homepage · proposed',
    LABELS.proposed,
    `${A}home-full.webp`,
  ),
  postSearch: still(
    `${A}post-search.webp`,
    1600,
    1000,
    'Proposed post-search results with sidebar filters',
    'Search results · proposed',
    LABELS.proposed,
    `${A}post-search-full.webp`,
  ),
  allReports: still(
    `${A}all-reports.webp`,
    1600,
    1000,
    'Proposed All Reports browse path',
    'Reports browse · proposed',
    LABELS.proposed,
    `${A}all-reports-full.webp`,
  ),
  reportFound: still(
    `${A}report-found.webp`,
    1600,
    1000,
    'Proposed matched report with data selection',
    'Report match · proposed',
    LABELS.proposed,
    `${A}report-found-full.webp`,
  ),

  mapExisting: still(
    `${A}map-soc.webp`,
    1800,
    620,
    'Current SoC site map — fragmented dual-site structure',
    'Existing site map',
    LABELS.existing,
    `${A}map-soc-full.webp`,
  ),
  mapProposed: still(
    `${A}sitemap.webp`,
    1800,
    1453,
    'Proposed dual-site sitemap',
    'Proposed sitemap · I led',
    LABELS.diagram,
    `${A}sitemap-full.webp`,
  ),
  affinity: still(
    `${A}affinity.webp`,
    1800,
    1176,
    'Affinity diagram of participant themes',
    'Affinity · interview synthesis · I led',
    LABELS.evidence,
    `${A}affinity-full.webp`,
  ),

  reportV1: still(
    `${F}report-v1.png`,
    460,
    592,
    'V1 report view linking to existing static files',
    'V1 · file-linked',
    LABELS.prototype,
  ),
  reportV2: still(
    `${F}report-v2.png`,
    460,
    814,
    'V2 report view showing interactive data UI concept',
    'V2 · interactive-data concept',
    LABELS.prototype,
  ),

  // Flow screens for optional evidence
  flow: FLOW,
}

export const NAV = [
  { label: 'Experience', href: '#experience' },
  { label: 'Priorities', href: '#priorities' },
  { label: 'Search', href: '#search' },
  { label: 'Orient', href: '#orient' },
  { label: 'Entry', href: '#entry' },
  { label: 'Delivery', href: '#delivery' },
]

export const FACTS = [
  ['Role', 'UX Designer'],
  ['Team', 'Capstone · 4'],
  ['Timeline', 'Aug 2025 – Apr 2026'],
]

/** Gaps / unsupported claims for the agent summary (not shown on page). */
export const GAPS = [
  'No dedicated existing-homepage still for pixel compare — used existing-site recording + proposed home.',
  'Qualtrics not named in source data; survey described as on-site questionnaire + SPSS only.',
  'Omitted 100% / 75% usability outcomes (n and protocol unclear).',
  'Omitted “five clicks” / “under three clicks” (rhetorical, unmeasured).',
  'Timeline conflict: hero “Sep 2025 – Present” vs snapshot “Aug 2025 – Apr 2026”; handoff “May” has no year.',
  'Correlations (.615 / .549 / .609) omitted as causal claims; pairwise n unclear.',
  '12 interviews / 8 sessions / 18 screens are expo chips without full artifact set in repo.',
]

const words = (s) => s.split(/\s+/).filter((w) => /[\p{L}\p{N}]/u.test(w)).length

export function storyWordCount() {
  const h = STORY.hero
  const p = STORY.priorities
  const c = STORY.chapters
  const d = STORY.delivery
  const parts = [
    h.line,
    h.intro,
    h.contribution,
    h.note,
    p.h,
    ...p.items.flatMap((i) => [i.k, i.v]),
    // mine tags treated as short captions — excluded from main narrative count
    ...Object.values(c).flatMap((ch) => [ch.h, ch.finding, ch.decision]),
    d.h,
    d.lead,
    d.status,
  ]
  return parts.reduce((n, s) => n + words(s), 0)
}
