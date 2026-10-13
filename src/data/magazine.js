/**
 * Magazine preview (/preview/magazine) — extra content only.
 *
 * Everything here is either an existing asset (reused from redesignPreview.js) or a short
 * handwritten rephrase of a sentence that is already in each project's `mine` line. No new
 * claims, numbers, names or quotes.
 */
import { CHAPTERS, COLLAGE } from './redesignPreview'

export { CHAPTERS, SITE, NAV, FOOTER, ABOUT } from './redesignPreview'

const byTo = Object.fromEntries(COLLAGE.map((c) => [c.to, c]))
const portal = CHAPTERS.find((c) => c.id === 'echoes').items.find((i) => i.src.includes('ec-portals'))

/** One existing picture per project: used on the postcard front, the postage stamp and the contents preview. */
export const COVERS = {
  soc: { src: byTo.soc.src, w: byTo.soc.w, h: byTo.soc.h, alt: byTo.soc.alt },
  luminipet: { src: byTo.luminipet.src, w: byTo.luminipet.w, h: byTo.luminipet.h, alt: byTo.luminipet.alt },
  stellantis: { src: byTo.stellantis.src, w: byTo.stellantis.w, h: byTo.stellantis.h, alt: byTo.stellantis.alt },
  zingerman: { src: byTo.zingerman.src, w: byTo.zingerman.w, h: byTo.zingerman.h, alt: byTo.zingerman.alt },
  'still-here': { src: byTo['still-here'].src, w: byTo['still-here'].w, h: byTo['still-here'].h, alt: byTo['still-here'].alt },
  echoes: { src: portal.src, w: portal.width, h: portal.height, alt: portal.alt },
}

/** Margin scribbles. Each one restates part of that project's `mine` line. */
export const HAND = {
  soc: 'I led synthesis + IA',
  luminipet: 'I built the IA + the front end',
  stellantis: 'I owned the alert framing',
  zingerman: 'solo, end to end',
  'still-here': 'end to end, glove included',
  echoes: 'solo design + Unity build',
}

/** Masthead ticker: the six project titles, nothing else. */
export const TICKER = CHAPTERS.map((c) => c.title.replace(/ Redesign$| Shopify Theme System$/, ''))
