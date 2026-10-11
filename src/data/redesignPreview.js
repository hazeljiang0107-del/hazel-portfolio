/**
 * Portfolio REDESIGN preview — content manifest (/preview/redesign).
 *
 * Titles, roles, timelines, one-line descriptions and the About copy are read from
 * src/data/projects.js (single source of truth). The "mine" lines are the existing
 * `contribution` field of each project, shortened — no new claims. Every image or clip is
 * an existing asset: either used as-is, or a web-weight copy (public/assets/redesign/*.webp)
 * resized or cropped from an existing file. Nothing is generated or invented.
 *
 * `tag` is a tiny honest label on every visual:
 *   Recording      – a real screen recording
 *   Dev theme      – captured from my LuminiPet dev theme (not the live store)
 *   Prototype      – a screen from my Figma prototype (desktop shots are the top of the page)
 *   Hi-fi screen   – a hi-fi design screen
 *   Diagram / Composite – designer-made diagram or mockup of real work
 *   Frame          – a still frame from an in-engine recording
 */
import { SITE, RESUME_URL, projects } from './projects'

export { SITE, RESUME_URL }

const P = Object.fromEntries(projects.map((p) => [p.slug, p]))
const A = '/assets/redesign/'
const PV = '/assets/preview/'
const LV = '/assets/luminipet/visual/'

export const NAV = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Resume', href: RESUME_URL, external: true },
  { label: 'Contact', href: '#contact' },
]

const head = (slug, n, id) => ({
  id,
  n,
  slug,
  title: P[slug].title,
  role: P[slug].role,
  when: P[slug].timeline,
  line: P[slug].tagline,
})

const img = (src, w, h, alt, cap, tag, extra = {}) => ({ kind: 'img', src, width: w, height: h, alt, cap, tag, ...extra })

