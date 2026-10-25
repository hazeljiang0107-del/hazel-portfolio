/**
 * LuminiPet UX story — /projects/luminipet-shopify
 *
 * SOURCE MAP:
 *   BEFORE – Shopify preview Backend Lumini Dev Export 20260813 Draft
 *   NOW    – https://luminipet.com/
 *   STYLE  – https://train-sable-79246720.figma.site (brand system I designed)
 *
 * Framing: “From an Incomplete Storefront to a Connected Shopping Experience.”
 * Captions stay short. Seasonal campaigns and review counts belong to the live store.
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
    line: 'From an Incomplete Storefront to a Connected Shopping Experience.',
    intro:
      'My director named the pages the store needed. I designed three solutions that connect browsing, product proof, and customization.',
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
        v: 'What five portrait brands offer, and where shoppers hesitate.',
        src: 'Project notes.',
        compare: [
          { name: 'Crown & Paw', does: 'Emotional personalization and gifting', worry: 'Delivery and product quality' },
          { name: 'West & Willow', does: 'Premium visual presentation', worry: 'Product likeness and customization' },
          { name: 'Paint Your Life', does: 'Strong customization and revision experience', worry: 'Likeness' },
          { name: 'PortraitFlip', does: 'Handmade craftsmanship', worry: 'Revisions and communication' },
          { name: 'Cuddle Clones', does: 'Emotional keepsake value', worry: 'Delivery and likeness' },
        ],
        opportunities: [
          {
            h: 'Simplify discovery',
            d: 'Clearer product categories and navigation.',
            to: 'Find by format',
          },
          {
            h: 'Build purchase confidence',
            d: 'Stronger product examples, craftsmanship information, and consistent presentation.',
            to: 'Prove the offer',
          },
          {
            h: 'Reduce uncertainty',
            d: 'Clearer customization, revision, and delivery expectations.',
            to: 'One brand system',
          },
        ],
      },
      {
        k: 'Design priorities',
        v: 'Find by format. Prove the offer. Keep one visual system.',
        src: 'What I designed and built.',
      },
    ],
  },
  solved: {
    k: 'What I solved',
    h: 'Three design decisions that connected the shopping experience.',
    note: 'These are documented design decisions and the pages that carry them.',
    items: [
      {
        n: '01',
        h: 'Simplified Product Discovery',
        d: 'Reorganized navigation by product format and style, creating clearer pathways from browsing to individual products.',
        media: 'liveMenu',
      },
      {
        n: '02',
        h: 'Strengthened Purchase Confidence',
        d: 'Replaced text-heavy product introductions with visual proof, differentiated product formats, and clearer shopping information.',
        media: 'liveFormats',
      },
      {
        n: '03',
        h: 'Standardized Customization',
        d: 'Designed format-specific product pages within a shared purchase flow, making the experience more consistent and scalable.',
        media: 'oldPdp',
      },
    ],
  },
  chapters: {
    find: {
      id: 'find',
      h: 'Simplified Product Discovery',
      lead: 'I restructured product discovery around how customers shop.',
      problem: 'Product formats, styles, and collections were mixed together, making it difficult to identify the right product.',
      solved:
        'I designed a format-first information architecture, organizing products by medium, then style, and connecting navigation to dedicated collection pages. I also introduced a product chooser to guide shoppers toward relevant options.',
      tags: 'Information Architecture · Navigation Design · User Flows',
    },
    trust: {
      id: 'trust',
      h: 'Strengthened Purchase Confidence',
      lead: 'I made the product’s value visible before asking customers to buy.',
      problem: 'The homepage relied heavily on text and didn’t clearly communicate the differences between prints, paintings, and sculpted products.',
      solved:
        'I redesigned the homepage hierarchy to lead with visual product proof, including photo-to-artwork comparisons and clearer format differentiation. I placed product examples, craftsmanship information, and trust-building content closer to customers’ purchasing decisions.',
      tags: 'Visual Hierarchy · E-commerce UX · Brand Consistency',
    },
    identity: {
      id: 'identity',
      h: 'Standardized Customization',
      lead: 'I unified the shopping flow while accommodating different customization needs.',
      problem: 'One generic product template served multiple formats with fundamentally different options, creating an inconsistent purchasing experience.',
      solved:
        'I specified dedicated product-page structures for each format while maintaining a consistent Customize → Upload → Complete flow. Each product could present its own relevant customization options without requiring shoppers to learn a different interaction pattern.',
      tags: 'Interaction Design · Scalable Components · Shopify UX',
    },
  },
  flow: {
    id: 'flow',
    h: 'From the menu to a product',
    lead: 'On the current store, medium and style stay intact from the menu through the collection and the chooser.',
    steps: [
      { k: '01 · Shop All', v: 'Medium, then style, each with its own collection.', media: 'liveMenu' },
      { k: '02 · All products', v: 'Filters repeat product type and style.', media: 'liveCollection' },
      { k: '03 · Product type', v: 'The chooser asks for a format and shows a starting price.', media: 'liveQuiz1' },
      { k: '04 · A product', v: 'Style narrows the list inside that format.', media: 'liveQuiz2' },
    ],
  },
  delivered: {
    id: 'delivered',
    h: 'What I delivered',
    body: 'Format-first navigation, visual product proof, and one Customize → Upload → Complete flow with options that change by format. These are the decisions and the pages that carry them. Campaign banners and review modules on the current store came later.',
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
  liveMenu: still(
    '/assets/luminipet/live/menu.jpg',
    1024,
    525,
    'Current Shop All menu organized by medium and by style, with collection tiles.',
    'Shop All on the current store. Medium and style each open a collection.',
    SOURCES.now.short,
  ),
  liveCollection: still(
    '/assets/luminipet/live/collection.jpg',
    1024,
    549,
    'All Products on the current store, filtered by product type and style.',
    'All Products. The same two groups return as filters.',
    SOURCES.now.short,
  ),
  liveQuiz1: still(
    '/assets/luminipet/live/quiz-1.jpg',
    1024,
    609,
    'Find Your Style step 1, choosing painted, sculpted, or gifts.',
    'Find Your Style asks for a product type first, with a starting price.',
    SOURCES.now.short,
  ),
  liveQuiz2: still(
    '/assets/luminipet/live/quiz-2.jpg',
    1024,
    721,
    'Find Your Style step 2, Realistic and Royal filters over two sculpted portraits.',
    'Style then narrows the products inside that format.',
    SOURCES.now.short,
  ),
  oldMenu: still(
    '/assets/luminipet/live/old-menu.jpg',
    1600,
    847,
    'Earlier theme Shop All dropdown listing By Medium and By Style.',
    'Earlier theme. Medium and style are named inside a short dropdown.',
    'Earlier theme',
  ),
  oldHome: still(
    '/assets/luminipet/live/old-home.jpg',
    1600,
    872,
    'Earlier theme homepage with a dog beside a painted portrait and a sculpted relief.',
    'Earlier theme homepage. The pet sits with a painted portrait and a sculpted relief.',
    'Earlier theme',
  ),
  oldFormats: still(
    '/assets/luminipet/live/old-formats.jpg',
    1600,
    847,
    'Earlier theme format row for print, painted, sculpted, and gifts.',
    'Earlier theme. Print, painted, sculpted, and gifts are separate choices.',
    'Earlier theme',
  ),
  oldPdp: still(
    '/assets/luminipet/live/old-pdp.jpg',
    1600,
    847,
    'Earlier theme product page with a photo-to-portrait comparison and size options on a Customize, Upload, Complete bar.',
    'Earlier theme product page. This format asks for pet count and size on the shared step bar.',
    'Earlier theme',
  ),
  liveHero: still(
    '/assets/luminipet/live/live-hero.jpg',
    1600,
    900,
    'Current homepage hero with a painted cat portrait hanging in a dining room.',
    'Current homepage. The portrait is in the room before the shopper is asked to book.',
    SOURCES.now.short,
  ),
  liveFormats: still(
    '/assets/luminipet/live/live-formats.jpg',
    1600,
    900,
    'Current homepage hand-painted row, each card showing the pet photo beside the finished portrait.',
    'Current homepage. Each painted piece shows the photo, the artwork, the format, and the price.',
    SOURCES.now.short,
  ),
  liveProof: still(
    '/assets/luminipet/live/pdp-proof.jpg',
    1308,
    830,
    'Current product gallery opening with the pet photo beside the finished portrait.',
    'Current product page. The photo and the finished portrait open the gallery.',
    SOURCES.now.short,
  ),
  liveFlow: still(
    '/assets/luminipet/live/pdp-flow.jpg',
    1308,
    960,
    'Current product title, price, and Customize, Upload, Complete steps.',
    'Current product page. The format is in the title, and the bar is still Customize, Upload, Complete.',
    SOURCES.now.short,
  ),
  liveParents: still(
    '/assets/luminipet/live/parents.jpg',
    1024,
    610,
    'Why They Love Luminipet, a row of pet-parent reactions.',
    'Pet-parent reactions on the current store, placed with the work.',
    SOURCES.now.short,
  ),
  liveReviews: still(
    '/assets/luminipet/live/reviews.jpg',
    1024,
    648,
    'Customer reviews module on the current store.',
    'Reviews on the current product page. The rating is the store’s live module.',
    SOURCES.now.short,
  ),
  liveRelated: still(
    '/assets/luminipet/live/related.jpg',
    1024,
    569,
    'You May Also Like, with painted and sculpted portraits and their prices.',
    'Related products stay split by painted and sculpted formats.',
    SOURCES.now.short,
  ),
  liveStudio: still(
    '/assets/luminipet/live/studio.jpg',
    1024,
    721,
    'Our Story studio photographs of a painted portrait, a relief, and framed work.',
    'Our Story. The studio and the finished work, on the current site.',
    SOURCES.now.short,
  ),
  menuRec: clip(M.recMenu),
  pdpPainted: fromAsset(A.pdpPaintedConfig, 'Hand-painted options', SOURCES.before.short),
}

export const NAV = [
  { label: 'Overview', href: '#outcome' },
  { label: 'Priorities', href: '#priorities' },
  { label: 'Discovery', href: '#find' },
  { label: 'Confidence', href: '#trust' },
  { label: 'Customization', href: '#identity' },
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
    STORY.solved.h,
    STORY.solved.note,
    ...STORY.solved.items.flatMap((s) => [s.h, s.d]),
    ...Object.values(c).flatMap((ch) => [ch.h, ch.lead, ch.problem, ch.solved, ch.tags]),
    f.h,
    f.lead,
    ...f.steps.flatMap((s) => [s.k, s.v]),
    d.h,
    d.body,
    ...STORY.features.flatMap((x) => [x.label, x.note]),
  ]
  return parts.reduce((n, s) => n + words(s), 0)
}
