/**
 * LuminiPet case-study PREVIEW — asset manifest.
 *
 * One place to edit every image path, caption, and evidence status used by
 * /preview/luminipet. Nothing here is imported by the published case study.
 *
 * evidence:
 *   'captured'    – real screenshot taken from a LuminiPet theme preview
 *   'derived'     – diagram/summary generated from a real artifact (not a screenshot)
 *   'candidate'   – real screenshot, but its role in the story needs the owner's confirmation
 *   'placeholder' – artifact is missing; `needed` explains exactly what to capture
 *
 *   'audit'       – crop of a page from the owner's own audit document (PDF)
 *   'live'        – screenshot of luminipet.com as published on CAPTURE_DATE
 *
 * Draft/dev theme screenshots were captured on 2026-10-09 from unpublished theme
 * previews (a draft theme is NOT what luminipet.com publishes today — see SOURCES).
 * Live screenshots were captured the same day from the published store.
 */

export const BASE = '/assets/luminipet/preview/'

export const CAPTURE_DATE = '2026-10-09'

export const SOURCES = {
  draft0720: {
    id: 'draft0720',
    label: 'Theme preview · “lumini 正式版 0720” (unpublished draft)',
    short: 'Draft theme 0720',
  },
  dev0813: {
    id: 'dev0813',
    label: 'Theme preview · “Backend Lumini Dev Export 20260813” (unpublished dev theme)',
    short: 'Dev theme 0813',
  },
  export0821: {
    id: 'export0821',
    label: 'Theme export file · “lp-latest-2026-08-21” (template JSON + section files)',
    short: 'Theme export 08-21',
  },
  notes: {
    id: 'notes',
    label: 'Portfolio project notes (my own earlier write-up)',
    short: 'Project notes',
  },
  auditPdf: {
    id: 'auditPdf',
    label: 'My audit document · “Luminipet独立站盘点” (59-page PDF, Jul 2026)',
    short: 'My audit PDF',
  },
  live1009: {
    id: 'live1009',
    label: 'Published store · luminipet.com, captured 2026-10-09',
    short: 'Live site 10-09',
  },
}

export const EVIDENCE = {
  audit: { label: 'My audit', tone: 'audit' },
  live: { label: 'Live today', tone: 'live' },
  captured: { label: 'Captured screenshot', tone: 'ok' },
  derived: { label: 'Summary from theme export', tone: 'derived' },
  candidate: { label: 'Needs your confirmation', tone: 'warn' },
  placeholder: { label: 'Placeholder · artifact needed', tone: 'missing' },
}

const shot = (file, w, h, rest) => ({ src: BASE + file, width: w, height: h, ...rest })

const audit = (file, w, h, page, alt, caption) =>
  shot(file, w, h, {
    alt,
    caption,
    evidence: 'audit',
    source: 'auditPdf',
    page: `Audit PDF, p. ${page}`,
    viewport: 'Document crop',
  })

const live = (file, page, alt, caption) =>
  shot(file, 2000, 1250, {
    alt,
    caption,
    evidence: 'live',
    source: 'live1009',
    page,
    viewport: 'Desktop 1440',
  })