export const CHAPTERS = [
  {
    ...head('surveys-of-consumers', '01', 'soc'),
    mech: 'reel',
    mine: 'Led interview synthesis and information architecture. Co-owned search results, reports browse and the V1 → V2 handoff.',
    links: [{ label: 'Read case study', to: '/projects/surveys-of-consumers' }],
    items: [
      {
        kind: 'video',
        src: `${PV}soc-walkthrough.mp4`,
        poster: `${PV}soc-walkthrough-poster.jpg`,
        width: 1280,
        height: 800,
        alt: 'Screen recording of the redesigned Surveys of Consumers prototype: the home page with key indices, then a search for “income” and a filtered results list.',
        cap: 'Prototype walkthrough',
        tag: 'Recording',
      },
      img('/assets/soc/figma/affinity-trifold.png', 796, 470, 'Laptop mockup showing a large affinity map of colored sticky notes.', 'Interview synthesis · I led', 'Composite'),
      img('/assets/soc/figma/sitemap-trifold.png', 614, 380, 'Proposed sitemap diagram with color-coded groups and an out-of-scope region.', 'Information architecture · I led', 'Diagram'),
      img(`${A}soc-search.webp`, 1600, 1000, 'Prototype search results page: a filter column, a result count and a list of matching reports.', 'Search results · co-owned', 'Prototype'),
      img(`${A}soc-reports.webp`, 1600, 1000, 'Prototype reports page: tabs for report types and a list of monthly releases, special reports and papers.', 'Reports browse · co-owned', 'Prototype'),
      img('/assets/soc/figma/report-v1.png', 460, 592, 'First version of a report page.', 'Report page · V1', 'Prototype'),
      img('/assets/soc/figma/report-v2.png', 460, 814, 'Second version of the report page with a data table.', 'V2 · handoff path, co-owned', 'Prototype'),
    ],
  },
  {
    ...head('luminipet-shopify', '02', 'luminipet'),
    mech: 'stack',
    mine: 'Owned the information architecture and the front-end build: navigation, four product templates, homepage sections.',
    links: [{ label: 'Read case study', to: '/projects/luminipet-shopify' }],
    items: [
      {
        kind: 'img',
        src: `${A}lp-hero.webp`,
        full: `${LV}st-home-hero.jpg`,
        width: 2160,
        height: 1290,
        alt: 'Dev-theme homepage hero: headline “Custom Pet Portraits Made From the Pets You Love” beside a golden retriever, a framed 2D painted portrait of it and a smaller 3D relief, each badged 2D or 3D.',
        cap: 'First screen: the pet beside its 2D and 3D piece.',
        tag: 'Dev theme',
      },
      {
        kind: 'video',
        src: `${LV}rec-menu.mp4`,
        poster: `${LV}rec-menu-poster.jpg`,
        width: 460,
        height: 640,
        alt: 'Recording: the Shop All menu opens, By Medium expands to All Products, Hand-painted, Hand-sculpted 3D and Custom Pet Gifts, then By Style expands to Realistic, Royal, Personas and World Tour.',
        cap: 'Shop All splits by medium, then style.',
        sub: 'Built both menu levels.',
        tag: 'Recording · dev theme',
      },
      {
        kind: 'video',
        src: `${LV}rec-quiz.mp4`,
        poster: `${LV}rec-quiz-poster.jpg`,
        width: 1440,
        height: 676,
        alt: 'Recording: the homepage quiz “Not Sure Which Style Fits Your Pet?” — choose A Gift, then Character Roles, then 2D Hand-Painted, ending on a single product recommendation.',
        cap: 'A three-question style quiz.',
        tag: 'Recording · dev theme',
      },
      {
        kind: 'video',
        src: `${LV}rec-hp-detail.mp4`,
        poster: `${LV}rec-hp-detail-poster.jpg`,
        width: 1440,
        height: 944,
        alt: 'Recording: tapping hotspots on a hand-painted portrait zooms into brushstroke texture, eye detail, nose detail and pigment layering, then returns to the full artwork.',
        cap: 'Tap to inspect brushwork.',
        tag: 'Recording · dev theme',
      },
      {
        kind: 'video',
        src: `${LV}rec-hs-depth.mp4`,
        poster: `${LV}rec-hs-depth-poster.jpg`,
        width: 1440,
        height: 984,
        alt: 'Recording: in “3D depth & tactility”, choosing Side thickness, Layered fur texture, Eyes detail and Nose & facial detail zooms the relief image to each area.',
        cap: 'Zoom into relief depth.',
        tag: 'Recording · dev theme',
      },
    ],
  },
  {
    ...head('stellantis-ivi', '03', 'stellantis'),
    mech: 'spread',
    mine: 'Co-designed system logic, scenario flows and hi-fi surfaces with Gloria Yu. Owned the perceptual-alert framing and the dark-cockpit visual language.',
    links: [{ label: 'Read case study', to: '/projects/stellantis-ivi' }],
    items: [
      img(`${A}st-center.webp`, 1366, 1024, 'Center display resting home screen: time, a white SUV, a media player and shortcuts.', 'Center display · home', 'Hi-fi screen'),
      img(`${A}st-nav.webp`, 1366, 1024, 'Center display navigation with an active route and a predictive alert on the road path.', 'Navigation · early route alert', 'Hi-fi screen'),
      img(`${A}st-media.webp`, 1366, 1024, 'Center display media module with persistent now-playing context.', 'Media', 'Hi-fi screen'),
      img(`${A}st-hud.webp`, 1366, 512, 'Head-up display overlay on a night road with a spatial path and merge context.', 'HUD · a road-aligned layer', 'Hi-fi screen', { wide: true }),
    ],
  },
  {
    ...head('zingerman-deli', '04', 'zingerman'),
    mech: 'float',
    mine: 'Solo, end to end: heuristics, competitive review, usability testing (n=3), and a hi-fi prototype.',
    links: [{ label: 'Read case study', to: '/projects/zingerman-deli' }],
    items: [
      img(`${A}zg-home.webp`, 1600, 1008, 'Redesigned Zingerman’s Deli homepage with a deli-counter photo, a welcome headline, opening hours and an Order Online button.', 'Homepage · desktop', 'Prototype'),
      img(`${A}zg-m-home.webp`, 355, 1400, 'Mobile homepage.', 'Homepage · mobile', 'Prototype', { phone: true }),
      img(`${A}zg-m-list.webp`, 425, 1400, 'Mobile product listing.', 'Menu', 'Prototype', { phone: true }),
      img(`${A}zg-m-detail.webp`, 447, 1400, 'Mobile product detail.', 'Item', 'Prototype', { phone: true }),
      img(`${A}zg-m-cart.webp`, 520, 1400, 'Mobile cart.', 'Cart', 'Prototype', { phone: true }),
    ],
  },
  {
    ...head('still-here', '05', 'still-here'),
    mech: 'drift',
    dark: true,
    mine: 'End to end: field synthesis, problem framing, hi-fi app flows and a working Arduino glove prototype.',
    links: [{ label: 'Read case study', to: '/projects/still-here' }],
    items: [
      img(`${A}sh-composite.webp`, 1500, 1125, 'Two phones showing the Still Here app, floating on a black background.', 'Companion app', 'Composite', { lead: true }),
      img(`${A}sh-dash.webp`, 520, 1127, 'Still Here dashboard overview.', 'Dashboard', 'Hi-fi screen', { phone: true }),
      img(`${A}sh-nav.webp`, 520, 1127, 'Still Here co-pilot navigation screen.', 'Co-pilot navigation', 'Hi-fi screen', { phone: true }),
      img(`${A}sh-alert.webp`, 520, 1127, 'Still Here instant alerts on a lock screen.', 'Instant alerts', 'Hi-fi screen', { phone: true }),
      img(`${A}sh-call.webp`, 520, 1127, 'Still Here live support call.', 'Live support', 'Hi-fi screen', { phone: true }),
      img(`${A}sh-stats.webp`, 520, 1127, 'Still Here progress statistics.', 'Progress', 'Hi-fi screen', { phone: true }),
      img(`${A}sh-mood.webp`, 520, 1127, 'Still Here mood patterns.', 'Mood patterns', 'Hi-fi screen', { phone: true }),
    ],
  },
  {
    ...head('echoes-you-can-touch', '06', 'echoes'),
    mech: 'frames',
    mine: 'Solo design and Unity build: hub layout, portal loop, environmental storytelling, XR interaction and a palm-haptic prototype.',
    links: [{ label: 'Read case study', to: '/projects/echoes-you-can-touch' }],
    items: [
      {
        kind: 'video',
        src: `${PV}echoes-walkthrough.mp4`,
        poster: `${PV}echoes-walkthrough-poster.jpg`,
        width: 1024,
        height: 580,
        alt: 'In-engine walkthrough of the Echoes You Can Touch carnival hub: a glowing portal, string lights and a tent interior.',
        cap: 'In-engine walkthrough',
        tag: 'Recording',
      },
      img(`${A}ec-bedroom.webp`, 960, 542, 'In-engine view of the childhood bedroom level.', 'Bedroom', 'Frame'),
      img(`${A}ec-carnival.webp`, 960, 542, 'In-engine view of the cinema level: a curved screen showing a fortress under a stormy sky.', 'Cinema', 'Frame'),
      img(`${A}ec-portals.webp`, 960, 542, 'In-engine view of a glowing pink portal in the carnival.', 'Portal', 'Frame'),
      img(`${A}ec-tent.webp`, 960, 542, 'In-engine view inside the reminiscence tent.', 'Reminiscence tent', 'Frame'),
    ],
  },
]

