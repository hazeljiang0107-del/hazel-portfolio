/**
 * LuminiPet case study — the full list of problems named in my audit
 * (“Luminipet独立站盘点”, 59-page PDF, Jul 2026), translated to English.
 *
 * Every entry cites the audit page it comes from. Nothing here is added from outside the
 * document. `status` is deliberately conservative:
 *   'handled'   – the audit itself records it as done (p. 4)
 *   'specified' – the audit sets out the fix; I do not claim the outcome
 *   'planned'   – the audit puts it later in the plan (P2/P3)
 *   'open'      – the audit flags it as a risk that still needs a decision
 * Each row follows the audit's diagnosis tables: problem, impact, fix.
 */

export const STATUS_LABEL = {
  handled: 'Handled',
  specified: 'Specified in my audit',
  planned: 'Planned',
  open: 'Open risk',
}

export const PROBLEM_GROUPS = [
  {
    id: 'proof',
    label: 'First impression and proof',
    where: 'Homepage',
    items: [
      {
        problem: 'The first screen lacks visual proof.',
        impact: 'Many promises in text, but little instant impact from the original photo to the finished piece.',
        fix: 'Put before/after, or the original photo, the finished piece and a scene, on the first screen.',
        page: 10,
        status: 'specified',
      },
      {
        problem: 'The 3D difference is not up front.',
        impact: 'Titles and meta tags stress 3D mineral relief, but the homepage does not make it stand out.',
        fix: 'Add 3D relief detail, side thickness and the hand-making process to the homepage.',
        page: 10,
        status: 'specified',
      },
      {
        problem: 'The memorial occasion is easy to miss.',
        impact: 'Pet memorial is a high-emotion, high-ticket occasion.',
        fix: 'Add a Pet Memorial Portrait / Sympathy Gift module.',
        page: 10,
        status: 'specified',
      },
      {
        problem: 'Social proof is thin.',
        impact: 'No strong UGC, reactions or wall of real reviews.',
        fix: 'Add pet-parent reactions and a review photo wall to the homepage.',
        page: 10,
        status: 'specified',
      },
      {
        problem: 'The animal-rescue promise needs evidence.',
        impact: 'A good idea, but without evidence it weakens trust.',
        fix: 'Add a donation mechanism, partner organizations, a per-order amount or regular reports.',
        page: 10,
        status: 'specified',
      },
    ],
  },
  {
    id: 'structure',
    label: 'Structure and navigation',
    where: 'Site-wide',
    items: [
      {
        problem: 'The site structure is only partly built.',
        impact: 'Many collections, product pages, guides and project pages are still missing.',
        fix: 'Build them in phases.',
        page: 1,
        status: 'specified',
      },
      {
        problem: 'Collection pages have no defined jobs.',
        impact: 'Shop All, Custom Portraits, the craft and style collections and Keepsakes have no clear purpose each.',
        fix: 'A three-level menu, with one job per collection page.',
        page: 11,
        status: 'specified',
      },
    ],
  },
  {
    id: 'pdp',
    label: 'Product pages',
    where: 'PDP',
    items: [
      {
        problem: 'Character roles are variants on one page.',
        impact:
          'Too many options on the first screen. No separate ads or keywords per role. Shoppers pick the role again after a role ad. No way to tell which role earns clicks and orders. Images, UGC and reviews cannot be matched to a role.',
        fix: 'One standalone page per role, starting with the 8 to 12 strongest.',
        page: 17,
        status: 'specified',
      },
      {
        problem: 'Splitting pages risks thin copies.',
        impact: 'Swapping only the role name makes near-duplicate pages.',
        fix: 'Give each page its own images, title, description, scene copy, gift recipient, FAQ and UGC.',
        page: 19,
        status: 'specified',
      },
      {
        problem: 'There is no single order path.',
        impact: 'Pet count sits outside the Size, Frame, Upload and Extras logic.',
        fix: 'Four steps: Pet Count & Size, Frame, Upload & Personalize, Extras.',
        page: 19,
        status: 'specified',
      },
      {
        problem: 'Each format has a different thing to prove.',
        impact:
          'Printed must prove it is not an AI filter or generic print-on-demand. Hand-painted, real brushwork. Hand-sculpted, real depth. Keepsakes, real use.',
        fix: 'A product page per format, built around what that format must prove.',
        page: 20,
        status: 'specified',
      },
    ],
  },
  {
    id: 'find',
    label: 'Findability and tracking',
    where: 'Search and data',
    items: [
      {
        problem: 'Search Console had no sitemap.',
        impact: 'Nothing was being crawled.',
        fix: 'Submitted 22 July 2026: 59 pages found.',
        page: 4,
        status: 'handled',
      },
      {
        problem: 'Search Console and GA4 were not linked.',
        impact: 'Search data and site analytics sat apart.',
        fix: 'Linked to the luminipet.com data stream.',
        page: 4,
        status: 'handled',
      },
      {
        problem: 'Pages were not set up for search.',
        impact: 'Heavy 3D images, UGC video and review plugins put page speed at risk.',
        fix: 'One core page per search intent, unique titles and meta descriptions, one H1, product schema, clean canonical URLs, fast mobile pages.',
        page: 24,
        status: 'specified',
      },
    ],
  },
  {
    id: 'brand',
    label: 'Brand and trust',
    where: 'Positioning',
    items: [
      {
        problem: 'The brand message is too generic.',
        impact:
          'Each competitor owns a clear reason to buy: Crown & Paw, fun and animal welfare; West & Willow, home decor; PaintYourLife, professional craft; PortraitFlip, low-risk value. “We love pets” does not set LuminiPet apart.',
        fix: 'Real artists who capture the expression only family would recognize.',
        page: 27,
        status: 'specified',
      },
      {
        problem: 'Real content assets are scarce.',
        impact: 'Few real customer photos, reactions, creator content, UGC or making-process material.',
        fix: 'Shoot the visual assets (P0) and launch a UGC creator program (P1).',
        page: 1,
        status: 'specified',
      },
    ],
  },
  {
    id: 'around',
    label: 'Around the site',
    where: 'Ads, social, CRM',
    items: [
      {
        problem: 'The Facebook page was tied to a banned Business Manager.',
        impact: 'Permissions could not be assigned, and the page could not be linked to the ad account in the new Business Manager.',
        fix: 'A new Business Manager was bought for the ad account; a different page may become the main brand page.',
        page: 5,
        status: 'open',
      },
      {
        problem: 'Ads were not ready to scale.',
        impact: 'Accounts and creative tests could start, but core pages, tracking and social proof were not solid yet.',
        fix: 'Run creative tests first; scale once the pages show results.',
        page: 1,
        status: 'planned',
      },
      {
        problem: 'The social presence is minimal.',
        impact: 'Only a Facebook Page and Instagram, and the Instagram avatar is not yet the brand logo.',
        fix: 'Set up Instagram and Facebook basics, then test TikTok and Pinterest (P1).',
        page: 6,
        status: 'planned',
      },
      {
        problem: 'There is no customer-relationship system.',
        impact: 'No CRM, pet profiles, automated email, UGC collection or referrals.',
        fix: 'Start with welcome, abandoned-cart, post-purchase and review/UGC emails (P2).',
        page: 1,
        status: 'planned',
      },
      {
        problem: 'Growth programs wait on missing pieces.',
        impact: 'The rescue program needs partner organizations and donation rules; the trade program needs a finished site and case studies.',
        fix: 'Find rescue partners first (P2); design the trade model before any offline channel (P3).',
        page: 1,
        status: 'planned',
      },
    ],
  },
]