export const assets = {
  // ───────── 0. my audit document (crops of the PDF) ─────────
  auditPriority: audit(
    'audit-priority.jpg',
    1694,
    1171,
    2,
    'Priority table from my audit: every workstream ranked P0 to P3. P0 covers brand positioning, product matrix, tracking and the core website rebuild; P3 covers Trade Program and PMax scale-up.',
    'Priority map, P0 to P3.',
  ),
  auditHome: audit(
    'audit-home.jpg',
    1439,
    978,
    10,
    'Homepage diagnosis table from my audit: five issues, each with its impact and a direction. The first screen lacks visual proof, the 3D difference is not up front, the memorial scene is unclear, social proof is thin, and the animal-rescue promise needs evidence.',
    'Homepage diagnosis: issue, impact, direction.',
  ),
  auditHomeOrder: audit(
    'audit-home-order.jpg',
    1384,
    862,
    10,
    'The homepage order I specified, nine steps: hero banner, before and after, choose your format, bestsellers, why LuminiPet, 3D relief difference, gift and memorial, pet-parent reactions, how it works, photo guide and style quiz.',
    'Spec: homepage order.',
  ),
  auditPdp3d: audit(
    'audit-pdp3d.jpg',
    1694,
    1570,
    22,
    'Section order I specified for the 3D mineral-relief product page: 18 sections from the purchase area to related products, including a Photo-to-3D process video, mineral material and craft, and 3D depth and tactility.',
    'Spec: section order, 3D product page.',
  ),
  auditNav: audit(
    'audit-nav.jpg',
    1694,
    1235,
    8,
    'Proposed three-level navigation table: Shop (Shop All, Best Sellers, Custom Portraits, Custom Keepsakes, Shop by Occasion) and Find Your Style (Take the Style Quiz, Choose by Portrait Type, Style and Budget), each with the job its page does.',
    'Spec: three-level navigation.',
  ),
  auditRoles: audit(
    'audit-roles.jpg',
    1694,
    399,
    18,
    'Before and after table for character roles. Before: one 3D page with every role as a variant. After: one standalone page per core role, each with its own title, images, copy and reviews.',
    'Spec: character roles become standalone pages.',
  ),
  auditFlow: audit(
    'audit-flow.jpg',
    1439,
    579,
    19,
    'Table for a unified four-step order path: Pet Count and Size, Frame, Upload and Personalize, Extras, then submit. Each step lists what the shopper chooses and what the page must show.',
    'Spec: one four-step order path.',
  ),
  auditGsc: audit(
    'audit-gsc.jpg',
    1540,
    1181,
    4,
    'Two Search Console screenshots. Before: the sitemap cannot be fetched and zero pages are found. After: the sitemap is submitted on 22 July 2026, status success, 59 pages found.',
    'Sitemap: could not fetch, then 59 pages found.',
  ),
  auditGa4: audit(
    'audit-ga4.jpg',
    1540,
    631,
    4,
    'Dialog showing Search Console linked to the luminipet.com data stream, status: link created.',
    'Search Console linked to GA4.',
  ),

  // ───────── 0b. the published store, as of capture date ─────────
  liveTrust: live(
    'l-home-trust.jpg',
    '/ (below hero)',
    'Live homepage below the hero: a four-item trust bar reading Real Artists, Free Preview and Revisions, Satisfaction Guarantee, Fast Free Shipping, above the Custom Hand-Painted Pet Portrait section.',
    'Trust bar under the hero.',
  ),
  liveFormats: live(
    'l-home-formats.jpg',
    '/ (format section)',
    'Live homepage section “Custom Hand-Painted Pet Portrait”: four portrait tiles beside a large photo of an artist painting a cat on an easel.',
    'Format sections on the homepage.',
  ),
  liveReactions: live(
    'l-home-reactions.jpg',
    '/ (Why They Love Luminipet)',
    'Live homepage carousel “Why They Love Luminipet — from real pet parents”, showing customer photos and videos of finished portraits.',
    'Pet-parent reactions.',
  ),
  liveMenu: live(
    'l-home-menu.jpg',
    '/ (Shop All menu)',
    'Live Shop All menu open: By Medium (All Products, Custom Hand-Painted, Custom Hand-Sculpted, Custom Pet Gifts) and By Style (Realistic, Royal, Personas, World Tour), beside four featured product tiles.',
    'Shop All: By Medium, By Style.',
  ),
  liveQuiz: live(
    'l-quiz.jpg',
    '/pages/take-the-style-quiz',
    'Live page “Find Your Style”, step 1: Pick Your Product Type, with 2D Hand-Painted Portrait, 3D Hand-Sculpted Portrait and Custom Pet Gifts.',
    'Style Quiz.',
  ),
  livePdpSculpted: live(
    'l-pdp-hs-top.jpg',
    '/products/the-king-hand-sculpted-3d-pet-portrait',
    'Live product page “The King, Custom Hand-Sculpted”: trust bar, a framed sculpted portrait, and the Customize, Upload, Complete steps with Number of Pets.',
    'A standalone character page.',
  ),
  livePdpProcess: live(
    'l-pdp-hp-process.jpg',
    '/products/realistic-pet-portrait-hand-painted-pet-portrait',
    'Live hand-painted product page section “From Photo To Canvas” over a video of brush and paint, with three promises: painted by real artists, preview in 2 days, 100% satisfaction.',
    'From Photo To Canvas.',
  ),

  // ───────── 0c. the website, shown first (screenshots supplied by the owner, 2026-10-09) ─────────
  tourHero: shot('tour-hero.jpg', 1007, 790, {
    alt: 'luminipet.com homepage: a close-up of a brush painting a dog portrait behind the headline “Custom Pet Portraits, Hand-Painted by Real Artists” and a Book Yours button, under a brown header with Shop All, Halloween Gifts, Find Your Style and About Us.',
    caption: 'Homepage',
    evidence: 'live',
    source: 'live1009',
    page: '/',
    viewport: 'Desktop, supplied by owner',
  }),
  tourFormats: shot('tour-formats.jpg', 997, 794, {
    alt: 'Homepage section “Custom Hand-Painted Pet Portrait”: four portrait tiles (Holy Angel, Realistic Pet Portrait, The King, The Queen), each with a Shop link, beside a photo of an artist painting a crowned cat on an easel.',
    caption: 'Format section',
    evidence: 'live',
    source: 'live1009',
    page: '/ (format section)',
    viewport: 'Desktop, supplied by owner',
  }),
  tourMenu: shot('tour-menu.jpg', 997, 771, {
    alt: 'Shop All menu open: By Medium lists All Products, Custom Hand-Painted, Custom Hand-Sculpted and Custom Pet Gifts; By Style lists Realistic, Royal, Personas and World Tour; featured tiles sit on the right.',
    caption: 'Shop All menu',
    evidence: 'live',
    source: 'live1009',
    page: '/ (Shop All menu)',
    viewport: 'Desktop, supplied by owner',
  }),
  tourQuiz: shot('tour-quiz.jpg', 1010, 836, {
    alt: 'Find Your Style, step 1 “Pick Your Product Type”: 2D Hand-Painted Portrait (45 options, from $239), 3D Hand-Sculpted Portrait (3 options, from $399) and Custom Pet Gifts (8 options, from $35).',
    caption: 'Find Your Style',
    evidence: 'live',
    source: 'live1009',
    page: '/pages/take-the-style-quiz',
    viewport: 'Desktop, supplied by owner',
  }),

  // ───────── 1. finished experience ─────────
  heroHome: shot('d-home-hero.jpg', 2400, 1377, {
    alt: 'LuminiPet storefront homepage: announcement bar, logo, a three-item main navigation, and a hero image of a painted cat portrait on an easel.',
    caption: 'Storefront homepage.',
    evidence: 'captured',
    source: 'draft0720',
    page: '/',
    viewport: 'Desktop',
  }),

  // ───────── 3A. routes into the catalog ─────────
  menu: shot('d-menu.jpg', 2400, 1377, {
    alt: 'Shop All mega menu open: columns for By Medium, By Series, Custom Pet Keepsakes and Help & Info, beside four featured product tiles.',
    caption: 'Shop All menu, open.',
    evidence: 'captured',
    source: 'draft0720',
    page: '/ (Shop All menu)',
    viewport: 'Desktop',
  }),
  menuDetail: shot('d-menu-detail.jpg', 1400, 962, {
    alt: 'Close-up of the Shop All menu text: By Medium lists Gallery-Printed, 2D Hand-Painted and 3D Hand-Sculpted Portrait; By Series lists True-to-Life, Character Roles, Royal Style and Pet World-Tour; Custom Pet Keepsakes lists Magnet, Mugs, Keychain, Apparel, Cap, Necklace.',
    caption: 'Shop All menu, enlarged.',
    evidence: 'captured',
    source: 'draft0720',
    page: '/ (Shop All menu)',
    viewport: 'Detail crop',
    // percent boxes on this crop → left, top, width, height
    regions: [
      { id: 'medium', x: 1.5, y: 1.5, w: 35, h: 29 },
      { id: 'series', x: 49.5, y: 1.5, w: 28, h: 35 },
      { id: 'keepsakes', x: 1.5, y: 38.5, w: 35, h: 48 },
    ],
  }),
  homeFormats: shot('d-home-formats.jpg', 2400, 1377, {
    alt: 'Homepage section “Discover All Pet Arts” with four tiles: 2D Hand-Painted Portrait from $239, 3D Handmade Relief Portrait from $449, Gallery-Printed Portrait, and Custom Pet Keepsakes from $35.',
    caption: 'The same four formats on the homepage.',
    evidence: 'captured',
    source: 'draft0720',
    page: '/ (Discover All Pet Arts)',
    viewport: 'Desktop',
  }),
  hubStep1: shot('d-hub-step1.jpg', 2400, 1377, {
    alt: 'Page “Create Your Custom Pet Portrait”, Step 1: Pick Your Product Type, with four choices: Gallery-Printed, 2D Hand-Painted, 3D Hand-Sculpted, Custom Pet Keepsakes.',
    caption: 'A two-step chooser: product type, then art series.',
    evidence: 'captured',
    source: 'draft0720',
    page: '/pages/immortalize-your-pet',
    viewport: 'Desktop',
  }),
  collection2d: shot('d-collection-2d.jpg', 2400, 1377, {
    alt: '2D Hand-Painted Portrait collection page showing a four-column grid of portrait products priced at $239.',
    caption: 'One collection per format.',
    evidence: 'captured',
    source: 'draft0720',
    page: '/collections/custom-pet-canvas-portrait',
    viewport: 'Desktop',
  }),

  // ───────── 3B. format-specific product pages ─────────
  pdpPaintedConfig: shot('d-pdp-painted-config.jpg', 1328, 2124, {
    alt: 'Hand-painted product page options: Number of Pets, Portrait Size with six sizes from 8 by 12 to 24 by 35.5 inches, and Frame Style with Unframed, White and Black.',
    caption: '2D Hand-Painted · /products/astronaut-hand-painted-pet-portrait',
    evidence: 'captured',
    source: 'draft0720',
    page: '/products/astronaut-hand-painted-pet-portrait',
    viewport: 'Detail crop of desktop page',
    regions: [
      { id: 'sizes', x: 0, y: 26.5, w: 100, h: 48 },
      { id: 'frames', x: 0, y: 75.5, w: 100, h: 24.5 },
    ],
  }),
  pdpSculptedConfig: shot('d-pdp-sculpted-config.jpg', 1328, 2124, {
    alt: 'Hand-sculpted product page options: Number of Pets, Portrait Style (Crown Only, Half Body, Full Body), Portrait Size with two sizes, and Frame Style with three wood frames.',
    caption: '3D Hand-Sculpted · /products/the-king-hand-sculpted-3d-pet-portrait',
    evidence: 'captured',
    source: 'draft0720',
    page: '/products/the-king-hand-sculpted-3d-pet-portrait',
    viewport: 'Detail crop of desktop page',
    regions: [
      { id: 'style', x: 0, y: 27.5, w: 100, h: 22 },
    ],
  }),
  pdpPaintedTop: shot('d-pdp-painted-top.jpg', 2400, 1377, {
    alt: 'Hand-painted product page: gallery of the portrait, price $239, a three-step progress bar (Customize, Upload, Complete) and the first options.',
    caption: 'Hand-painted product page, top of page.',
    evidence: 'captured',
    source: 'draft0720',
    page: '/products/astronaut-hand-painted-pet-portrait',
    viewport: 'Desktop',
  }),
  pdpSculptedTop: shot('d-pdp-sculpted-top.jpg', 2400, 1377, {
    alt: 'Hand-sculpted product page: gallery of a framed relief portrait, price $449, the same three-step progress bar, and a Portrait Style option.',
    caption: 'Hand-sculpted product page, top of page.',
    evidence: 'captured',
    source: 'draft0720',
    page: '/products/the-king-hand-sculpted-3d-pet-portrait',
    viewport: 'Desktop',
  }),

  // ───────── 3C. explorer panels ─────────
  explorerPainted: shot('b-hp-hotspot.jpg', 1200, 1492, {
    alt: 'Section “Brushstroke & Detail Proof”: a close-up painting of a dog with six tappable hotspot markers and the caption “Tap a point on the painting to zoom in and inspect the craftsmanship.”',
    caption: 'Hand-painted: tappable detail hotspots.',
    evidence: 'captured',
    source: 'dev0813',
    page: '/products/astronaut-hand-painted-pet-portrait?view=hand-painted',
    viewport: 'Narrow pane 600 px',
  }),
  explorerPaintedProcess: shot('b-hp-canvas.jpg', 1200, 1492, {
    alt: 'Section “From photo to canvas”: a six-stage list — Composition, Sketch, Color Matching, Physical Painting, Detail Refinement — with the Physical Painting stage expanded.',
    caption: 'Hand-painted: six-stage process list.',
    evidence: 'captured',
    source: 'dev0813',
    page: '/products/astronaut-hand-painted-pet-portrait?view=hand-painted',
    viewport: 'Narrow pane 600 px',
  }),
  explorerSculpted: shot('b-hs-depth.jpg', 1200, 1492, {
    alt: 'Section “3D depth & tactility” with a hand-sculpted badge, a painting with four hotspot markers, and a callout card titled Side thickness.',
    caption: 'Hand-sculpted: depth and tactility proof.',
    evidence: 'captured',
    source: 'dev0813',
    page: '/products/the-king-hand-sculpted-3d-pet-portrait?view=hand-sculpted',
    viewport: 'Narrow pane 600 px',
  }),
  explorerKeepsake: shot('d-pdp-keepsake-craft.jpg', 2400, 1377, {
    alt: 'Mug product page craft section: “Created By Real Artists” and “Premium Sublimation Print & Safe Ceramic”, each with a photograph.',
    caption: 'Keepsake (mug): material and print proof.',
    evidence: 'captured',
    source: 'draft0720',
    page: '/products/custom-pet-portrait-mug',
    viewport: 'Desktop',
  }),
  explorerKeepsakeTop: shot('d-pdp-keepsake-top.jpg', 2400, 1377, {
    alt: 'Mug product page: a mug with a cat portrait and the name Oliver, price $37, a size choice (10 oz, 15 oz), photo upload area and Add to cart.',
    caption: 'Keepsake (mug): one short configuration.',
    evidence: 'captured',
    source: 'draft0720',
    page: '/products/custom-pet-portrait-mug',
    viewport: 'Desktop',
  }),
  explorerPrint: {
    placeholder: true,
    alt: 'Placeholder for the Gallery-Printed product page.',
    caption: 'Gallery-Printed: screenshot needed.',
    evidence: 'placeholder',
    needed:
      'The Gallery-Printed collection is empty and its menu product links return 404 in the draft theme, so no print product page could be captured. Capture any product rendered with the print template, e.g. <dev-theme preview>/products/<handle>?view=print, at 1440 px wide. Suggested file: d-pdp-print-top.jpg',
    page: '?view=print',
    aspect: '16 / 9',
  },

  // ───────── 4. iteration ─────────
  iterationEarlier: shot('d-pdp-painted-story.jpg', 2400, 1377, {
    alt: 'Lower part of a hand-painted product page in the draft theme: a “Museum-Quality Handcrafted Art” text-and-image row, followed by a Frequently Asked Questions accordion.',
    caption: 'Earlier approach: generic story rows and accordion text.',
    evidence: 'candidate',
    source: 'draft0720',
    page: '/products/astronaut-hand-painted-pet-portrait (scrolled)',
    viewport: 'Desktop',
  }),
  iterationFinal: shot('b-hp-hotspot.jpg', 1200, 1492, {
    alt: 'Implemented version: the “Brushstroke & Detail Proof” hotspot module.',
    caption: 'Implemented version: media-first hotspot proof.',
    evidence: 'candidate',
    source: 'dev0813',
    page: '/products/astronaut-hand-painted-pet-portrait?view=hand-painted',
    viewport: 'Narrow pane 600 px',
  }),

  // ───────── mobile ─────────
  mHome: shot('m-home.jpg', 780, 1550, {
    alt: 'Mobile homepage: logo with menu button, and the hero image above the headline.',
    caption: 'Mobile · home',
    evidence: 'captured',
    source: 'draft0720',
    page: '/',
    viewport: 'Phone 390 px',
  }),
  mMenu: shot('m-menu.jpg', 780, 1550, {
    alt: 'Mobile navigation open with Shop All expanded: By Medium, By Series, Custom Pet Keepsakes, Help & Info.',
    caption: 'Mobile · Shop All menu',
    evidence: 'captured',
    source: 'draft0720',
    page: '/ (menu)',
    viewport: 'Phone 390 px',
  }),
  mSculptedOptions: shot('m-pdp-sculpted-options.jpg', 780, 1550, {
    alt: 'Mobile hand-sculpted product page: price $449, progress bar, Number of Pets, and Portrait Style choices.',
    caption: 'Mobile · hand-sculpted options',
    evidence: 'captured',
    source: 'draft0720',
    page: '/products/the-king-hand-sculpted-3d-pet-portrait',
    viewport: 'Phone 390 px',
  }),

  // ───────── missing process artifacts ─────────
  earlierHome: {
    placeholder: true,
    alt: 'Placeholder for the earlier flat-catalog homepage.',
    caption: 'Earlier homepage: screenshot needed.',
    evidence: 'placeholder',
    needed:
      'A before screenshot of the legacy homepage / flat “Bespoke Art Collection” from Shopify admin → Online Store → Themes (theme history or the pre-rebuild theme preview). Suggested file: before-home.jpg',
    aspect: '16 / 9',
  },
}

