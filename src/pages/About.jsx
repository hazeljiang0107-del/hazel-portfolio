import PageMeta from '../components/PageMeta'
import Button from '../components/Button'
import Tag from '../components/Tag'
import FallingStars from '../components/FallingStars'
import { SITE, SKILLS, TOOLS, RESUME_URL } from '../data/projects'

export default function About() {
  return (
    <>
      <PageMeta
        title={`About — ${SITE.name}`}
        description={`${SITE.name} — UX and product design at the University of Michigan.`}
      />

      <div className="about-page relative" data-falling-stars-root>
        <FallingStars
          className="falling-stars--page z-0"
          interactive
          starCount={160}
          shootingInterval={4500}
        />
        <div className="about-page__veil pointer-events-none absolute inset-0 z-[1]" aria-hidden="true" />

        <div className="relative z-10 px-6 pb-20 pt-28 md:pt-32">
          <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[minmax(0,0.36fr)_minmax(0,1fr)] md:items-start md:gap-12 lg:gap-16">
          <figure className="overflow-hidden border border-line md:sticky md:top-32">
            <img
              src={SITE.portrait}
              alt="Hazel Jiang on a bridge in Rome"
              className="aspect-[4/3] h-full w-full object-cover"
              loading="eager"
              decoding="async"
            />
          </figure>

          <div className="max-w-3xl">
            <p className="text-label mb-3">About</p>
            <h1 className="font-display text-[clamp(2rem,5vw,3.25rem)] leading-[1.05] tracking-[-0.02em] text-ink">
              Hi, I&apos;m {SITE.name.split(' ')[0]}.
            </h1>

            <div className="prose-editorial mt-8 space-y-4 text-base">
              <p>
                UX and product design student at Michigan — User Experience Design plus
                Biopsychology, Cognition, and Neuroscience. I design for what people feel and
                need under real constraints.
              </p>
              <p>
                Capstone with ISR on Surveys of Consumers, automotive IVI with Stellantis,
                e-commerce with Zingerman&apos;s, and healthcare wearables. UI/UX intern at Yixin
                Group in Shanghai.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <Button href={`mailto:${SITE.email}`}>Get in touch</Button>
              <Button href={RESUME_URL} variant="secondary">
                Download resume
              </Button>
              <Button href={SITE.linkedin} variant="ghost">
                LinkedIn
              </Button>
            </div>
          </div>
          </div>

          <div className="mx-auto mt-16 grid max-w-7xl gap-px bg-line md:grid-cols-2">
          <div className="bg-base p-6 md:p-8">
            <h2 className="text-label mb-4">Education</h2>
            <p className="font-display text-xl text-ink">{SITE.education.school}</p>
            <p className="text-meta mt-1">{SITE.education.years}</p>
            <p className="mt-3 text-sm text-ink-secondary">{SITE.education.detail}</p>
          </div>

          <div className="bg-base p-6 md:p-8">
            <h2 className="text-label mb-4">Experience</h2>
            <p className="font-display text-xl text-ink">{SITE.experience.role}</p>
            <p className="text-meta mt-1">
              {SITE.experience.company} · {SITE.experience.location}
            </p>
            <p className="text-meta">{SITE.experience.dates}</p>
          </div>
          </div>

          <div className="mx-auto mt-14 max-w-7xl">
          <h2 className="text-label mb-4">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {SKILLS.map((skill) => (
              <Tag key={skill}>{skill}</Tag>
            ))}
          </div>
          </div>

          <div className="mx-auto mt-10 max-w-7xl">
          <h2 className="text-label mb-4">Tools</h2>
          <div className="flex flex-wrap gap-2">
            {TOOLS.map((tool) => (
              <Tag key={tool}>{tool}</Tag>
            ))}
          </div>
          </div>
        </div>
      </div>
    </>
  )
}