/** Hero collage: positions are % of the stage (desktop) and of the stage again on phones. */
export const COLLAGE = [
  { to: 'luminipet', src: `${A}lp-hero.webp`, w: 1500, h: 896, alt: 'LuminiPet dev-theme homepage hero.', d: { l: 36, t: 4, w: 46, r: -4, z: 2, s: -70 }, m: { l: 4, t: 2, w: 74, r: -3 } },
  { to: 'stellantis', src: `${A}st-center.webp`, w: 1366, h: 1024, alt: 'Alfa Romeo IVI center display home screen.', d: { l: 6, t: 36, w: 25, r: 5, z: 3, s: -150 }, m: { l: 2, t: 30, w: 46, r: 4 } },
  { to: 'soc', src: `${A}soc-home.webp`, w: 1600, h: 1000, alt: 'Surveys of Consumers redesigned home page.', d: { l: 66, t: 44, w: 29, r: 3.5, z: 3, s: -110 }, m: { l: 46, t: 40, w: 50, r: -3 } },
  { to: 'still-here', src: `${A}sh-composite.webp`, w: 1500, h: 1125, alt: 'Two phones showing the Still Here app.', d: { l: 83.5, t: -2, w: 15, r: 7, z: 1, s: -190 }, m: { l: 62, t: 6, w: 34, r: 7 } },
  { to: 'zingerman', src: `${A}zg-home.webp`, w: 1600, h: 1008, alt: 'Redesigned Zingerman’s Deli homepage.', d: { l: 31, t: 63, w: 26, r: -3, z: 4, s: -60 }, m: { l: 14, t: 62, w: 62, r: -2 } },
]

export const ABOUT = {
  portrait: SITE.portrait,
  portraitAlt: 'Hazel Jiang on a bridge in Rome',
  // verbatim from src/pages/About.jsx
  paras: [
    'UX and product design student at Michigan — User Experience Design plus Biopsychology, Cognition, and Neuroscience. I design for what people feel and need under real constraints.',
    'Capstone with ISR on Surveys of Consumers, automotive IVI with Stellantis, e-commerce with Zingerman’s, and healthcare wearables. UI/UX intern at Yixin Group in Shanghai.',
  ],
  facts: [
    ['Now', `${SITE.status}, ${SITE.subline.split('·').pop().trim()}`],
    ['School', `${SITE.education.school}, ${SITE.education.years}`],
    ['Intern', `${SITE.experience.role}, ${SITE.experience.company}, ${SITE.experience.dates}`],
    ['Intern', `${P['luminipet-shopify'].role}, ${P['luminipet-shopify'].timeline}`],
  ],
}

export const FOOTER = {
  work: CHAPTERS.map((c) => ({ label: c.title, href: `#${c.id}` })),
  elsewhere: [
    { label: 'Email', href: `mailto:${SITE.email}` },
    { label: 'LinkedIn', href: SITE.linkedin, external: true },
    { label: 'Resume', href: RESUME_URL, external: true },
  ],
  site: [
    { label: 'Home', to: '/' },
    { label: 'About page', to: '/about' },
    { label: 'All projects', to: '/projects' },
  ],
}