/** Sticky walkthrough copy for chapter A, keyed to menu.regions[].id */
export const MENU_STEPS = [
  {
    id: 'medium',
    label: 'By Medium',
    text: 'The format comes first: it sets the price and how the piece is made.',
  },
  {
    id: 'series',
    label: 'By Series',
    text: 'Themes are a second route: True-to-Life, Character Roles, Royal Style, Pet World-Tour.',
  },
  {
    id: 'keepsakes',
    label: 'Custom Pet Keepsakes',
    text: 'Gifts get their own branch: magnet, mug, keychain, apparel, cap, necklace.',
  },
]

/** Product-format screen explorer (chapter C) */
export const EXPLORER = [
  {
    id: 'painted',
    label: 'Hand-painted',
    shots: [
      { id: 'explorerPainted', label: 'Detail proof' },
      { id: 'explorerPaintedProcess', label: 'Process' },
    ],
    unique: 'Hotspot detail proof and a six-stage canvas process.',
    shared: 'Guarantee, FAQ, service promise, customer photos.',
  },
  {
    id: 'sculpted',
    label: 'Hand-sculpted',
    shots: [{ id: 'explorerSculpted', label: 'Depth proof' }],
    unique: 'Depth and tactility proof with its own callouts.',
    shared: 'Guarantee, FAQ, service promise, customer photos.',
  },
  {
    id: 'keepsake',
    label: 'Keepsake',
    shots: [
      { id: 'explorerKeepsakeTop', label: 'Setup' },
      { id: 'explorerKeepsake', label: 'Material proof' },
    ],
    unique: 'A short setup (size, photo upload) and material proof for the mug.',
    shared: 'Guarantee, FAQ, service promise, customer photos.',
  },
  {
    id: 'print',
    label: 'Gallery-Printed',
    shots: [{ id: 'explorerPrint', label: 'Product page' }],
    unique: 'Template exists in the theme export (print-before-after, print-making-process…).',
    shared: 'Guarantee, FAQ, service promise, customer photos.',
  },
]

