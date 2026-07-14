/**
 * Portfolio project data — edit titles, copy, and images here.
 * Each project maps to a case study page at /projects/:slug
 */

export const CATEGORIES = [
  'All',
  'UX Research',
  'Product Design',
  'Game Design',
  'Healthcare',
  'System Design',
  'Information Architecture',
  'Visual Design',
]

export const RESUME_URL = '/resume.pdf'

export const SITE = {
  name: 'Hazel Jiang',
  title: 'UX / Product Designer',
  tagline: 'I design products that feel clear under pressure — from research through interaction and systems.',
  subline: 'University of Michigan · Open to internships · Ann Arbor',
  status: 'Open to internships',
  email: 'hazeljiang0107@gmail.com',
  phone: '+1 (617) 697-5188',
  linkedin: 'https://www.linkedin.com/in/hazel-jiang-a6b263388/',
  github: null,
  portrait: '/assets/about/hazel.jpg',
  education: {
    school: 'University of Michigan',
    years: '2022–2026',
    detail: 'School of Information & College of LSA — UX Design & Biopsychology, Cognition, Neuroscience (BCN)',
  },
  experience: {
    role: 'UI/UX Design Intern',
    company: 'Yixin Limited Group',
    location: 'Shanghai, China',
    dates: 'May – Aug 2024',
  },
}