export const PROBLEM_COUNT = PROBLEM_GROUPS.reduce((n, g) => n + g.items.length, 0)

/**
 * Priority map from my audit, p. 2, translated from Chinese. The PDF crops the table's
 * fourth column off the page edge, so only Area, Priority and Current action are given.
 */
export const PRIORITY_MAP = [
  ['Brand positioning and core message', 'P0', 'Confirm the positioning, slogan, product naming and key selling points.'],
  ['Product range and pricing', 'P0', 'Lock 2D as the lead product, 3D as the profit product, Gallery as the entry product and Keepsakes as add-ons.'],
  ['Tracking and account access', 'P0', 'Fix the Facebook page and Business Manager, Pixel, GA4, Search Console and conversion events.'],
  ['Core website rebuild', 'P0', 'Homepage, Shop All, Portrait Collection, the core 2D and 3D product pages, and the order flow.'],
  ['Website visual assets', 'P0', 'Before/after, 3D close-ups, side thickness, the making process, customers with their piece.'],
  ['Day-to-day site operations', 'P0', 'Page requests, release schedule, QA, campaign pages, product information.'],
  ['Instagram and Facebook basics', 'P1', 'Consistent visuals, content series, posting rhythm, campaigns.'],
  ['TikTok content test', 'P1', 'Sign up, post native pet content, test reaction and before/after videos.'],
  ['Pinterest library', 'P1', 'Sign up, set up boards, post finished pieces and gift scenes.'],
  ['YouTube', 'P2', 'Sign up and post Shorts first; add long-form step by step after review.'],
  ['August–September campaign', 'P1', 'Cat- and dog-themed social campaigns plus a promotion page on the site.'],
  ['UGC Creator Program', 'P1', 'Launch a recruiting page, sign the first creators, collect real content.'],
  ['In-house creator outreach', 'P1', 'Find pet creators on Instagram, TikTok and YouTube.'],
  ['Meta ads prep and testing', 'P1', 'Run creative tests first; no rush to scale.'],
  ['Google brand and high-intent search', 'P1', 'Capture existing high-intent searches; no broad keywords yet.'],
  ['Technical SEO and page mapping', 'P1', 'Finish URLs, titles, heading structure and internal links together with the rebuild.'],
  ['SEO blog at scale', 'P2', 'Finish the commercial pages first, then add guides and blog posts.'],
  ['Pet Stories hub', 'P2, leaning P1', 'Set up the template now; fill it as UGC and customer photos come in.'],
  ['Impact and Shopify Collabs', 'P1', 'Finish the basic setup; focus on recruiting creators and content partners.'],
  ['Deal and coupon affiliates', 'P3', 'Hold off on opening this widely.'],
  ['CRM and email automation', 'P2', 'Start with welcome, abandoned-cart, post-purchase and review/UGC flows.'],
  ['Rescue Program', 'P2', 'Find partner organizations first; set donation rules and how the program runs.'],
  ['Pets Looking for Homes', 'P3', 'Launch once partnerships are stable.'],
  ['Facebook Group', 'P3', 'Start once there are more customers and stories.'],
  ['Reddit', 'P2/P3', 'Listen and join discussions first; no brand account yet.'],
  ['Trade Program', 'P3', 'Design the model and materials first; no offline channels yet.'],
  ['Performance Max at scale', 'P3', 'Start after Search, Shopping, Meta and the pages show proven results.'],
]