/**
 * Template → section map. Derived from templates/product.{print,hand-painted,
 * hand-sculpted,keepsakes}.json in the 2026-08-21 theme export.
 */
export const TEMPLATE_MAP = {
  shared: [
    'print-service-commitment',
    'print-ugc-carousel',
    'print-guarantee',
    'print-faq',
    'custom-portraits-link-grid',
    'sticky-add-to-cart',
  ],
  templates: [
    {
      id: 'product.print',
      label: 'Print',
      unique: ['print-before-after', 'print-vs-ai', 'print-making-process', 'print-feature-switcher'],
    },
    {
      id: 'product.hand-painted',
      label: 'Hand-painted',
      unique: ['hp-detail', 'hp-canvas-process', 'hp-artist', 'hp-timeline'],
    },
    {
      id: 'product.hand-sculpted',
      label: 'Hand-sculpted',
      unique: ['hs-photo-to-relief', 'hs-depth-tactility', 'hs-materials-craft', 'hs-heirloom'],
    },
    {
      id: 'product.keepsakes',
      label: 'Keepsakes',
      unique: ['print-how-it-works', 'print-occasions', 'print-delivery', 'print-making-process'],
    },
  ],
}

/** Verified navigation names (from the storefront menu capture). */
export const NAV = {
  medium: ['Gallery-Printed Portrait', '2D Hand-Painted Portrait', '3D Hand-Sculpted Portrait'],
  series: ['True-to-Life', 'Character Roles', 'Royal Style', 'Pet World-Tour'],
  keepsakes: ['Magnet', 'Mugs', 'Keychain', 'Apparel', 'Cap', 'Necklace'],
}

