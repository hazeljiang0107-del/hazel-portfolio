/**
 * Three-level menu from my audit, pp. 8–9, translated from Chinese.
 * Level 1 → level 2 → level 3, each with the job its page does.
 * `flat` marks entries the audit says are one page, not a sub-category.
 * A level-2 entry with no `kids` is a page on its own.
 */
export const MENU = [
  {
    label: 'Shop',
    kids: [
      { label: 'Shop All', job: 'Every product. First item in the dropdown.' },
      { label: 'Best Sellers', job: 'Proven lead products in one place.' },
      {
        label: 'Custom Portraits',
        kids: [
          ['Gallery-Printed Portraits', 'Entry-price custom portraits'],
          ['2D Hand-Painted Portraits', 'Physical, high-emotion, higher-margin'],
          ['3D Mineral Relief Portraits', 'Hero product, the brand’s difference'],
          ['Multi-Pet Portraits', 'Multi-pet homes, higher order value'],
        ],
      },
      {
        label: 'Custom Keepsakes',
        kids: [
          ['Apparel', 'T-shirts, sweatshirts, caps'],
          ['Jewelry', 'Necklaces and other custom pieces'],
          ['Mugs', 'Custom pet mugs'],
          ['Magnets & Keychains', 'Low-price gifts and add-ons'],
        ],
      },
      {
        label: 'Shop by Occasion',
        kids: [
          ['Pet Memorial', 'Remembrance and pet loss'],
          ['Birthday & Adoption Day', 'Birthdays and adoption anniversaries'],
          ['Gifts for Pet Parents', 'Main entry for pet-owner gifts'],
          ['Mother’s Day Gifts', 'Mother’s Day'],
          ['Father’s Day Gifts', 'Father’s Day'],
          ['Valentine’s Day Gifts', 'Valentine’s Day'],
          ['Wedding & Graduation Gifts', 'Weddings and graduations'],
          ['Seasonal Gifts', 'Swapped for Christmas and other holidays'],
        ],
      },
    ],
  },
  {
    label: 'Find Your Style',
    kids: [
      { label: 'Take the Style Quiz', job: 'Recommends products by budget, occasion and taste.' },
      {
        label: 'Choose by Portrait Type',
        kids: [
          ['Gallery-Printed', 'Lower budget, faster delivery'],
          ['2D Hand-Painted', 'Memorials, gifts, physical art'],
          ['3D Mineral Relief', 'High-end, dimensional, collectible'],
        ],
      },
      {
        label: 'Choose by Style',
        kids: [
          ['True-to-Life', 'The pet’s real look and expression'],
          ['Royal', 'Royal-portrait style'],
          ['Career', 'CEO, doctor and other career roles'],
          ['World-Tour', 'Travel and world landmarks'],
        ],
      },
      {
        label: 'Choose by Budget',
        kids: [
          ['Gifts Under $50', 'Keepsakes and low-price gifts'],
          ['$50–$200', 'Printed, apparel, some portraits'],
          ['Premium Portraits', '2D, 3D, large sizes, multi-pet'],
        ],
      },
      {
        label: 'Compare Portraits',
        kids: [['Printed vs 2D vs 3D', 'Craft, price, turnaround, who each suits']],
      },
      {
        label: 'Gift Guide',
        kids: [
          ['Gifts for Dog Moms', 'Gift picks for dog owners'],
          ['Gifts for Cat Moms', 'Gift picks for cat owners'],
          ['Gifts for Pet Lovers', 'General pet-lover gifts'],
        ],
      },
      {
        label: 'Inspiration & Reviews',
        kids: [
          ['Before & After Gallery', 'Original photos beside finished pieces'],
          ['Customer Reviews', 'Real reviews in one place'],
          ['Pet Stories', 'Pet and customer stories'],
          ['Memorial Stories', 'Memorial cases, told gently'],
        ],
      },
    ],
  },
  {
    label: 'How It Works',
    flat: true,
    kids: [
      { label: 'How It Works Overview', job: 'The full flow, from choosing to delivery.' },
      {
        label: 'Photo Guide',
        kids: [
          ['Best Photo Requirements', 'Clarity, angle, light, eyes'],
          ['Old or Blurry Photos', 'How old or blurry photos are handled'],
          ['Multi-Pet Photo Guide', 'Photos and composition for several pets'],
        ],
      },
      {
        label: 'Preview & Revisions',
        kids: [
          ['Artwork Preview', 'The first-draft preview'],
          ['Revision Policy', 'How many revisions, scope, sign-off'],
          ['Final Approval', 'Final sign-off before production'],
        ],
      },
      {
        label: 'Production & Delivery',
        kids: [
          ['Gallery-Printed Timeline', 'Draft, production and shipping time'],
          ['2D Production Timeline', 'Hand-painting time'],
          ['3D Production Timeline', 'Relief-making time'],
          ['Rush Orders', 'Rush rules and cut-off dates'],
        ],
      },
      {
        label: 'Customization Options',
        kids: [
          ['Background & Outfit', 'Background, outfit and theme changes'],
          ['Names & Memorial Text', 'Names, dates, memorial text'],
          ['Multiple Pets', 'Pet count, composition, upgrade fees'],
        ],
      },
    ],
  },
  {
    label: 'Help & Info',
    kids: [
      { label: 'Buying Guide', kids: [['Pre-Purchase Help', 'Photo and product advice before buying']] },
      {
        label: 'FAQ',
        flat: true,
        kids: [
          ['Ordering FAQ', 'Ordering, payment, order confirmation'],
          ['Product FAQ', 'Printed, 2D, 3D and Keepsakes questions'],
          ['Customization FAQ', 'Photos, revisions, multiple pets'],
        ],
      },
      {
        label: 'Contact Us',
        flat: true,
        kids: [
          ['Email Support', 'Email customer service'],
          ['Order Support', 'Help with an existing order'],
        ],
      },
    ],
  },
  {
    label: 'About Us',
    kids: [
      { label: 'Our Story', kids: [['Brand Story', 'Why the brand started, its core values']] },
      { label: 'Meet the Artists', kids: [['Artist Profiles', 'The artists, their experience and work']] },
      {
        label: 'Our Craft',
        flat: true,
        kids: [
          ['Artist-Drawn Digitally', 'Digital drawing, not to be confused with hand-painting'],
          ['2D Hand-Painted', 'Real hand-painting'],
          ['3D Mineral Relief', 'Mineral sculpting, coloring, materials'],
        ],
      },
      {
        label: 'Rescue & Giving Back',
        flat: true,
        kids: [
          ['Rescue Partnerships', 'Partner rescue groups and projects'],
          ['Donation Transparency', 'Donation rules and real results'],
        ],
      },
      {
        label: 'Blog',
        flat: true,
        kids: [
          ['Pet Stories', 'Pet and customer content'],
          ['Gift Guides', 'Gifts and holidays'],
          ['Portrait Guides', 'Photos, craft, product education'],
        ],
      },
    ],
  },
]

export const MENU_PAGE_COUNT = MENU.reduce(
  (n, l1) => n + l1.kids.reduce((m, l2) => m + (l2.kids ? l2.kids.length : 1), 0),
  0,
)