export const projects = [
  {
    id: 'surveys-of-consumers',
    slug: 'surveys-of-consumers',
    title: 'Surveys of Consumers Redesign',
    subtitle:
      'Making America’s most-watched consumer confidence index findable in seconds — not five clicks.',
    tagline: 'Search-first redesign for journalists, researchers, and policymakers.',
    featured: true,
    featuredSize: 'large',
    order: 1,
    type: 'Team Capstone · Client Project',
    role: 'UX Designer',
    timeline: 'Sep 2025 – Present',
    team: ['Nadia Malik', 'Shalin Zarboulas', 'Hazel Jiang', 'Gloria Yu'],
    tools: ['Figma', 'Miro', 'Zoom'],
    methods: ['Contextual Inquiry', 'Interviews', 'Competitive Analysis', 'Usability Testing', 'Information Architecture'],
    categories: ['UX Research', 'Product Design', 'Information Architecture'],
    accent: '#6b8cff',
    thumbnail: '/assets/soc-cover.png',
    heroImage: '/assets/soc-cover.png',
    figmaUrl: 'https://www.figma.com/design/KnpsSE9JXoaGMCFAvURWrp/Survey-of-Consumers-Redesign',
    prototypeUrl:
      'https://www.figma.com/proto/KnpsSE9JXoaGMCFAvURWrp/Survey-of-Consumers-Redesign?node-id=485-4708',
    summary:
      'Redesigned U-M’s Surveys of Consumers sites so economic data is reachable through search and reports — not buried navigation.',
    overview:
      'Surveys of Consumers moves markets and policy debate — but journalists and researchers still lost the Index of Consumer Sentiment across two aging sites. Our team redesigned the experience around a shared header, Main | Data orientation, and a search-first spine that respects the constraint both sites must stay separate.',
    contribution:
      'Led interview synthesis and information architecture; co-owned search results, reports browse, and the V1→V2 handoff path through high-fidelity prototyping.',
    snapshot: {
      project: 'Surveys of Consumers Website Redesign',
      type: 'UX Capstone · Dual-site economic data platform',
      role: 'UX Designer',
      timeline: 'Aug 2025 – Apr 2026 · Capstone',
      team: 'Nadia · Shalin · Hazel · Gloria',
      tools: 'Figma · Miro · Zoom',
      impact: 'Developer-ready Figma + static HTML handoff for ISR (May)',
    },
    sections: [
      {
        id: 'context',
        title: 'Challenge',
        content: [
          'Since 1946, the University of Michigan Surveys of Consumers has published monthly economic data that moves markets, shapes policy, and is cited in newsrooms worldwide. We wanted to reimagine how this data reaches the public: more findable, more modern, and more reflective of the study\'s global significance.',
        ],
        modules: [
          {
            type: 'video',
            src: '/assets/soc/context/current-website.mp4',
            alt: 'Screen recording of the existing Surveys of Consumers website before redesign',
            url: 'data.sca.isr.umich.edu',
            caption:
              'The existing dual-site experience — dense navigation, static file downloads, and no search across Main and Data.',
          },
          {
            type: 'brief-cards',
            items: [
              {
                title: 'Who uses it',
                description:
                  'Journalists, researchers, policymakers, and businesses seeking consumer confidence, inflation expectations, and related indicators.',
              },
              {
                title: 'What it publishes',
                description:
                  'High-frequency public results via downloadable tables, charts, and reports — plus methodology and survey information across two sites.',
              },
              {
                title: 'Delivery model',
                description:
                  'Two public environments: Main (general / headline) and Data (extraction / tables) — both required to remain separate.',
              },
              {
                title: 'Why redesign now',
                description:
                  'Non-regular users still struggle to locate or interpret data the sites already publish — and ISR staff field the resulting support load.',
              },
            ],
          },
        ],
      },
      {
        id: 'solution',
        title: 'What we built',
        content: [
          'Two paths share one header, Main | Data toggle, and search bar: a search spine for analytical questions, and a reports browse path for users who know the release cadence but not the keyword.',
        ],
        modules: [
          {
            type: 'brief-cards',
            items: [
              {
                title: 'Search spine',
                description:
                  'Home → filtered results → report match or recovery. Answers “where is the data?” without clicking through every tab.',
              },
              {
                title: 'Reports path',
                description:
                  'All Reports → monthly taxonomy. Answers “what came out this month?” when users browse by release, not keyword.',
              },
            ],
          },
          {
            type: 'flow-showcase',
            steps: [
              {
                label: 'Home',
                description:
                  'Search-first entry with headline ICS metrics, next-release cue, and a persistent Main | Data toggle — orientation before navigation.',
                src: '/assets/soc/figma/final/home.png',
                alt: 'SoC redesigned homepage with search bar, headline metrics, and Main Data toggle',
              },
              {
                label: 'Post-search results',
                description:
                  'One results hub returns charts, tables, and reports together. Sidebar filters narrow by category, timeframe, and demographic without leaving the page.',
                src: '/assets/soc/figma/final/post-search.png',
                alt: 'Post-search results with sidebar filters and mixed chart table report results',
              },
              {
                label: 'Report found',
                description:
                  'When a query matches, a data-selection panel surfaces the specific report with PDF / Excel links — V1 links to existing files until live data ships.',
                src: '/assets/soc/figma/final/report-found.png',
                alt: 'Search results with matched report and data selection panel',
              },
              {
                label: 'No report found',
                description:
                  'When search misses, the interface suggests filter adjustments and related content instead of a dead end.',
                src: '/assets/soc/figma/final/no-report-found.png',
                alt: 'Empty search results state with recovery guidance',
              },
              {
                label: 'All reports',
                description:
                  'Browse path for users who know the release cadence: monthly and special reports grouped under filterable taxonomy, not unstructured link lists.',
                src: '/assets/soc/figma/final/all-reports.png',
                alt: 'All reports page with monthly and special report categories',
              },
              {
                label: 'Monthly release',
                description:
                  'Scoped to one release month — reports, charts, and files for that cycle in one place, with breadcrumbs back to the full archive.',
                src: '/assets/soc/figma/final/monthly-release.png',
                alt: 'Monthly release view with report cards and file links',
              },
            ],
          },
          {
            type: 'soc-report-compare',
            caption:
              'Search/filter needs tagged structured data SoC does not have yet. V1 links to existing files; V2 shows the same interface once live interactive data exists.',
          },
          {
            type: 'insight-cards',
            items: [
              {
                insight: 'Infrastructure, not UI polish, gates full interactivity.',
                evidence:
                  'Charts and tables currently exist as static PDFs and Excel files — the redesign\'s search and filter system needs tagged, structured data SoC does not yet serve.',
                implication:
                  'Ship V1 as better navigation + search that links to existing files; design V2 for the same UI once live data infrastructure exists.',
              },
            ],
          },
        ],
      },
      {
        id: 'tension',
        title: 'The problem',
        content: [
          'The data is public, broadly significant, and freely available — but only useful if people can find it. Non-regular users often struggled to locate specific data, navigate between two sites, or interpret what they found.',
        ],
        modules: [
          {
            type: 'pain-cards',
            responseLabel: 'Design implication',
            items: [
              {
                pain: 'No search or filtering',
                opportunity: 'Users must click through dense pages instead of asking for data directly.',
              },
              {
                pain: 'Dual-site structure with no clear logic',
                opportunity: 'Orientation must improve without merging the two sites — a hard client constraint.',
              },
              {
                pain: 'Inconsistent labels for time intervals and moving averages',
                opportunity: 'Monthly values vs 3MMAs need explicit labeling at the point of use.',
              },
              {
                pain: 'Headline values buried in dense text',
                opportunity: 'ICS and release cues must surface as scannable hierarchy, not body copy.',
              },
            ],
          },
        ],
      },
      {
        id: 'research-evidence',
        title: 'Research',
        content: [
          'We stacked methods so each one answered a different question — support demand, live-site friction, qualitative themes, and task validation — then synthesized them into design requirements.',
        ],
        modules: [
          {
            type: 'method-cards',
            items: [
              {
                title: 'Email affinity analysis',
                description:
                  'Affinity-mapped one year of real user complaints emailed to SoC staff — grounding the redesign in support demand, not only lab tasks.',
              },
              {
                title: 'Live-site survey + SPSS',
                description:
                  'On-site questionnaire about visit purpose, role, findability, label clarity, presentation clarity, and navigation experience — analyzed in SPSS.',
                note: 'Verified export used on this page: n = 127 (Feb 19, 2026 CSV). Expo trifold cites a 400-response deployment target; charts below use the verified export only.',
              },
              {
                title: 'Moderated usability (live sites)',
                description:
                  'Think-aloud sessions on the live sites across journalist, researcher, and policymaker user types — then follow-up validation on the redesigned prototype.',
                note: 'Expo trifold: 8 moderated sessions on live sites.',
              },
              {
                title: 'Affinity + competitive baselines',
                description:
                  'Clustered themes (navigation, meaning, findability, literacy, release trust) and compared SoC against BLS, Census, and FRED mental models.',
              },
              {
                title: 'IA + prototyping',
                description:
                  'Proposed sitemap, Crazy 8s, hi-fi screens, and a developer-ready spec for handoff.',
              },
            ],
          },
          {
            type: 'stat-cards',
            note: 'Process counts from the final expo trifold. Live-site survey n below is the verified CSV used for quantitative charts.',
            items: [
              {
                value: '12',
                label: 'User interviews',
                detail: 'Expo process chip — qualitative depth across user types.',
              },
              {
                value: '3',
                label: 'Personas',
                detail: 'Expo process chip — including returning-professional synthesis shown below.',
              },
              {
                value: '12',
                label: 'Crazy 8s sketches',
                detail: 'Expo process chip — early divergent exploration.',
              },
              {
                value: '18',
                label: 'High-fi Figma screens',
                detail: 'Expo process chip — final prototype coverage.',
              },
              {
                value: '1',
                label: 'Developer-ready spec',
                detail: 'Expo process chip — Figma + static HTML handoff path.',
              },
              {
                value: '127',
                label: 'Verified survey responses',
                detail: 'Feb 19, 2026 CSV export used for quantitative charts on this page.',
              },
            ],
          },
        ],
      },
      {
        id: 'quantitative',
        title: 'Quantitative findings',
        content: [
          'The live-site survey shows what people come for and where friction concentrates — without inventing percentages beyond the verified export and SPSS outputs.',
        ],
        modules: [
          {
            type: 'stat-cards',
            note: 'Source: SoC Live Site Survey CSV export · n = 127.',
            items: [
              {
                value: '127',
                label: 'Survey responses analyzed',
                detail: 'Verified row count from the Feb 19, 2026 live-site export.',
              },
              {
                value: '60',
                label: 'First-time visitors',
                detail: '47% of respondents (60 / 127) were on their first visit.',
              },
            ],
          },
          {
            type: 'stat-cards',
            note: 'SPSS descriptives from analysis output (listwise n varies by item · scale 1–5).',
            items: [
              {
                value: '3.50',
                label: 'Mean ease of finding info',
                detail: 'EaseFinding_num · n = 117.',
              },
              {
                value: '3.97',
                label: 'Mean label clarity',
                detail: 'LabelClarity_num · n = 74.',
              },
              {
                value: '4.10',
                label: 'Mean presentation clarity',
                detail: 'PresentationClarity_num · n = 73.',
              },
            ],
          },
          {
            type: 'stat-cards',
            note: 'SPSS correlations (Pearson, 2-tailed). All three pairs significant at p < .001.',
            items: [
              {
                value: '.615',
                label: 'Ease ↔ label clarity',
                detail: 'Stronger labels associate with easier findability.',
              },
              {
                value: '.549',
                label: 'Ease ↔ presentation clarity',
                detail: 'Clearer data presentation associates with easier findability.',
              },
              {
                value: '.609',
                label: 'Label ↔ presentation clarity',
                detail: 'Labeling and presentation quality move together.',
              },
            ],
          },
          {
            type: 'insight-cards',
            items: [
              {
                insight: 'Findability is partly a clarity problem.',
                evidence:
                  'Ease of finding information correlates positively with both label clarity (.615) and presentation clarity (.549).',
                implication: 'Treat labeling and visual hierarchy as findability work — not late-stage polish.',
              },
            ],
          },
          {
            type: 'bar-chart-grid',
            charts: [
              {
                note: 'Visit purpose — select all that apply (n = 127).',
                items: [
                  { label: 'Check latest release / publication date', shortLabel: 'Latest release', value: 43 },
                  { label: 'Find headline data (e.g. ICS)', shortLabel: 'Headline data', value: 38 },
                  { label: 'Compare sentiment for analysis', shortLabel: 'Compare sentiment', value: 38 },
                  { label: 'Explore historical / demographic data', shortLabel: 'Historical data', value: 31 },
                  { label: 'Learn about survey / methodology', shortLabel: 'Methodology', value: 31 },
                  { label: 'Interpret the latest data', shortLabel: 'Interpret data', value: 30 },
                  { label: 'Download data files (CSV / Excel / PDF)', shortLabel: 'Download files', value: 22 },
                ],
              },
              {
                note: 'Self-described role (n = 127).',
                items: [
                  { label: 'Business / private sector', shortLabel: 'Business', value: 37 },
                  { label: 'Academic', shortLabel: 'Academic', value: 28 },
                  { label: 'General public', shortLabel: 'Public', value: 27 },
                  { label: 'Government / public policy', shortLabel: 'Government', value: 8 },
                  { label: 'Journalist / media', shortLabel: 'Journalist', value: 7 },
                  { label: 'Think tank / non-profit', shortLabel: 'Think tank', value: 3 },
                ],
              },
              {
                note: 'Navigation experience — select all that apply (n = 127).',
                items: [
                  { label: 'Familiar — know where things usually are', shortLabel: 'Familiar', value: 32 },
                  { label: 'Structure / labels made it easy', shortLabel: 'Clear structure', value: 24 },
                  { label: 'Made sense, but took a few clicks', shortLabel: 'Few clicks', value: 21 },
                  { label: 'Relied on trial and error', shortLabel: 'Trial & error', value: 21 },
                  { label: 'Unable to find specific data', shortLabel: "Couldn't find", value: 15 },
                  { label: 'Organization felt confusing', shortLabel: 'Confusing', value: 13 },
                  { label: 'Data seemed inconsistent / unexpected', shortLabel: 'Inconsistent', value: 8 },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'qualitative',
        title: 'Qualitative synthesis',
        content: [
          'Affinity themes and the returning-professional persona show the same gap: users arrive with analytical questions, while the sites expose structure, files, and opaque categories.',
        ],
        modules: [
          {
            type: 'media',
            src: '/assets/soc/research/affinity-participant-themes.png',
            alt: 'Participant quotes and themes affinity diagram — dual site system, information hierarchy, and competitive gaps',
            caption:
              'Evidence — Affinity diagram from FigJam: participant quotes clustered into dual-site navigation, information hierarchy, and competitive analysis themes.',
          },
          {
            type: 'insight-cards',
            items: [
              {
                insight: 'The site communicates structure, not meaning.',
                evidence:
                  'Users did not realize a separate data site existed, or still could not find historical tables after being pointed to the Tables tab.',
                implication: 'Make system boundaries and content inventory visible at entry — not only in FAQs.',
              },
              {
                insight: 'People ask for answers; the UI offers raw artifacts.',
                evidence:
                  'Reporters and analysts asked for party breakouts, case counts, and codebook-like definitions that already exist but stay hard to discover.',
                implication: 'Surface definitions, filters, and related metadata beside the data — not as separate scavenger hunts.',
              },
              {
                insight: 'Release schedule trust is broken.',
                evidence:
                  'Users thought results were missing or late because the forward calendar and preliminary vs final status were invisible.',
                implication: 'Put next-release and status cues in the primary hierarchy.',
              },
              {
                insight: 'Power users still hit fragmented workflows.',
                evidence:
                  'Persona pain points: inconsistent categorization, PDF-first extraction, limited interactive tooling, and cross-site fragmentation.',
                implication: 'Preserve dual sites, but design a continuous path from headline → detail → export.',
              },
            ],
          },
          {
            type: 'brief-cards',
            items: [
              {
                title: 'Persona · Daniel McGuarth',
                description:
                  'Returning professional user — Senior Economic Analyst, 8+ years with SoC, proficient with data tools. Needs fast headline confirmation, demographic extraction, and reliable export.',
              },
              {
                title: 'Blue-site jobs',
                description:
                  'Verify headlines, check recency / release timing, and decide whether deeper analysis is needed.',
              },
              {
                title: 'Data-site jobs',
                description:
                  'Pull structured datasets, validate accuracy, and export for external analysis.',
              },
              {
                title: 'Trusted baselines',
                description:
                  'Compares SoC against FRED, BLS, Census, and World Bank for search, structure, and extraction quality.',
              },
            ],
          },
          {
            type: 'media',
            src: '/assets/soc/research/persona-daniel.jpg',
            alt: 'Persona sheet for Daniel McGuarth, returning professional SoC user',
            caption: 'Evidence — Full persona artifact for reference.',
          },
        ],
      },
      {
        id: 'competitive',
        title: 'Competitive patterns',
        content: [
          'We mapped FRED, BLS, and Census site structures against SoC’s dual-site IA. Competitors share search-first entry, sticky filters, and in-page metadata — patterns SoC lacked, which made gaps feel like missing infrastructure rather than taste.',
        ],
        modules: [
          {
            type: 'competitor-cards',
            image: {
              caption:
                'Evidence — Site maps from FigJam competitive analysis (FRED, BLS, Census, and current SoC).',
            },
            images: [
              {
                name: 'FRED',
                src: '/assets/soc/research/sitemaps/fred.png',
                alt: 'FRED site map — search-first home, release calendar, topic filters, and in-page chart tools',
              },
              {
                name: 'U.S. Census',
                src: '/assets/soc/research/sitemaps/census.png',
                alt: 'U.S. Census site map — explore hub, sticky filters, and in-page table/chart viewer',
              },
              {
                name: 'BLS',
                src: '/assets/soc/research/sitemaps/bls.png',
                alt: 'BLS site map — subject filters, economic releases, and publication detail pages',
              },
              {
                name: 'SoC (current)',
                src: '/assets/soc/research/sitemaps/soc-current.png',
                alt: 'Current SoC site map — fragmented Main Site and Data Site with duplicate navigation',
              },
            ],
            items: [
              {
                name: 'FRED',
                points: [
                  'Search-first home with trending terms, latest releases, and browse-by-topic entry.',
                  'Release calendar → topic filters → in-page charts with download, next-release date, and related series.',
                  'Tutorials and API tools surfaced from About — lowest friction for analysts in our review.',
                ],
              },
              {
                name: 'U.S. Census',
                points: [
                  'Single explore hub: Tables, Maps, Charts, Profiles, and Microdata from one home.',
                  'Sticky left-side filters persist across results; documents open in-page with cite/share/API tools.',
                  'Methodology and table notes stay attached to the data view — not buried in FAQs.',
                ],
              },
              {
                name: 'BLS',
                points: [
                  'Home pairs calendar dates with new links, trending topics, and a global search.',
                  'Subject and release dropdowns filter by inflation, pay, unemployment, and geography.',
                  'Publication pages show headline numbers, monthly changes, and next release alongside charts.',
                ],
              },
              {
                name: 'SoC gap',
                points: [
                  'Two parallel sites (Main + Data) with overlapping HOME / Tables / Charts labels and no shared search hub.',
                  'Demographic filters live in dropdowns instead of a persistent filter panel; PDFs replace in-page data.',
                  'Release schedule, methodology, and cross-site context are harder to find than on every baseline.',
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'journey',
        title: 'User journey',
        content: [
          'Four tasks expose where the experience breaks: headline retrieval, demographic findability, recency verification, and release-schedule lookup.',
        ],
        modules: [
          {
            type: 'decision-matrix',
            columns: ['Task', 'Friction', 'Opportunity'],
            rows: [
              [
                'Headline data + cross-site nav',
                'Homepage ambiguity; PDF detour to confirm ICS; unclear current vs monthly labels',
                'Surface headline values/dates; clarify labels; reduce PDF as the only confirmation path',
              ],
              [
                'Demographics + findability',
                'Disorienting blue → yellow transition; no search; hard-to-scan tables',
                'Clarify site relationship; add search; improve table scanability',
              ],
              [
                'Data verification (recency)',
                'Weak date cues; preliminary vs final status unclear',
                'Strengthen timestamps and status labels at the point of reading',
              ],
              [
                'Find release schedule',
                'Next release buried in Survey Information docs; users rely on memory',
                'Promote release schedule into primary hierarchy / homepage',
              ],
            ],
          },
          {
            type: 'media',
            src: '/assets/soc/research/journey-map.jpg',
            alt: 'SoC user journey map across four tasks with emotion curve',
            caption:
              'Evidence — Full journey map. Lowest sentiment: demographics + dual-site transition.',
          },
        ],
      },
      {
        id: 'ia',
        title: 'Information architecture',
        content: [
          'Our client needed to keep the two-site structure. We designed the sitemap around that constraint: one home, a main search hub, and grouped pathways for data, reports, survey info, and tools.',
        ],
        modules: [
          {
            type: 'brief-cards',
            items: [
              {
                title: 'Home',
                description: 'Headline metrics, next release, featured chart, and entry into search.',
              },
              {
                title: 'Main search',
                description: 'Filtered hub returning charts and tables together — the cross-cutting spine.',
              },
              {
                title: 'Data & Charts',
                description: 'Interactive chart + raw table with date range, demographics, and export actions.',
              },
              {
                title: 'Reports',
                description: 'Monthly releases and special reports under filterable taxonomy — not link dumps.',
              },
              {
                title: 'Survey Info',
                description: 'Methodology, about, FAQ, and release calendar pathways.',
              },
              {
                title: 'Tools',
                description: 'API docs, microdata, downloads, and tutorials for deeper users.',
              },
            ],
          },
          {
            type: 'media',
            src: '/assets/soc/research/proposed-sitemap.png',
            alt: 'Detailed proposed SoC site map with search hub and content groups',
            caption: 'Evidence — Detailed proposed sitemap used during IA synthesis.',
          },
          {
            type: 'insight-cards',
            items: [
              {
                insight: 'Search becomes the cross-cutting spine.',
                evidence: 'Proposed IA centers a filtered search hub that returns charts and tables in one place.',
                implication: 'Homepage and nav stop being the only way to invent a path to data.',
              },
              {
                insight: 'Reports need taxonomy, not link lists.',
                evidence: 'Sitemap groups monthly releases, special reports, and related materials under filterable structure.',
                implication: 'Replace long unstructured lists with release-oriented categories.',
              },
            ],
          },
        ],
      },
      {
        id: 'principles',
        title: 'Design principles',
        content: [
          'Requirements were ranked by value and feasibility — each principle maps to evidence above, not aesthetic preference.',
        ],
        modules: [
          {
            type: 'brief-cards',
            items: [
              {
                title: 'Search-first findability',
                description: 'Let users bypass manual hunting with categorized search and filters.',
              },
              {
                title: 'Explicit dual-site orientation',
                description: 'Keep two sites, but make Main vs Data continuously legible.',
              },
              {
                title: 'Hierarchy for trust',
                description: 'Headline metrics, release timing, and status must be scannable.',
              },
              {
                title: 'Standardize data interaction',
                description: 'Consistent filters, labels, and chart/table patterns across pages.',
              },
              {
                title: 'Modernize without breaking brand',
                description: 'Preserve SoC blue/yellow identity while reducing visual overload.',
              },
            ],
          },
        ],
      },
      {
        id: 'decisions',
        title: 'Insight → design decisions',
        content: [
          'Each major UI move traces to evidence. Unverified deck percentages are omitted; decisions below use confirmed research artifacts and observed requirements.',
        ],
        modules: [
          {
            type: 'decision-matrix',
            columns: ['Evidence', 'Insight', 'Design decision'],
            rows: [
              [
                'Survey: release checks (43) and headline seeks (38) lead visit purposes',
                'Entry must serve time-sensitive headline jobs first',
                'Homepage metric cards + next-release prominence',
              ],
              [
                '21 trial-and-error + 15 unable-to-find navigation responses',
                'Browsing alone fails for non-regular and many returning users',
                'Global search with categorized results and filters',
              ],
              [
                'Journey + affinity: blue/yellow transition disorients',
                'Dual-site is a mental-model problem, not only a URL problem',
                'Persistent Main | Data toggle in the global header',
              ],
              [
                'SPSS: ease correlates with label & presentation clarity',
                'Findability is partly a labeling/hierarchy problem',
                'Time labels on index cards; clearer section typography',
              ],
              [
                'Competitors (FRED/BLS/Census) set search + filter expectations',
                'Missing baseline features read as broken infrastructure',
                'Filterable reports/data patterns aligned to familiar models',
              ],
              [
                'Persona: PDF-first extraction slows analysis',
                'Download should not be the only way to read a value',
                'In-page chart/table views with export still available',
              ],
            ],
          },
          {
            type: 'design-response',
            items: [
              {
                finding: 'Users lose orientation across Main and Data.',
                response: 'Persistent Main | Data control and shared header chrome.',
                image: {
                  src: '/assets/soc/figma/final/home.png',
                  alt: 'Redesigned homepage with Main and Data orientation',
                },
              },
              {
                finding: 'Headline and release cues are buried.',
                response: 'Metric cards with explicit time context and search-first entry.',
                image: {
                  src: '/assets/soc/figma/final/home.png',
                  alt: 'Homepage metric cards and search-first architecture',
                },
              },
              {
                finding: 'Manual clicking cannot scale to analytical questions.',
                response: 'Post-search filters so users can specify reports without guessing PDFs.',
                image: {
                  src: '/assets/soc/figma/final/post-search.png',
                  alt: 'Post-search page with filters and report specification',
                },
              },
            ],
          },
        ],
      },
      {
        id: 'validation',
        title: 'Results',
        content: [
          'Prototype usability findings from the final expo trifold. Protocol details (exact n per task) remain marked for export when session notes are attached.',
        ],
        modules: [
          {
            type: 'stat-cards',
            note: 'Source: final expo trifold (TRIFOLD - final). TODO: attach task scripts and raw timing logs for full auditability.',
            items: [
              {
                value: '100%',
                label: 'Faster, more confident headline access',
                detail: 'Users located headline metrics faster and with greater confidence.',
              },
              {
                value: '75%',
                label: 'Homepage more scannable',
                detail: 'Users described the homepage as significantly more scannable.',
              },
              {
                value: 'Main | Data',
                label: 'Toggle fixed top confusion',
                detail: 'Resolved the single most-cited source of dual-site confusion.',
              },
              {
                value: 'Time labels',
                label: 'Less extra navigation',
                detail: 'Labels on key index cards let users interpret data without extra clicks.',
              },
            ],
          },
          {
            type: 'video',
            src: '/assets/soc/demo/prototype-walkthrough.mp4',
            alt: 'Prototype walkthrough across home, search results, and reports screens',
            url: 'data.sca.isr.umich.edu',
            caption:
              'Final hi-fi prototype walkthrough — search spine and reports path with crossfades between screens.',
          },
          {
            type: 'todo',
            message:
              'Export follow-up usability session notes and per-task success tables so validation metrics can be cited with participant counts.',
          },
        ],
      },
      {
        id: 'outcome',
        title: 'Impact',
        content: [
          'The Surveys of Consumers data is public, broadly significant, and freely available — but only useful if people can find it. The final prototype is ready for handoff to the SoC team in May as a complete Figma file and static HTML.',
        ],
        modules: [
          {
            type: 'brief-cards',
            items: [
              {
                title: 'Journalists',
                description: 'Get the latest ICS on entering — not after five clicks.',
              },
              {
                title: 'Researchers & policymakers',
                description:
                  'Filter by income, region, or party without guessing which PDF has the right table.',
              },
              {
                title: 'First-time users',
                description: 'Navigate between charts and tables in under three clicks.',
              },
              {
                title: 'Handoff path',
                description:
                  'Complete Figma file + static HTML — a realistic, immediate path to reaching real users while V2 waits on live data infrastructure.',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'echoes-you-can-touch',
    slug: 'echoes-you-can-touch',
    title: 'Echoes You Can Touch',
    subtitle:
      'A first-person fantasy carnival where memory portals turn nostalgia into playable space — walk it, read the world, then touch what remembers you.',
    tagline: 'Hub-and-portal level design · atmospheric worldbuilding · XR game feel.',
    featured: true,
    featuredSize: 'standard',
    order: 5,
    type: 'Game Design · VR Experience',
    role: 'Game Designer & Unity Developer',
    timeline: '2024–2025',
    tools: ['Unity', 'XR Interaction Toolkit', 'C#', 'Rhino', 'Arduino'],
    methods: ['Worldbuilding', 'Level Design', 'Playtesting', 'Haptic Prototyping'],
    categories: ['Game Design', 'Product Design', 'System Design'],
    accent: '#ff3399',
    thumbnail: '/assets/echoes-hero.jpg',
    heroImage: '/assets/echoes-hero.jpg',
    summary:
      'Designed and built Fantasy World in Unity — a carnival hub that routes players through glowing portals into bedroom, playground, cinema, and reminiscence-tent levels, with palm haptics as game-feel.',
    overview:
      'Echoes You Can Touch is an exploratory VR fantasy game: the carnival is the hub, portals are the progression, and transitional objects are the verbs. Atmosphere and level composition do the storytelling — fog, string lights, surreal tent crowds, and a childhood bedroom that feels lived-in — so players understand the world before dialogue ever speaks.',
    contribution:
      'Solo game design and Unity build: hub layout, portal loop, environmental storytelling, XR interaction stack, and companion palm-haptic prototyping for tactile feedback on key objects.',
    snapshot: {
      project: 'Echoes You Can Touch — Fantasy World VR',
      type: 'Game design · Immersive VR prototype',
      role: 'Game Designer & Unity Developer',
      timeline: '2024–2025',
      tools: 'Unity · XR Interaction Toolkit · Ghost VR Hands · Arduino',
      impact: 'Playable hub-and-portal fantasy world with in-engine walkthrough + haptic game-feel prototype',
    },
    sections: [
      {
        id: 'play',
        title: 'Playthrough',
        content: [
          'In-engine first-person walkthrough cut from the Unity hub: glowing portals → reminiscence tent → carnival path → bedroom portal. Designed so recruiters feel the world before reading the systems.',
        ],
        modules: [
          {
            type: 'video',
            frame: 'game',
            src: '/assets/echoes/demo/echoes-walkthrough.mp4',
            poster: '/assets/echoes/demo/hero-poster.jpg',
            playbackRate: 0.7,
            alt: 'Echoes You Can Touch Unity gameplay walkthrough across portals, tent, carnival, and bedroom',
            caption:
              'Gameplay montage — portal hub → surreal tent audience → carnival midground → childhood bedroom (Unity, first person).',
          },
          {
            type: 'brief-cards',
            items: [
              {
                title: 'What you’re seeing',
                description:
                  'A hub that teaches direction with light and composition, then destinations that shift emotional temperature without UI chrome.',
              },
              {
                title: 'Design proof',
                description:
                  'Same art language, four moods: carnival mystery, tent uncanny, path exploration, intimate bedroom — space as narrative.',
              },
            ],
          },
        ],
      },
      {
        id: 'concept',
        title: 'Game concept',
        content: [
          'Fantasy World reframes reminiscence as playable space. Instead of a linear cutscene about childhood, players explore a carnival that behaves like a dream map — familiar pieces remixed into somewhere slightly impossible.',
        ],
        modules: [
          {
            type: 'brief-cards',
            items: [
              {
                title: 'Genre',
                description:
                  'Exploratory VR fantasy — walk, look, touch, and be moved by space more than by combat or score.',
              },
              {
                title: 'Fantasy premise',
                description:
                  'A night carnival that shouldn’t exist the way it does: candy-scale props, glowing portals, and rooms that feel like memories with the physics left on.',
              },
              {
                title: 'Player fantasy',
                description:
                  'Return to emotionally safe contexts without dialogue walls — safety, play, shared story, and sensory nostalgia as interactive spaces.',
              },
              {
                title: 'Core verb',
                description:
                  'Touch. Objects are the verbs — teddy, ball, popcorn, desk — and the body answers through optional palm pressure.',
              },
            ],
          },
        ],
      },
      {
        id: 'showcase',
        title: 'World showcase',
        content: [
          'Built in Unity as Project #3 Fantasy World — carnival hub first, then portal destinations composed for distinct beats: intimate bedroom, open carnival path, and a surreal reminiscence tent where toys become the audience.',
        ],
        modules: [
          {
            type: 'media',
            src: '/assets/echoes/echoes-03.jpg',
            alt: 'Carnival map with bedroom, playground, cinema, and tent zones',
            caption:
              'Level design board — carnival hub mapping Tent, Cinema, Playground, Ride, and Bedroom.',
          },
          {
            type: 'media',
            src: '/assets/echoes/echoes-07.jpg',
            alt: 'Unity first-person views of bedroom and playground portals',
            caption:
              'In-engine beats — childhood bedroom and dusk playground from Fantasy World.',
          },
          {
            type: 'media',
            src: '/assets/echoes/echoes-08.jpg',
            alt: 'Unity cinema and reminiscence tent portal screenshots',
            caption:
              'Cinema + reminiscence tent — shared story space and the surreal final stop.',
          },
        ],
      },
      {
        id: 'zones',
        title: 'Levels & portals',
        content: [
          'Four portal destinations, each keyed to a life-stage emotion. In Unity these map to composed scenes and asset packs: Little Girl Room, playground / school grounds, cinema set, and circus-tent reminiscence space.',
        ],
        modules: [
          {
            type: 'feature-cards',
            items: [
              {
                title: 'Bedroom portal',
                description:
                  'Quiet, pink-lit personal ground — plush toys, soft fabrics, dollhouse. Safety and earliest anchors. Built with Little Girl Room assets in Unity.',
              },
              {
                title: 'Playground portal',
                description:
                  'Open court energy — basketball stand, lunch bag, soda can. Motion, freedom, and early social life.',
              },
              {
                title: 'Cinema portal',
                description:
                  'Shared storytelling — seats, popcorn, hotdog, screen glow. Rituals of watching together (cinema pack scenes).',
              },
              {
                title: 'Reminiscence tent',
                description:
                  'Surreal mix of carnival and classroom — desk, spotlight, jack-o’-lantern, toy monkey. Fragmented memories in one tent.',
              },
            ],
          },
          {
            type: 'media',
            src: '/assets/echoes/echoes-06.jpg',
            alt: 'Storyboard of carnival entrance and four memory portals',
            caption:
              'Playable storyboard — carnival birth → four glowing portals → reminiscence tent as last stop.',
          },
          {
            type: 'brief-cards',
            items: [
              {
                title: 'Unity world stack',
                description:
                  'Polygon Horror Carnival · Classroom · cinema scenes · Little Girl Room · Fantasy Portal FX · Dreamscapes biomes · custom circus tents.',
              },
              {
                title: 'Hub metaphor',
                description:
                  'Carnival blends childhood, adolescence, adulthood, and fantasy so the map itself feels like a memory collage.',
              },
            ],
          },
        ],
      },
      {
        id: 'loop',
        title: 'Player journey',
        content: [
          'The loop is portal-based: enter carnival → choose a glowing portal → explore and touch objects → soft haptic reply → return to hub → exit calmer than you arrived.',
        ],
        modules: [
          {
            type: 'media',
            src: '/assets/echoes/echoes-04.jpg',
            alt: 'Player journey flowchart and transitional object design board',
            caption:
              'Interaction framework — Chapter 1 Born at carnival entrance, four scenes, air-sac inflate on touch, exit into calm.',
          },
          {
            type: 'brief-cards',
            items: [
              {
                title: 'Progression',
                description:
                  'Emotional, not XP: bedroom (safety) → playground (play) → cinema (shared story) → tent (integration).',
              },
              {
                title: 'Fail state',
                description:
                  'None. Players can’t “lose” a memory — only leave a portal when ready.',
              },
              {
                title: 'Win condition',
                description:
                  'Soft success: tension eases; the body registers familiarity through pressure patterns.',
              },
            ],
          },
        ],
      },
      {
        id: 'systems',
        title: 'Interaction systems',
        content: [
          'XR Interaction Toolkit powers hands-on VR. Ghost VR Hands / FP Arms give presence. Transitional objects are the interaction targets; the palm air sac is the haptic juice when something meaningful is held.',
        ],
        modules: [
          {
            type: 'brief-cards',
            items: [
              {
                title: 'XR stack',
                description:
                  'Unity XR Interaction Toolkit 3.3 · XR Management · Ghost VR Hands · NatureManufacture VR Hands FP Arms.',
              },
              {
                title: 'Desktop fallback',
                description:
                  'Mini First Person Controller for non-headset walkthroughs while iterating layouts.',
              },
              {
                title: 'Haptic game feel',
                description:
                  'Arduino-driven palm air sac: soft for balloons, warm-calm for pillows, firm for cans — distinct patterns per object class.',
              },
              {
                title: 'Scenes in project',
                description:
                  'New VR Scene #2 hub · Classroom · cinema · LittleGirlRoomDemo · School scenes · carnival demos · Fantasy Portal FX.',
              },
            ],
          },
          {
            type: 'media',
            src: '/assets/echoes/echoes-05.jpg',
            alt: 'Air sac haptic wearable build and playtest board',
            caption:
              'Companion haptic prototype — palm fit iterations and object-tied pressure patterns for VR touch.',
          },
        ],
      },
      {
        id: 'research',
        title: 'Design research',
        content: [
          'Object choice came from interviews about adult transitional objects — stuffed lions, textured fabric, old shirts — mapped into four sensation layers that drive level prop lists.',
        ],
        modules: [
          {
            type: 'media',
            src: '/assets/echoes/echoes-02.jpg',
            alt: 'Interview insights and mindmap for Fantasy World',
            caption:
              'From interviews and mindmap → portal props and atmospheric targets for each level.',
          },
        ],
      },
      {
        id: 'outcome',
        title: 'Playtest & impact',
        content: [
          'Players described the haptic layer as making scenes feel “more grounded.” Touching a balloon vs. pillow vs. can read as different emotional temperatures — soft, calming, controllable.',
        ],
        modules: [
          {
            type: 'brief-cards',
            items: [
              {
                title: 'What shipped',
                description:
                  'Playable Unity VR fantasy hub with composed portal destinations and a working haptic companion prototype.',
              },
              {
                title: 'Design takeaway',
                description:
                  'In emotional games, world layout and prop language do most of the storytelling — dialogue can stay minimal.',
              },
              {
                title: 'Next build',
                description:
                  'Personalizable object tables, stronger portal transitions, and denser XRI grab affordances across tents.',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'still-here',
    slug: 'still-here',
    title: 'Still Here',
    subtitle:
      'A wearable + app that detects stress early — and responds with dignity-preserving grounding for Young-Onset Dementia.',
    tagline: 'Gentle haptic cues when orientation slips — support without taking autonomy.',
    featured: true,
    featuredSize: 'medium',
    order: 4,
    type: 'Individual Project',
    role: 'UX / HCI Designer',
    timeline: '2024',
    tools: ['Figma', 'Arduino', 'Python'],
    methods: ['Field Observation', 'Interviews', 'Journey Mapping', 'Prototyping'],
    categories: ['Healthcare', 'Product Design', 'System Design'],
    accent: '#3b6fd4',
    thumbnail: '/assets/still-here-hero.jpg',
    heroImage: '/assets/still-here-hero.jpg',
    summary:
      'Designed a smart glove and companion app that senses rising stress and offers quiet grounding — built from PACE fieldwork with people living with Young-Onset Dementia.',
    overview:
      'Care tools for dementia often assume facility life and advanced age. Young-Onset Dementia looks different: people still work, raise families, and want support that doesn’t announce itself. Still Here pairs continuous sensing with subtle haptic and light cues — plus app flows for grounding, navigation, and caregiver connection — so help arrives before a full breakdown.',
    contribution:
      'End-to-end: field synthesis, problem framing, hi-fi app flows, and a working Arduino glove prototype (I2C Hub + mood light ring).',
    snapshot: {
      project: 'Still Here — Wearable + App for Young-Onset Dementia',
      type: 'Healthcare product · Wearable systems',
      role: 'UX / HCI Designer (individual)',
      timeline: '2024 · University of Michigan',
      tools: 'Figma · Arduino · Python',
      impact: 'Hi-fi app flows + working glove prototype with firmware',
      note: 'Field photos omitted for privacy; observations and quotes preserved as text.',
    },
    sections: [
      {
        id: 'context',
        title: 'Challenge',
        content: [
          'Young-Onset Dementia affects people under 65 who are often misdiagnosed, still working, and underserved by tools designed for elderly patients in facility settings.',
        ],
        modules: [
          {
            type: 'brief-cards',
            items: [
              {
                title: 'Who this is for',
                description:
                  'Adults with Young-Onset Dementia (YOD) who are still navigating work, households, and public life when symptoms begin — not residents in long-term care.',
              },
              {
                title: 'What breaks down',
                description:
                  'Disorientation, communication stalls, sensory overload, and caregiver tension often appear before anyone has language for what is happening.',
              },
              {
                title: 'Design stance',
                description:
                  'Support autonomy first. Intervene only when physiological or behavioral signals suggest rising stress — never replace memory or command behavior.',
              },
              {
                title: 'Deliverables',
                description:
                  'Smart glove (I2C Hub) with sensing + haptic/light feedback, companion app flows, and Arduino firmware validated through prototyping.',
              },
            ],
          },
        ],
      },
      {
        id: 'product',
        title: 'What I designed',
        content: [
          'When orientation slips, help shows up quietly — glove cues first, then optional app support for grounding, navigation, and caregiver connection.',
        ],
        modules: [
          {
            type: 'iphone-showcase',
            groups: [
              {
                id: 'tasks',
                title: 'Daily task & guidance',
                screens: [
                  {
                    id: 'task-list',
                    title: 'Task list display',
                    shortLabel: 'Today',
                    src: '/assets/still-here/figma/task-list.png',
                    alt: 'Still Here today view with calendar strip and task cards',
                    description:
                      'A scannable “Today” view with a horizontal date strip and task cards — each with time, contact, and completion state so routines stay visible without overwhelming.',
                    features: [
                      'Calendar strip for quick day orientation',
                      'Task cards with contacts and status toggles',
                      'Categories for work, personal, and medical errands',
                    ],
                  },
                  {
                    id: 'task-break-down',
                    title: 'Task break down',
                    shortLabel: 'Steps',
                    src: '/assets/still-here/figma/task-break-down.png',
                    alt: 'Still Here step-by-step task guidance screen',
                    description:
                      'Complex errands decompose into large, high-contrast steps — map snippets and plain-language actions like “Go to Parking Lot B1” reduce decision load mid-task.',
                    features: [
                      'One action per screen with map context',
                      'Large tap targets for parking and navigation steps',
                      'Voice-guided prompts sync to the wearable',
                    ],
                  },
                  {
                    id: 'task-progress',
                    title: 'Task progress tracker',
                    shortLabel: 'Progress',
                    src: '/assets/still-here/figma/task-progress.png',
                    alt: 'Still Here monthly task completion rings',
                    description:
                      'Monthly completion rings and category results reinforce routine-building — caregivers can see progress patterns without hovering over every task.',
                    features: [
                      'Per-day completion rings on a month calendar',
                      'Category breakdowns for work vs. personal',
                      'Shared view for caregiver reassurance',
                    ],
                  },
                  {
                    id: 'add-task',
                    title: 'Add task',
                    shortLabel: 'Add',
                    src: '/assets/still-here/figma/add-task.png',
                    alt: 'Still Here add task form with categories',
                    description:
                      'Creating a task stays lightweight: category chips, date/time pickers, and an optional supervision toggle to loop in a caregiver when needed.',
                    features: [
                      'Category chips — Work, Personal, Friends, Medical',
                      'Supervision toggle for shared care tasks',
                      'Syncs reminders to glove + phone',
                    ],
                  },
                ],
              },
              {
                id: 'social',
                title: 'Social support',
                screens: [
                  {
                    id: 'social-radar',
                    title: 'Available social support',
                    shortLabel: 'Radar',
                    src: '/assets/still-here/figma/social-support.png',
                    alt: 'Still Here social radar with contact rings',
                    description:
                      'A concentric social radar places trusted contacts by proximity — quick actions for “Go Here” and contact cards keep help one tap away.',
                    features: [
                      'Contact rings by relationship proximity',
                      'Quick actions: Go Here, Contact Card',
                      'SOS accessible without leaving the view',
                    ],
                  },
                  {
                    id: 'live-call',
                    title: 'Live support call',
                    shortLabel: 'Call',
                    src: '/assets/still-here/figma/live-support-call.png',
                    alt: 'Still Here video call with caregiver',
                    description:
                      'When stress rises, a familiar face is a tap away — large mute, camera, and end-call controls designed for low cognitive load.',
                    features: [
                      'One-tap video connection to trusted contacts',
                      'Oversized call controls',
                      'Wearable haptic confirms connection state',
                    ],
                  },
                  {
                    id: 'co-pilot',
                    title: 'Co-pilot navigation',
                    shortLabel: 'Co-Pilot',
                    src: '/assets/still-here/figma/co-pilot-nav.png',
                    alt: 'Still Here Co-Pilot navigation with topographic map',
                    description:
                      'Topographic map with a highlighted walking path, scheduled co-walks, and hazard warnings — orientation support that feels like companionship, not surveillance.',
                    features: [
                      'Step-by-step path with distance markers',
                      'Scheduled walking partner and hazard alerts',
                      'In-line call and chat for live support',
                    ],
                  },
                  {
                    id: 'context-cards',
                    title: 'Context cards',
                    shortLabel: 'Context',
                    src: '/assets/still-here/figma/context-cards.png',
                    alt: 'Still Here who-is-this context card',
                    description:
                      '“Who is this?” cards surface a person’s photo, relationship, and meeting purpose — reducing social anxiety when names slip away.',
                    features: [
                      'Photo + relationship recap before interactions',
                      'Meeting purpose labels (client, family, medical)',
                      'Triggered from calendar or proximity',
                    ],
                  },
                ],
              },
              {
                id: 'dashboard',
                title: 'Dashboard & insights',
                screens: [
                  {
                    id: 'dashboard-overview',
                    title: 'Dashboard overview',
                    shortLabel: 'Overview',
                    src: '/assets/still-here/figma/dashboard-overview.png',
                    alt: 'Still Here performance dashboard overview',
                    description:
                      'A single glance at performance trends, weekly stats, and mood previews — the home base for understanding how the week is going.',
                    features: [
                      'Performance line graph with weekly stats',
                      'Mood and improvement module previews',
                      'Links to deeper analytics views',
                    ],
                  },
                  {
                    id: 'mood-patterns',
                    title: 'Mood periods & patterns',
                    shortLabel: 'Mood',
                    src: '/assets/still-here/figma/mood-patterns.png',
                    alt: 'Still Here mood patterns and daily reflection',
                    description:
                      'Average mood scores and weekly bar charts pair with a daily reflection prompt — patterns become visible before they become crises.',
                    features: [
                      'Weekly mood bar chart with average score',
                      'Daily reflection with emoji selectors',
                      'Feeds proactive stress alerts on the wearable',
                    ],
                  },
                  {
                    id: 'instant-alerts',
                    title: 'Instant alerts',
                    shortLabel: 'Alerts',
                    src: '/assets/still-here/figma/instant-alerts.png',
                    alt: 'Still Here HRV high lock screen alert',
                    description:
                      'When HRV spikes, a lock-screen warning suggests an immediate grounding action — “Deep Breath 10s” — before disorientation escalates.',
                    features: [
                      'Lock-screen physiological warnings',
                      'Actionable micro-interventions',
                      'Synced with glove vibration nudge',
                    ],
                  },
                  {
                    id: 'progress-stats',
                    title: 'Progress statistics',
                    shortLabel: 'Stats',
                    src: '/assets/still-here/figma/progress-stats.png',
                    alt: 'Still Here task completion and analysis charts',
                    description:
                      'Task completion bars and category pie charts show where effort goes — useful for self-awareness and caregiver conversations.',
                    features: [
                      'Task completion bar chart',
                      'Category analysis breakdown',
                      'Exportable summaries for clinicians',
                    ],
                  },
                ],
              },
              {
                id: 'profile',
                title: 'Personal center',
                screens: [
                  {
                    id: 'personal-center',
                    title: 'Personal center',
                    shortLabel: 'Profile',
                    src: '/assets/still-here/figma/personal-center.png',
                    alt: 'Still Here personal center and device settings',
                    description:
                      'Profile info and device settings in one place — vibration intensity, notification toggles, and brightness tuned to personal preference.',
                    features: [
                      'Health profile fields (blood type, weight, etc.)',
                      'Wearable vibration and light intensity controls',
                      'Notification and quiet-hours preferences',
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'origin',
        title: 'How it started',
        content: [
          'My journey with dementia care began through volunteering at PACE, a day center for older adults living with cognitive decline. Two years of assisting residents during activities showed me how even small changes in memory or orientation could completely reshape daily routines.',
        ],
        modules: [
          {
            type: 'method-cards',
            items: [
              {
                title: 'PACE volunteering',
                description:
                  'Spent two years at Huron Valley PACE observing routines, activities, and how residents compensated when orientation slipped.',
              },
              {
                title: 'Shift to Young-Onset',
                description:
                  'Discovered a group whose stories often go unheard — people still working or raising families when symptoms begin, feeling out of place in care settings built for much older adults.',
              },
              {
                title: 'Design focus',
                description:
                  'Patients need more than care — they need to be understood. The gap between their needs and existing support systems became the starting point.',
              },
            ],
          },
          {
            type: 'insight-cards',
            items: [
              {
                insight:
                  'Fear of losing independence often outweighs fear of forgetting names.',
                evidence:
                  'PACE fieldwork: long-term emotional and spatial memory can remain partially intact into mid-to-late stages, but confidence erodes quickly in unfamiliar moments.',
                implication:
                  'Design for subtle, dignity-preserving cues — not surveillance or correction.',
              },
            ],
          },
        ],
      },
      {
        id: 'field-research',
        title: 'Field observations',
        content: [
          'To understand real needs, I conducted field observations across care settings. Daily routines and interactions revealed breakdown patterns that rarely appear in clinical descriptions.',
        ],
        modules: [
          {
            type: 'observation-cards',
            items: [
              {
                id: '01',
                title: 'Disorientation & confusion',
                quote:
                  '“I was just in the dining hall… or was I? Why is everything moved?”',
              },
              {
                id: '02',
                title: 'Dependence in daily activities',
                quote:
                  '“I used to make breakfast myself. Now I wait until someone tells me it’s time.”',
              },
              {
                id: '03',
                title: 'Difficulty with communication',
                quote: '“I… I was going to say something, what was it?”',
              },
              {
                id: '04',
                title: 'Emotional outburst',
                quote: '“No, no — I said I’m fine! Why won’t anyone listen?”',
              },
              {
                id: '05',
                title: 'Caregiver restraint',
                quote: '“Let go— I can do it!” / “Just for your safety, please.”',
              },
              {
                id: '06',
                title: 'Social isolation',
                quote: '“You all go ahead… I’m fine here on my own.”',
              },
              {
                id: '07',
                title: 'Sensory overload',
                quote:
                  '“The TV’s buzzing—too bright, too loud! Make it stop, please…”',
              },
              {
                id: '08',
                title: 'Paranoia & misplaced trust',
                quote: '“Someone’s stealing my things, don’t lie to me!”',
              },
              {
                id: '09',
                title: 'Sleep–wake disruption',
                quote:
                  '“I have to get up—why is it still dark? It’s time to go home!”',
              },
            ],
          },
          {
            type: 'insight-cards',
            items: [
              {
                insight: 'Disorientation & loss of control',
                evidence:
                  'Patients rely on stable, predictable environments; small routine changes can immediately trigger confusion and anxiety.',
                implication:
                  'Detect instability early and offer grounding before full breakdown.',
              },
              {
                insight: 'Relationship tension & loss of autonomy',
                evidence:
                  'Patients feel independence slipping away while caregivers may over-restrain out of safety concerns.',
                implication:
                  'Shared ecosystem visibility — not one-sided monitoring.',
              },
              {
                insight: 'Communication breakdown creates emotional distress',
                evidence:
                  'Difficulty expressing thoughts turns simple interactions into frustration, withdrawal, or anger.',
                implication:
                  'Voice-guided prompts and missed-task handling without shame.',
              },
              {
                insight: 'Overstimulation triggers fear & paranoia',
                evidence:
                  'Loud or unfamiliar settings overload senses; patients misinterpret what is happening around them.',
                implication:
                  'Physiological alerts + subtle wearable cues to step away before escalation.',
              },
            ],
          },
        ],
      },
      {
        id: 'interviews',
        title: 'Interviews & treatment gaps',
        content: [
          'I interviewed two patients and one caregiver to hear voices directly — then mapped how current pharmacological, symptom-management, and tele-rehab models fail during everyday breakdown moments.',
        ],
        modules: [
          {
            type: 'interview-cards',
            items: [
              {
                name: 'Cindy Wakely, 59',
                role: 'Caregiver · early-onset family member',
                tags: ['Loneliness', 'Role-reversal', 'Hyper-vigilance'],
                prompt: 'What is the hardest part of watching someone disappear piece by piece?',
                quote:
                  '“Most mornings begin at 5 a.m. when Mum wakes thinking she’s late for school duty. I steer her to the bathroom, message work—again—and brace for the moment she asks where Dad is, forgetting he’s been gone ten years. People call me a saint, but nothing prepares you for losing someone piece by piece while they’re still alive.”',
                gap: 'Infrequent support; elderly-oriented services; high caregiver dependence.',
              },
              {
                name: 'Chris Graham, 39',
                role: 'Young-Onset Dementia · veteran',
                tags: ['Misunderstood', 'Genetic', 'Future-planning'],
                prompt: 'What’s the hardest part of getting dementia so early?',
                quote:
                  '“Everyone says I look healthy—so when I blank on a name they just laugh it off. But I’ve seen exactly where this road ends; my dad, aunt, and cousin all died from the same gene. I’m 39, supposed to be building a career, yet I’m sorting power-of-attorney papers and figuring out how to fund decades of care. It’s like carrying a silent time-bomb while everyone else still thinks you’re running a marathon.”',
                gap:
                  'Aids are static and facility-based; don’t support commuting, working, or shopping outside care settings.',
              },
              {
                name: 'Don Hayen, 68',
                role: 'Early-stage dementia · retired M.D.',
                tags: ['Disoriented', 'Undiagnosed', 'Compensating'],
                prompt: 'How do you find out there’s something off at first?',
                quote:
                  '“I was a dermatologist, and thought I was in good health. I had an anger problem, and things suddenly feel like drifting off from the wind. The hospital don’t give diagnosis for people who have early symptoms and don’t meet the criteria, but I still compensate for my mistakes, and I know I need professional help.”',
                gap: 'Daily function unmet; declining effectiveness of symptom-targeted management.',
              },
            ],
          },
        ],
      },
      {
        id: 'design-response',
        title: 'Design decisions',
        content: [
          'Critical breakdowns happen in three layers: surface symptoms, internal physiological triggers, and deep system gaps. Current treatments intervene after crisis — Still Here reframes care as continuous sensing + immediate grounding + ecosystem feedback.',
        ],
        modules: [
          {
            type: 'pain-cards',
            responseLabel: 'Design move',
            items: [
              {
                pain: 'Surface: disorientation, task breakdown, mood swings',
                opportunity:
                  'Catch early instability through HR/HRV, movement, and gesture sensing before communication fully stalls.',
              },
              {
                pain: 'Internal: no synchronous physiological alert or continuous logging',
                opportunity:
                  'Wearable micro-logging with auto time + vitals snapshot; mood light ring (green → amber → red).',
              },
              {
                pain: 'Roots: fragmented support, no age-appropriate aids',
                opportunity:
                  'App schedules, co-pilot navigation, and opt-in caregiver/clinician portal — built for working-age adults.',
              },
            ],
          },
          {
            type: 'ecosystem-split',
            wearable: {
              label: 'Wearable layer',
              title: 'I2C Hub smart glove',
              summary:
                'Finger-mounted sensors, RGB mood ring, vibration motor, and Temp/Hum sensing — validated through literature on skin-mounted HR/HRV and EDA.',
              layers: [
                {
                  title: 'Continuous monitoring',
                  description:
                    'HR, GSR, movement, and sleep–wake detection with auto-learning personal baselines.',
                  details: ['Physio sensor hub on palm', 'Literature-backed thresholds'],
                },
                {
                  title: 'Subtle cues & prompts',
                  description:
                    'Gentle vibration at stress thresholds; mood light ring; quick-tap self-check on the glove.',
                  details: ['Vibration nudge', 'Green → amber → red light ring'],
                },
                {
                  title: 'Micro-logging',
                  description:
                    'Two-tap “lapse” marker captures time + vitals; instant context for each event.',
                  details: ['Lapse marker', 'Context snapshot'],
                },
              ],
            },
            app: {
              label: 'App layer',
              title: 'Companion ecosystem',
              summary:
                'Daily structure, personalized insights, and secured links to caregivers and clinicians — without taking over autonomy.',
              layers: [
                {
                  title: 'Schedule & task support',
                  description:
                    'Calendar sync, step-by-step checklists on the wearable, missed-task alerts on phone + watch.',
                  details: ['Auto-snooze tasks', 'Voice-guided prompts'],
                },
                {
                  title: 'Insights & personalization',
                  description:
                    'Weekly trend dashboard, custom thresholds, quiet hours, and PDF export for clinician review.',
                  details: ['Proactive stress alerts', 'Mood pattern analytics'],
                },
                {
                  title: 'Caregiver & clinician link',
                  description:
                    'Opt-in shared portal, SOS long-press with recent data snapshot, one-tap tele-rehab video launcher.',
                  details: ['Shared care notes', 'Secured team messaging'],
                },
              ],
            },
          },
        ],
      },
      {
        id: 'outcome',
        title: 'Impact',
        content: [
          'Built a functioning prototype capable of sensing, interpreting, and responding to early instability signals — with qualitative feedback on the subtlety of light and vibration cues.',
        ],
        modules: [
          {
            type: 'insight-cards',
            items: [
              {
                insight:
                  '“The light changes tell me I’m getting overwhelmed, so I can step away or breathe.”',
                evidence: 'Prototype user feedback on mood light ring behavior.',
                implication:
                  'Non-verbal feedback can surface stress before the user can name it.',
              },
              {
                insight:
                  'Gesture-triggered light changes prompted grounding tasks before situations escalated.',
                evidence: 'Wizard-of-oz sessions with glove + app pairing.',
                implication:
                  'Wearable → app handoff works when cues stay subtle and optional.',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'zingerman-deli',
    slug: 'zingerman-deli',
    title: "Zingerman's Deli Redesign",
    subtitle:
      'One on-brand pickup path — so ordering never leaves Zingerman’s for a third-party checkout.',
    tagline: 'Responsive e-commerce that keeps trust on-site.',
    featured: false,
    featuredSize: 'standard',
    order: 3,
    type: 'E-commerce Redesign · Responsive Web',
    role: 'UX Designer',
    timeline: 'Fall 2025 · SI 407',
    tools: ['Figma'],
    methods: [
      'Heuristic Evaluation',
      'Competitive Analysis',
      'Usability Testing',
      'Affinity Mapping',
      'Task Flow Analysis',
    ],
    categories: ['UX Research', 'Product Design', 'Visual Design'],
    accent: '#2f6b4f',
    thumbnail: '/assets/zingerman-hero.jpg',
    heroImage: '/assets/zingerman-hero.jpg',
    figmaUrl:
      'https://www.figma.com/design/is7SGby9XOxbDBQ2Mlqcin/407_ResponsiveProject_pinjiang?node-id=1-4',
    uxfolioUrl: 'https://uxfol.io/home/portfolios/3cb13abd/p/9e4d6f23',
    summary:
      'Redesigned Zingerman’s pickup ordering into one responsive flow — clearer menu findability, cart feedback, and checkout that stays on-brand.',
    overview:
      'Zingerman’s had the brand — and a fragmented digital checkout. Ordering jumped across Snackpass, zcob.me, and Mail Order. I redesigned a full responsive pickup path (desktop + mobile) and pressure-tested it with moderated usability sessions focused on limited-item findability, cart confidence, and brand personality.',
    contribution:
      'Solo end-to-end: heuristics, competitive review, usability testing (n=3), affinity synthesis, and hi-fi prototype across six screens.',
    snapshot: {
      project: "Zingerman's Deli E-commerce Redesign",
      type: 'E-commerce redesign · Responsive web',
      role: 'UX Designer (individual)',
      timeline: 'Fall 2025 · SI 407',
      tools: 'Figma',
      impact: 'Hi-fi desktop + mobile prototype covering the full pickup path',
    },
    sections: [
      {
        id: 'context',
        title: 'Challenge',
        content: [
          'Zingerman’s is an Ann Arbor institution with a strong artisanal brand — and a digital ordering surface that had grown through partnerships rather than a single owned path.',
        ],
        modules: [
          {
            type: 'brief-cards',
            items: [
              {
                title: 'Course brief',
                description:
                  'SI 407 · Advanced Design — redesign a local business’s responsive web experience from research through hi-fi prototype.',
              },
              {
                title: 'Scope',
                description:
                  'Pickup ordering: homepage → menu → product detail → cart → checkout → confirmation, at desktop 1512px and mobile 440px.',
              },
              {
                title: 'Research window',
                description:
                  'Heuristic + competitor review on 2 Sep 2025; usability sessions and affinity synthesis feeding wireframes and hi-fi revisions through late September.',
              },
              {
                title: 'Constraint',
                description:
                  'Keep Zingerman’s playful brand personality while fixing findability, consistency, and checkout confidence — not a generic QSR clone.',
              },
            ],
          },
        ],
      },
      {
        id: 'prototype',
        title: 'Prototype showcase',
        content: [
          'Hi-fi responsive pickup flow from the final Figma file — full walkthrough on desktop + mobile, then screen-by-screen pairs.',
        ],
        modules: [
          {
            type: 'commerce-showcase',
            desktopUrl: 'zingermansdeli.com',
            walkthrough: {
              title: 'Full demo',
              description:
                'One continuous on-site path across desktop and mobile: homepage → menu → detail → cart → checkout → confirmation.',
              interval: 3400,
              frames: [
                {
                  src: '/assets/zingerman/homepage-desktop.png',
                  mobileSrc: '/assets/zingerman/homepage-mobile.png',
                  label: 'Homepage',
                  alt: 'Zingerman homepage with branded hero and order path',
                  mobileAlt: 'Mobile homepage',
                },
                {
                  src: '/assets/zingerman/product-listing-desktop.png',
                  mobileSrc: '/assets/zingerman/product-listing-mobile.png',
                  label: 'Menu',
                  alt: 'Sandwich menu listing with filters and Limited Time tags',
                  mobileAlt: 'Mobile product listing',
                },
                {
                  src: '/assets/zingerman/product-detail-desktop.png',
                  mobileSrc: '/assets/zingerman/product-detail-mobile.png',
                  label: 'Detail',
                  alt: 'Product detail with customize and add actions',
                  mobileAlt: 'Mobile product detail',
                },
                {
                  src: '/assets/zingerman/cart-desktop.png',
                  mobileSrc: '/assets/zingerman/cart-mobile.png',
                  label: 'Cart',
                  alt: 'Cart review with clear line items and totals',
                  mobileAlt: 'Mobile cart',
                },
                {
                  src: '/assets/zingerman/checkout-desktop.png',
                  mobileSrc: '/assets/zingerman/checkout-mobile.png',
                  label: 'Checkout',
                  alt: 'Checkout with pickup and payment on Zingerman domain',
                  mobileAlt: 'Mobile checkout',
                },
                {
                  src: '/assets/zingerman/confirmation-desktop.png',
                  mobileSrc: '/assets/zingerman/confirmation-mobile.png',
                  label: 'Confirmation',
                  alt: 'Order confirmation with pickup summary',
                  mobileAlt: 'Mobile confirmation',
                },
              ],
            },
            screens: [
              {
                id: 'homepage',
                title: 'Homepage',
                description: 'Branded hero with a clear order path and less scroll noise before the menu.',
                desktop: {
                  src: '/assets/zingerman/homepage-desktop.png',
                  alt: 'Desktop homepage',
                },
                mobile: {
                  src: '/assets/zingerman/homepage-mobile.png',
                  alt: 'Mobile homepage',
                },
              },
              {
                id: 'listing',
                title: 'Menu listing',
                description: 'Filter pills and product cards with Limited Time cues.',
                desktop: {
                  src: '/assets/zingerman/product-listing-desktop.png',
                  alt: 'Desktop product listing',
                },
                mobile: {
                  src: '/assets/zingerman/product-listing-mobile.png',
                  alt: 'Mobile product listing',
                },
              },
              {
                id: 'detail',
                title: 'Product detail',
                description: 'Readable spacing, pricing, and primary add / customize actions.',
                desktop: {
                  src: '/assets/zingerman/product-detail-desktop.png',
                  alt: 'Desktop product detail',
                },
                mobile: {
                  src: '/assets/zingerman/product-detail-mobile.png',
                  alt: 'Mobile product detail',
                },
              },
              {
                id: 'cart',
                title: 'Cart',
                description: 'Persistent cart feedback so items feel confirmed before checkout.',
                desktop: {
                  src: '/assets/zingerman/cart-desktop.png',
                  alt: 'Desktop cart',
                },
                mobile: {
                  src: '/assets/zingerman/cart-mobile.png',
                  alt: 'Mobile cart',
                },
              },
              {
                id: 'checkout',
                title: 'Checkout',
                description: 'Pickup and payment stay on Zingerman’s domain through the end of the journey.',
                desktop: {
                  src: '/assets/zingerman/checkout-desktop.png',
                  alt: 'Desktop checkout',
                },
                mobile: {
                  src: '/assets/zingerman/checkout-mobile.png',
                  alt: 'Mobile checkout',
                },
              },
              {
                id: 'confirmation',
                title: 'Confirmation',
                description: 'Recognition of items, pricing, and next steps without leaving the brand.',
                desktop: {
                  src: '/assets/zingerman/confirmation-desktop.png',
                  alt: 'Desktop confirmation',
                },
                mobile: {
                  src: '/assets/zingerman/confirmation-mobile.png',
                  alt: 'Mobile confirmation',
                },
              },
            ],
          },
        ],
      },
      {
        id: 'tension',
        title: 'The problem',
        content: [
          'The live site showcases brand and product lines well — but ordering hands users off to other domains mid-journey.',
        ],
        modules: [
          {
            type: 'pain-cards',
            responseLabel: 'Design implication',
            items: [
              {
                pain: 'Fragmented ordering domains',
                opportunity:
                  'Own one continuous pickup path on Zingerman’s domain so users never wonder if they left the official brand.',
              },
              {
                pain: 'Brand break on third-party UI',
                opportunity:
                  'Snackpass (and similar) feels visually different — redesign must keep Zingerman’s voice through cart and confirmation.',
              },
              {
                pain: 'Personality vs. speed',
                opportunity:
                  'Usability participants loved the playful original but failed key find tasks; the prototype was easier but risked looking generic.',
              },
            ],
          },
          {
            type: 'insight-cards',
            items: [
              {
                insight:
                  'How might we keep Zingerman’s artisanal personality while giving customers one trustworthy, on-site path from browse to pickup confirmation?',
                evidence:
                  'Heuristic review (2 Sep 2025): Order Online is clear, but sandwiches / groceries / catering link out to Snackpass, zcob.me, and Mail Order — reducing tech overhead while fragmenting the journey.',
                implication:
                  'Design for owned checkout consistency and transparent specials — not more partner redirects.',
              },
            ],
          },
        ],
      },
      {
        id: 'research',
        title: 'Research',
        content: [
          'Three methods built the brief: heuristics on the live path, a local competitor check, and moderated think-aloud sessions against the original site and early prototype.',
        ],
        modules: [
          {
            type: 'method-cards',
            items: [
              {
                title: 'Heuristic evaluation',
                description:
                  'Walked browse → product → checkout → confirmation on the live Zingerman’s site against Nielsen heuristics — especially visibility of status, consistency & standards, flexibility, and recognition over recall.',
              },
              {
                title: 'Competitive analysis',
                description:
                  'Compared Ann Arbor peers Cottage Inn Pizza and Plum Market — both keep more of ordering and fulfillment on their own sites.',
              },
              {
                title: 'Usability testing',
                description:
                  'Moderated think-aloud with three participants: find and order sandwiches (including a limited-time item), customize, and complete pickup — on the original site, then on the prototype.',
              },
              {
                title: 'Affinity mapping',
                description:
                  'Clustered observations into five themes: first impressions, menu browsing, add-to-cart, checkout, and overall brand vs. usability trade-offs.',
              },
            ],
          },
          {
            type: 'competitor-cards',
            items: [
              {
                name: "Zingerman's (live)",
                points: [
                  'Strong brand personality and product variety.',
                  'Relies on Snackpass / zcob / Mail Order — inconsistency and trust risk at handoff.',
                ],
              },
              {
                name: 'Cottage Inn',
                points: [
                  'Unified ordering flow on one site.',
                  'Clear guest checkout — fewer domain hops.',
                ],
              },
              {
                name: 'Plum Market',
                points: [
                  'Shipping costs and delivery options shown without redirecting away.',
                  'Model for transparency during fulfillment choice.',
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'findings',
        title: 'Key findings',
        content: [
          'Heuristics named the structural problem; usability testing showed where findability and feedback broke confidence — and where brand still mattered.',
        ],
        modules: [
          {
            type: 'insight-cards',
            items: [
              {
                insight: 'Multi-domain ordering erodes consistency and trust.',
                evidence:
                  'Heuristic: users may click several partner links before finding the right path; Snackpass UI does not match Zingerman’s brand, so frequent users may bookmark the partner and skip the homepage entirely.',
                implication:
                  'Keep sandwiches, cart, and confirmation inside one Zingerman’s-branded responsive experience.',
              },
              {
                insight: 'Menu findability fails when specials and quirky names are hard to scan.',
                evidence:
                  'All three participants failed to find the G.O.A.T. sandwich on the live site (likely seasonal / unavailable) — search did not help; one said “I feel gaslit.” Quirky names did not map to ingredients.',
                implication:
                  'Surface limited-time items with clear labels, pair names with ingredient previews, and make availability obvious.',
              },
              {
                insight: 'Cart feedback and forced jumps break confidence mid-order.',
                evidence:
                  'On early prototypes, participants were unsure both items were in the cart; one flow jumped straight to checkout; cart chrome sometimes disappeared.',
                implication:
                  'Persistent cart, explicit “added” confirmation, editable quantities — never force checkout on add.',
              },
              {
                insight: 'Streamlining without personality feels like “every other restaurant.”',
                evidence:
                  'Participants praised prototype speed (“bam order,” “very easy”) but criticized generic or outdated visuals versus the playful original.',
                implication:
                  'Weave Zingerman’s imagery and storytelling into the clearer IA — function and brand together.',
              },
            ],
          },
        ],
      },
      {
        id: 'decisions',
        title: 'Design decisions',
        content: [
          'Affinity themes turned into five concrete modifications before hi-fi polish.',
        ],
        modules: [
          {
            type: 'feature-cards',
            items: [
              {
                title: 'Owned pickup path',
                description:
                  'Homepage through confirmation stays on one branded flow — no Snackpass-style handoff for the sandwich order.',
              },
              {
                title: 'Findable specials',
                description:
                  'Filter pills (Limited Time Only, Monthly Specials, Deli Sides) and Limited Time ribbons so seasonal items are not buried.',
              },
              {
                title: 'Readable detail + CTAs',
                description:
                  'Clearer spacing, size/pricing clarity, and separated Add vs Customize — revised after usability feedback.',
              },
              {
                title: 'Cart & confirmation feedback',
                description:
                  'Persistent cart review, then a confirmation screen with pickup details, items, and total for closure.',
              },
              {
                title: 'Brand in the streamline',
                description:
                  'Hero photography, deli atmosphere, and product imagery carry personality so the simpler IA does not feel generic.',
              },
            ],
          },
        ],
      },
      {
        id: 'design-response',
        title: 'Design decisions',
        content: [
          'Each research pressure mapped to a specific UI revision in the final Figma prototype.',
        ],
        modules: [
          {
            type: 'design-response',
            items: [
              {
                finding: 'Weak entry hierarchy + scattered specials',
                response:
                  'Branded hero with a clear order path, consolidated featured modules, and less scroll noise before the menu.',
                image: {
                  src: '/assets/zingerman/homepage-desktop.png',
                  alt: 'Redesigned Zingerman homepage with hero banner and featured modules',
                },
              },
              {
                finding: 'Hard to locate limited-time / category items',
                response:
                  'Filter pills and product cards with Limited Time cues on the sandwich listing.',
                image: {
                  src: '/assets/zingerman/product-listing-desktop.png',
                  alt: 'Product listing with filter tags and Limited Time product cards',
                },
              },
              {
                finding: 'Crowded detail and unclear add feedback',
                response:
                  'Revised product detail spacing and primary actions after usability notes on size/pricing and cart confirmation.',
                image: {
                  src: '/assets/zingerman/product-detail-revision.png',
                  alt: 'Revised product detail page with clearer spacing and CTAs',
                },
              },
              {
                finding: 'Incomplete sense of order completion',
                response:
                  'Dedicated confirmation with pickup summary — recognition of items, pricing, and next steps without leaving the brand.',
                image: {
                  src: '/assets/zingerman/confirmation-desktop.png',
                  alt: 'Order confirmation screen with pickup summary',
                },
              },
            ],
          },
        ],
      },
      {
        id: 'outcome',
        title: 'Impact',
        content: [
          'The final prototype is a complete responsive pickup system ready for critique — with accessibility passes documented in revision history.',
        ],
        modules: [
          {
            type: 'brief-cards',
            items: [
              {
                title: 'Deliverable',
                description:
                  'Hi-fi Figma prototype covering six screens at desktop and mobile across the full pickup path.',
              },
              {
                title: 'What improved',
                description:
                  'Participants could complete the limited-item order on the prototype; checkout was described as “very easy” when cart feedback stayed clear.',
              },
              {
                title: 'Open tension',
                description:
                  'Speed vs. personality — later revisions leaned harder into Zingerman’s imagery so the clearer IA would not read as generic QSR.',
              },
              {
                title: 'Accessibility pass',
                description:
                  'Revision history (29 Sep 2025): alt text and tooltips on cart, hero, listing add icons, product imagery, quantity, search, and back-to-cart.',
              },
            ],
          },
        ],
      },
      {
        id: 'reflection',
        title: 'Reflection',
        content: [
          'Brand and trust have to move together — a faster checkout that feels generic still fails Zingerman’s.',
          'Seasonal items can look like catastrophic usability bugs until you check inventory — then the real IA problems surface.',
          'Next time I’d prototype cart micro-feedback and brand density earlier, before they trade off late.',
        ],
      },
    ],
  },
  {
    id: 'stellantis-ivi',
    slug: 'stellantis-ivi',
    title: '2030 Alfa Romeo IVI System',
    subtitle:
      'An AI-HUD that extends the driver’s senses — without adding to mental workload.',
    tagline: 'From information display to perceptual augmentation.',
    featured: false,
    featuredSize: 'standard',
    order: 2,
    type: 'Stellantis UXD · Team Project',
    role: 'UX Designer',
    timeline: 'Fall 2025 · SI 394',
    team: ['Gloria Yu', 'Hazel Jiang'],
    tools: ['Figma'],
    methods: ['Secondary Research', 'Competitive Analysis', 'Wireframing', 'High-Fidelity Prototyping', 'Usability Evaluation'],
    categories: ['Product Design', 'System Design', 'Visual Design'],
    accent: '#981E32',
    thumbnail: '/assets/stellantis-cover.png',
    heroImage: '/assets/stellantis-cover.png',
    figmaUrl:
      'https://www.figma.com/design/Fmm8nUBlJPAFCX4CYwehdF/SI-394--Final-project-work--Copy-?node-id=327-7414',
    prototypeUrl:
      'https://www.figma.com/design/Fmm8nUBlJPAFCX4CYwehdF/SI-394--Final-project-work--Copy-?node-id=506-29592',
    summary:
      'Designed a 2030 Alfa Romeo multi-display IVI with AI-HUD perceptual alerts — coordinated across center display, driver cluster, and HUD.',
    overview:
      'Stellantis asked for an AI-enhanced IVI for safety and convenience. Gloria and I scoped it to Alfa Romeo and reframed the HUD: not another data readout, but a second perceptual layer. Risk is sensed, scored, and surfaced as leveled alerts across three displays — keeping the driver in control.',
    contribution:
      'Co-designed system logic, scenario flows, and hi-fi surfaces; owned perceptual-alert framing and brand visual language for the dark cockpit UI.',
    snapshot: {
      project: 'The 2030 Stellantis AI-HUD Experience',
      type: 'Automotive UX · Multi-display IVI + AR HUD',
      role: 'UX Designer',
      timeline: 'Fall 2025 · SI 394',
      team: 'Gloria Yu · Hazel Jiang',
      tools: 'Figma',
      impact: 'Interactive prototype + style guide + presentation deck',
    },
    sections: [
      {
        id: 'context',
        title: 'Challenge',
        content: [
          'Project Prompt 1 asked for an AI-enhanced IVI system for safety and convenience. We scoped it to Alfa Romeo’s performance-luxury identity and centered the story on HUD: from information display to perceptual augmentation.',
        ],
        modules: [
          {
            type: 'brief-cards',
            items: [
              {
                title: 'Client brief',
                description:
                  'Stellantis UXD · SI 394 — design a 2030 multi-modal in-vehicle experience under the AI-Enhanced Safety & Convenience prompt.',
              },
              {
                title: 'Brand lens',
                description:
                  'Alfa Romeo — performance-driven luxury, driver-centric cockpit, precision over decoration.',
              },
              {
                title: 'Core bet',
                description:
                  'HUD should not just show data — it should extend what the driver can see, sense, and predict in real time.',
              },
              {
                title: 'Team',
                description: 'Gloria Yu and Hazel Jiang · presented 2 Dec 2025.',
              },
            ],
          },
        ],
      },
      {
        id: 'prototype',
        title: 'Prototype showcase',
        content: [
          'Key Figma states recreated as controlled web animations — premium motion that shows relationships across displays, not decoration.',
        ],
        modules: [
          {
            type: 'ivi-showcase',
            accent: '#981E32',
            walkthrough: {
              title: 'Full demo',
              description:
                'One continuous walkthrough across home, navigation with predictive alert, map overlay, media, source switching, and driver gauges.',
              interval: 3400,
              frames: [
                {
                  src: '/assets/stellantis/center-home.png',
                  label: 'Home',
                  alt: 'Center display resting home',
                },
                {
                  src: '/assets/stellantis/navigation-route.png',
                  label: 'Navigation',
                  alt: 'Active navigation route guidance',
                  pulse: true,
                  alertLabel: 'Route alert · 750m',
                },
                {
                  src: '/assets/stellantis/navigation-map-overlay.png',
                  label: 'Map overlay',
                  alt: 'Navigation with expanded map overlay',
                },
                {
                  src: '/assets/stellantis/media.png',
                  label: 'Media',
                  alt: 'Media entertainment module',
                },
                {
                  src: '/assets/stellantis/media-source-switch.png',
                  label: 'Source switch',
                  alt: 'Expanded media source selector',
                },
                {
                  src: '/assets/stellantis/driver-display.png',
                  label: 'Driver · minimal',
                  alt: 'Driver display minimal state',
                  aspect: '1366 / 512',
                },
                {
                  src: '/assets/stellantis/driver-display-gauges.png',
                  label: 'Driver · gauges',
                  alt: 'Driver display with expanded gauges',
                  aspect: '1366 / 512',
                },
                {
                  src: '/assets/stellantis/hud-on-road.png',
                  label: 'HUD',
                  alt: 'HUD on-road perceptual overlay',
                  aspect: '1366 / 512',
                },
              ],
            },
            screens: [
              {
                id: 'home',
                title: 'Home',
                description:
                  'Resting center display with Gemini AI entry — voice-ready, optional assistance.',
                src: '/assets/stellantis/center-home.png',
                alt: 'Center display resting home screen',
              },
              {
                id: 'navigation',
                title: 'Navigation',
                description:
                  'Active route guidance with an early predictive alert pulsed on the road path.',
                src: '/assets/stellantis/navigation-route.png',
                alt: 'Navigation with predictive route alert',
                pulse: true,
                alertLabel: 'Route alert · 750m',
              },
              {
                id: 'map-overlay',
                title: 'Map overlay',
                description: 'Route preview expands into full map context for overview.',
                src: '/assets/stellantis/navigation-map-overlay.png',
                alt: 'Navigation with map overlay',
              },
              {
                id: 'media',
                title: 'Media',
                description: 'Entertainment module with persistent now-playing context.',
                src: '/assets/stellantis/media.png',
                alt: 'Media entertainment module',
              },
              {
                id: 'source-switch',
                title: 'Source switch',
                description: 'Expanded source selector — radio, streaming, device.',
                src: '/assets/stellantis/media-source-switch.png',
                alt: 'Media source switching module',
              },
              {
                id: 'driver-gauges',
                title: 'Driver gauges',
                description: 'Glance layer with expandable trip and gauge widgets.',
                src: '/assets/stellantis/driver-display-gauges.png',
                alt: 'Driver display with performance gauges',
                aspect: '1366 / 512',
              },
              {
                id: 'hud',
                title: 'HUD',
                description: 'Road-aligned perceptual layer — not a second dashboard.',
                src: '/assets/stellantis/hud-on-road.png',
                alt: 'HUD on-road perceptual overlay',
                aspect: '1366 / 512',
              },
              {
                id: 'display-coordination',
                title: 'Driver + center',
                description: 'Driver gauges stay compact while center carries map context.',
                type: 'split',
                driver: '/assets/stellantis/driver-display-gauges.png',
                driverAlt: 'Driver display gauges',
                center: '/assets/stellantis/navigation-map-overlay.png',
                centerAlt: 'Center display navigation map',
              },
            ],
          },
        ],
      },
      {
        id: 'tension',
        title: 'The problem',
        content: [
          'Driving already taxes attention. Adding AI and multi-screen density without a clear perceptual model only increases load.',
        ],
        modules: [
          {
            type: 'pain-cards',
            responseLabel: 'Design implication',
            items: [
              {
                pain: 'Limited attention',
                opportunity: 'Keep critical cues glanceable on HUD / driver display — never bury them in center-screen menus.',
              },
              {
                pain: 'Cognitive overload',
                opportunity: 'Level alerts by risk score; silence the system when intervention is not needed.',
              },
              {
                pain: 'Physical blind spots',
                opportunity: 'Use AR spatial overlays to make side-lane pressure and merge risk visible before it becomes urgent.',
              },
            ],
          },
          {
            type: 'insight-cards',
            items: [
              {
                insight:
                  'How might we use AI to extend the driver’s natural senses to enhance perception and safety, without adding to the driver’s mental workload?',
                evidence:
                  'Framed from the problem statement slide — friction points of limited attention, cognitive overload, and physical blind spots.',
                implication:
                  'Design for perceptual augmentation, not more dashboard chrome. AI recommends; the driver stays in full manual control.',
              },
            ],
          },
          {
            type: 'media',
            src: '/assets/stellantis/research/problem-friction.png',
            alt: 'Problem statement with friction points and How Might We question',
            caption: 'Evidence — Problem statement from the final presentation deck.',
          },
        ],
      },
      {
        id: 'research-evidence',
        title: 'Why focus on HUD',
        content: [
          'Secondary research positioned AR HUD as safer, more spatial, and more proactive than traditional interfaces — the foundation for our 2030 concept.',
        ],
        modules: [
          {
            type: 'brief-cards',
            items: [
              {
                title: 'Safer',
                description:
                  'Comparative study metrics show lower eye-off-road time, cognitive load, reaction time, and navigation error with AR HUD vs traditional UI.',
              },
              {
                title: 'From data to augmentation',
                description:
                  'Move beyond displaying numbers — project meaning onto the road so drivers interpret less and perceive more.',
              },
              {
                title: 'Proactive, not reactive',
                description:
                  'Surface merge risk and spatial pressure early, before the driver must scramble to respond.',
              },
            ],
          },
          {
            type: 'decision-matrix',
            columns: ['Metric', 'Traditional UI', 'AR HUD'],
            rows: [
              ['Avg. eye-off-road time (sec)', '3.4', '1.1'],
              ['Cognitive load index (NASA-TLX)', '72 / 100', '43 / 100'],
              ['Reaction time — obstacle (sec)', '2.3', '1.4'],
              ['Navigation error rate (%)', '6.5', '1.7'],
            ],
          },
          {
            type: 'stat-cards',
            note: 'Source cited on deck: Melantha, Shamal & Madeleine, Harper (2025). Comparative study of AR head-up displays and traditional interfaces in automotive safety.',
            items: [
              {
                value: '1.1s',
                label: 'Eye-off-road with AR HUD',
                detail: 'vs 3.4s traditional — less time looking away from the road.',
              },
              {
                value: '43',
                label: 'NASA-TLX cognitive load',
                detail: 'vs 72 / 100 traditional — lower reported mental demand.',
              },
              {
                value: '1.4s',
                label: 'Obstacle reaction time',
                detail: 'vs 2.3s traditional — faster response with AR cues.',
              },
              {
                value: '1.7%',
                label: 'Navigation error rate',
                detail: 'vs 6.5% traditional — fewer wrong turns / missed cues.',
              },
            ],
          },
        ],
      },
      {
        id: 'scenarios',
        title: 'Driving scenarios',
        content: [
          'Two night-highway scenarios show how the HUD extends perception first, then offers a soft recommendation — never a takeover.',
        ],
        modules: [
          {
            type: 'feature-cards',
            items: [
              {
                title: 'Scenario 1 · Early spatial awareness',
                description:
                  'Detecting merge-risk — HUD highlights side-lane pressure from an approaching truck and makes hidden motion cues visible at night, extending perceptual reach.',
                image: {
                  src: '/assets/stellantis/hud-on-road.png',
                  alt: 'HUD on-road with spatial path and merge context',
                },
              },
              {
                title: 'Scenario 2 · AI-augmented insight',
                description:
                  'Predictive driving recommendation — “Lane merge risk · truck closing from left” with a subtle “slight acceleration recommended” cue. Context-aware guidance for safer manual decisions.',
                image: {
                  src: '/assets/stellantis/hud-default.png',
                  alt: 'HUD default state with predictive alert affordance',
                },
              },
            ],
          },
          {
            type: 'media',
            src: '/assets/stellantis/research/hud-scenarios.png',
            alt: 'Two HUD scenarios: merge-risk awareness and predictive recommendation',
            caption: 'Evidence — Scenario frames from the final presentation deck.',
          },
        ],
      },
      {
        id: 'system-logic',
        title: 'How the system works',
        content: [
          'A simple risk loop: sense → score → decide whether to intervene → level the alert — or stay quiet.',
        ],
        modules: [
          {
            type: 'decision-matrix',
            columns: ['Step', 'What happens', 'Inputs / notes'],
            rows: [
              [
                'External sensing',
                'Detect objects, traffic, and environmental visibility',
                'Radar, camera, weather data',
              ],
              [
                'Danger scoring',
                'Assign a real-time risk score (0–10) to every object, factoring road conditions',
                'AI prediction model',
              ],
              [
                'Intervention needed?',
                'Does the risk score exceed the safety threshold?',
                'Decision gate',
              ],
              [
                'Yes → hazard warning',
                'Targeted, leveled alerts in the HUD',
                'Only when threshold is crossed',
              ],
              [
                'No → no warning',
                'Stay silent — no alerts',
                'Protects attention budget',
              ],
            ],
          },
          {
            type: 'media',
            src: '/assets/stellantis/research/system-logic.png',
            alt: 'Flowchart of sensing, danger scoring, and HUD intervention logic',
            caption: 'Evidence — System logic diagram from the presentation deck.',
          },
          {
            type: 'insight-cards',
            items: [
              {
                insight: 'Silence is a feature.',
                evidence:
                  'The flowchart ends in “No warning” as often as “Hazard warning” — intervention only when risk exceeds threshold.',
                implication:
                  'Design leveled, targeted HUD alerts — not constant AR noise that recreates cognitive overload.',
              },
            ],
          },
        ],
      },
      {
        id: 'competitive',
        title: 'Competitive patterns',
        content: [
          'Premium EV cockpits already treat AR HUD as a primary safety surface — our gap was making that layer feel Alfa-specific and workload-aware.',
        ],
        modules: [
          {
            type: 'competitor-cards',
            image: {
              src: '/assets/stellantis/competitor-analysis.png',
              alt: 'Competitor analysis comparing NIO ES8 and BYD AR HUD systems',
              caption: 'Evidence — Competitor analysis artifact from the Figma deck.',
            },
            items: [
              {
                name: 'NIO ES8',
                points: [
                  '38" panoramic AR HUD with mini-LED, lane-level navigation, pedestrian alerts, and synchronized ADAS visuals.',
                  'Over RMB 13 billion (2024) focused on smart EV and cockpit / driver-assist tech.',
                ],
              },
              {
                name: 'BYD',
                points: [
                  'HUD shows speed, limits, and ADAS states (ACC, lane keeping, blind-spot).',
                  '“God’s Eye” smart driving rolling out across up to 21 models — including lower-cost lines (~USD 9.5k).',
                  '2024 revenue ~RMB 777.1B with R&D ~RMB 54.2B — larger than net profit.',
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'feasibility',
        title: 'Technical feasibility',
        content: [
          '2030 is ambitious, but the sensing and AR-HUD building blocks already exist in production and research — our job was the interaction model, not inventing sensors.',
        ],
        modules: [
          {
            type: 'stat-cards',
            note: 'Figures as cited on the Future Tech Feasibility slide (BYD DiPilot / NIO ES8 industry notes; Zhang et al., 2023; Hui et al., 2023; Kim & Dey, 2013).',
            items: [
              {
                value: '29',
                label: 'Sensors on BYD DiPilot 100',
                detail: 'mm-wave radars, ultrasonic, tri-camera — highway pilot + advanced parking support (2025 platform).',
              },
              {
                value: '30–45%',
                label: 'Faster looks to emerging risks',
                detail: 'Eye-tracking experiments with AR spatial overlays (Zhang et al., 2023).',
              },
              {
                value: '40%',
                label: 'Faster hazard-detection response',
                detail: 'AR-HUD research when cues are used correctly (Hui et al., 2023; Kim & Dey, 2013).',
              },
              {
                value: '25%+',
                label: 'Higher task success',
                detail: 'Same AR-HUD research stream — better task completion with spatial cues.',
              },
            ],
          },
          {
            type: 'media',
            src: '/assets/stellantis/research/tech-feasibility.png',
            alt: 'Future tech feasibility slide with AR HUD research citations',
            caption: 'Evidence — Technical support slide from the presentation deck.',
          },
        ],
      },
      {
        id: 'principles',
        title: 'Design principles',
        content: [
          'Requirements ranked by safety value and Alfa brand fit — each maps to evidence above.',
        ],
        modules: [
          {
            type: 'brief-cards',
            items: [
              {
                title: 'Extend perceptual awareness',
                description:
                  'AR HUD as a second perceptual layer — enhance what drivers see and predict, while keeping full manual control.',
              },
              {
                title: 'Reduce cognitive load',
                description:
                  'Level alerts by risk; prefer glanceable HUD / driver-display cues over dense center-screen interruptions.',
              },
              {
                title: 'Split attention by surface',
                description:
                  'Driver display = glance layer; center display = exploration; HUD = road-aligned meaning.',
              },
              {
                title: 'Multi-modal, role-clear',
                description:
                  'Touch for parked / low-speed tasks; voice for hands-free; haptics for urgency; AI for prediction — not chatter.',
              },
              {
                title: 'Alfa precision',
                description:
                  'Dark cockpit, Alfa red (#981E32), sharp type, restrained motion — performance luxury, not generic EV chrome.',
              },
            ],
          },
          {
            type: 'media',
            src: '/assets/stellantis/style-guide.png',
            alt: 'Alfa Romeo IVI style guide with color, type, and components',
            caption: 'Evidence — Brand style guide from the Figma file.',
          },
        ],
      },
      {
        id: 'decisions',
        title: 'Insight → design decisions',
        content: [
          'Each major UI move traces to research or scenario evidence — not aesthetic preference.',
        ],
        modules: [
          {
            type: 'decision-matrix',
            columns: ['Evidence', 'Insight', 'Design decision'],
            rows: [
              [
                'AR HUD cuts eye-off-road 3.4s → 1.1s',
                'Critical cues belong on the road plane',
                'HUD as primary safety surface; center display secondary',
              ],
              [
                'Friction: cognitive overload + blind spots',
                'More UI is not more safety',
                'Risk-score gate + leveled alerts; silence when below threshold',
              ],
              [
                'Scenario: night merge pressure',
                'Drivers need early spatial awareness',
                'Lane-path AR + side-lane pressure highlights before urgency',
              ],
              [
                'Scenario: predictive recommendation',
                'AI should advise, not command',
                'Soft cues (“slight acceleration recommended”) with driver control',
              ],
              [
                'NIO / BYD set AR HUD baselines',
                'Missing HUD depth reads as outdated',
                'Lane-level nav + ADAS-synced overlays in Alfa visual language',
              ],
              [
                'Alfa brand: performance luxury',
                'Generic dark UI fails emotional trust',
                'Alfa red system, gauge widgets, precision motion language',
              ],
            ],
          },
          {
            type: 'design-response',
            items: [
              {
                finding: 'Critical driving info competes with infotainment.',
                response: 'Split driver cluster vs center exploration — speed, range, and turns stay glanceable.',
                image: {
                  src: '/assets/stellantis/driver-display-gauges.png',
                  alt: 'Driver display with performance gauges',
                },
              },
              {
                finding: 'Alerts arrive too late or too loudly.',
                response: 'Predictive HUD / navigation cues with early, leveled warnings.',
                image: {
                  src: '/assets/stellantis/navigation-route.png',
                  alt: 'Navigation route with predictive context',
                },
              },
              {
                finding: 'Media switching while driving costs too many steps.',
                response: 'Large-target source selector with persistent now-playing context.',
                image: {
                  src: '/assets/stellantis/media-source-switch.png',
                  alt: 'Media source switching module',
                },
              },
            ],
          },
        ],
      },
      {
        id: 'solution',
        title: 'What we built',
        content: [
          'A coordinated multi-display system: center display for modules, driver display for glanceables, HUD for road-aligned meaning — plus vehicle controls and media that respect attention.',
        ],
        modules: [
          {
            type: 'feature-cards',
            items: [
              {
                title: 'Center display · home',
                description:
                  'Resting home with time, vehicle presence, media, and shortcuts — Gemini AI entry without forcing chat into every task.',
                image: {
                  src: '/assets/stellantis/center-home.png',
                  alt: 'Center display resting home screen',
                },
              },
              {
                title: 'Predictive navigation',
                description:
                  'AR-enhanced route view with early turn cues, range context, and expandable map overlay.',
                image: {
                  src: '/assets/stellantis/navigation-map-overlay.png',
                  alt: 'Navigation with map overlay',
                },
              },
              {
                title: 'Media & source switching',
                description:
                  'Entertainment module with explicit source selector — radio, streaming, device — large targets for low-speed use.',
                image: {
                  src: '/assets/stellantis/media.png',
                  alt: 'Media entertainment module',
                },
              },
              {
                title: 'Vehicle controls & HVAC',
                description:
                  'Touch-first climate and vehicle modules with segmented drive-mode and fan-direction states.',
                image: {
                  src: '/assets/stellantis/vehicle-controls.png',
                  alt: 'Vehicle controls center display',
                },
              },
              {
                title: 'Driver display gauges',
                description:
                  'Configurable glance widgets for speed, range, power, and drive mode.',
                image: {
                  src: '/assets/stellantis/driver-display-gauges.png',
                  alt: 'Driver display gauge configuration',
                },
              },
              {
                title: 'HUD coordination',
                description:
                  'Default and on-road HUD states aligned with center navigation — perceptual layer, not a second dashboard.',
                image: {
                  src: '/assets/stellantis/hud-on-road.png',
                  alt: 'HUD on-road perceptual overlay',
                },
              },
            ],
          },
          {
            type: 'media',
            src: '/assets/stellantis/process-wireframes.png',
            alt: 'Mid-process wireframes and layout exploration',
            caption: 'Evidence — Mid-process wireframes from the Slides section.',
          },
        ],
      },
      {
        id: 'gallery-ui',
        title: 'Final UI gallery',
        content: [
          'Center, driver, and HUD surfaces annotated for recruiter scanning.',
        ],
        modules: [
          {
            type: 'annotated-gallery',
            groups: [
              {
                title: 'Center display',
                src: '/assets/stellantis/navigation-map-overlay.png',
                alt: 'Center display navigation with map overlay',
                caption: 'Active navigation — AR route panel + expandable map + bottom module nav.',
                annotations: [
                  { x: '3%', y: '2%', label: 'Gemini AI · voice entry' },
                  { x: '72%', y: '8%', label: 'Map layer control' },
                  { x: '4%', y: '88%', label: 'Persistent module navigation' },
                ],
              },
              {
                title: 'Driver display',
                src: '/assets/stellantis/driver-display-gauges.png',
                alt: 'Driver display with performance gauges',
                caption: 'Glance layer — speed, range, drive mode, turn-by-turn.',
                annotations: [
                  { x: '8%', y: '18%', label: 'Speed & unit' },
                  { x: '42%', y: '22%', label: 'Turn-by-turn distance' },
                  { x: '12%', y: '62%', label: 'Range · battery · drive mode' },
                ],
              },
              {
                title: 'HUD',
                src: '/assets/stellantis/hud-default.png',
                alt: 'HUD default state',
                caption: 'Perceptual layer — minimal projection aligned to the road.',
              },
            ],
          },
        ],
      },
      {
        id: 'outcome',
        title: 'Impact',
        content: [
          'We delivered a developer-ready Figma prototype and presentation that reframes HUD as perceptual augmentation — coordinated across three surfaces, grounded in secondary research, and styled for Alfa Romeo.',
        ],
        modules: [
          {
            type: 'brief-cards',
            items: [
              {
                title: 'Shipped',
                description:
                  'Hi-fi flows for home, navigation, media, HVAC / vehicle controls, driver display, and HUD — plus style guide and deck.',
              },
              {
                title: 'Narrative shift',
                description:
                  'From “show more data” to “extend senses without adding workload” — with a risk-score gate that protects silence.',
              },
              {
                title: 'Brand held',
                description:
                  'Alfa red, dark cockpit, precision motion — performance luxury rather than generic EV UI.',
              },
              {
                title: 'Next',
                description:
                  'Simulator distraction metrics, task timing for merge-risk scenarios, and cross-brand scalability of the component system.',
              },
            ],
          },
        ],
      },
      {
        id: 'reflection',
        title: 'Reflection',
        content: [
          'In automotive UX, decide where a feature lives — driver display, center screen, or HUD — before how it looks.',
          'Brand is hierarchy and motion, not just a red accent.',
          'Multi-modal only works when each input has a job: touch to explore, voice for hands-free, haptics for urgency, AI for prediction.',
        ],
      },
    ],
  },
]

export function getProjectBySlug(slug) {
  return projects.find((p) => p.slug === slug)
}

export function getAdjacentProjects(slug) {
  const sorted = [...projects].sort((a, b) => a.order - b.order)
  const index = sorted.findIndex((p) => p.slug === slug)
  return {
    prev: index > 0 ? sorted[index - 1] : null,
    next: index < sorted.length - 1 ? sorted[index + 1] : null,
  }
}

export const SKILLS = [
  'User Research & Interviews',
  'Interaction Design',
  'Service Design',
  'Prototyping & Usability Testing',
  'Information Architecture',
  'Visual & UI Design',
  'Physical Computing',
  'Design Systems',
  'Accessibility',
  'Storytelling & Presentation',
]

export const TOOLS = [
  'Figma',
  'Adobe Photoshop',
  'Adobe Illustrator',
  'Unity',
  'Rhino',
  'Arduino',
  'Python',
  'C++',
  'Java',
]