/**
 * Spec → section trace. Left: section names from the audit PDF (p. 20–22).
 * Right: section files in the 2026-08-21 theme export. Both sides are quoted
 * from those two artifacts; the pairing is by name and by position in the spec.
 */
export const SPEC_TRACE = [
  { spec: 'Photo-to-3D process video', section: 'hs-photo-to-relief' },
  { spec: 'Mineral material & craft', section: 'hs-materials-craft' },
  { spec: '3D depth & tactility', section: 'hs-depth-tactility' },
  { spec: 'Brushstroke & detail close-ups', section: 'hp-detail' },
  { spec: 'From sketch to canvas', section: 'hp-canvas-process' },
  { spec: 'Printed vs AI filter', section: 'print-vs-ai' },
]

/** Screenshot checklist surfaced at the bottom of the preview. */
export const CHECKLIST = [
  {
    file: 'before-home.jpg',
    where: 'Iteration chapter (a true before/after)',
    url: 'Shopify admin → Online Store → Themes → the pre-rebuild theme or theme history, homepage preview',
    note: 'Needed for any true before/after.',
  },
  {
    file: 'd-pdp-print-top.jpg',
    where: 'System chapter · explorer · Gallery-Printed tab',
    url: '<dev theme preview>/products/<any-product>?view=print (1440 px wide)',
    note: 'No print product is live in the draft theme.',
  },
  {
    file: 'd-hp-hotspot-desktop.jpg',
    where: 'System chapter · explorer · Hand-painted tab, and the iteration final state',
    url: '<dev theme preview>/products/astronaut-hand-painted-pet-portrait?view=hand-painted, scrolled to “Brushstroke & Detail Proof” (1440 px wide)',
    note: 'Current image is a 600 px-wide capture. The published store no longer renders this module (zero height), so it cannot be re-captured there.',
  },
  {
    file: 'd-hs-depth-desktop.jpg',
    where: 'System chapter · explorer · Hand-sculpted tab',
    url: '<dev theme preview>/products/the-king-hand-sculpted-3d-pet-portrait?view=hand-sculpted, “3D depth & tactility” (1440 px wide)',
    note: 'Current image is a 600 px-wide capture.',
  },
  {
    file: 'iteration-earlier-*.jpg',
    where: 'Iteration chapter',
    url: 'Any saved earlier design, Shopify theme version, feedback screenshot or commit diff of the product-page story section',
    note: 'The current “earlier” frame is a candidate from the 0720 draft.',
  },
]
