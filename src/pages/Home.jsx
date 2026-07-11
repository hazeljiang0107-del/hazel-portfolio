import { Link } from 'react-router-dom'
import PageMeta from '../components/PageMeta'
import Hero from '../components/Hero'
import HeroWaves from '../components/HeroWaves'
import FallingStars from '../components/FallingStars'
import HomeSection from '../components/motion/HomeSection'
import SelectedWorkCarousel from '../components/SelectedWorkCarousel'
import { SITE, projects, RESUME_URL } from '../data/projects'

export default function Home() {
  return (
    <>
      <PageMeta
        title={`${SITE.name} — UX / Product Design Portfolio`}
        description={SITE.tagline}
      />

      {/* 1–2. Hero (with positioning) → About, with shared atmospheric bridge */}
      <div className="home-intro">
        <div className="home-atmosphere" aria-hidden="true">
          <HeroWaves />
          <FallingStars className="falling-stars--ambient z-[2]" starCount={120} shootingInterval={5200} />
          <div className="home-atmosphere__veil" />
        </div>

        <div className="home-hero-flow">
          <Hero />
        </div>

        <section className="home-about relative z-10 border-t border-line px-6 py-20 md:py-28">
          <div className="mx-auto max-w-7xl">
            <HomeSection>
              <p className="type-eyebrow mb-8 md:mb-10">About</p>

              <div className="grid grid-cols-[minmax(0,7.25rem)_minmax(0,1fr)] items-start gap-5 sm:grid-cols-[minmax(0,9.5rem)_minmax(0,1fr)] sm:gap-7 md:grid-cols-[minmax(0,11.5rem)_minmax(0,1fr)] md:gap-10 lg:grid-cols-[minmax(0,13rem)_minmax(0,1fr)]">
                <figure className="home-about__portrait overflow-hidden border border-line">
                  <img
                    src={SITE.portrait}
                    alt="Hazel Jiang on a bridge in Rome"
                    className="aspect-[4/3] w-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </figure>

                <div className="min-w-0">
                  <p className="type-display type-display-sm max-w-2xl text-balance">
                    BSI at Michigan — UX Design and Biopsychology, Cognition, Neuroscience. Capstone
                    with ISR, automotive IVI with Stellantis, e-commerce with Zingerman&apos;s.
                  </p>
                  <Link
                    to="/about"
                    className="type-meta mt-6 inline-block transition-colors duration-500 hover:text-ink-secondary md:mt-8"
                  >
                    More about me →
                  </Link>
                </div>
              </div>
            </HomeSection>
          </div>
        </section>
      </div>

      {/* 4. Selected work carousel */}
      <section id="work" className="relative z-10 scroll-mt-20 bg-base px-6 pb-24 md:pb-32">
        <div className="mx-auto max-w-7xl">
          <HomeSection as="header" className="mb-10 border-t border-line pt-12 md:mb-14 md:pt-16 lg:pt-20">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <h2 className="type-chapter text-balance">Selected work</h2>
              <Link
                to="/projects"
                className="type-meta shrink-0 transition-colors duration-500 hover:text-ink-secondary"
              >
                View all projects →
              </Link>
            </div>
          </HomeSection>

          <SelectedWorkCarousel projects={projects} />
        </div>
      </section>

      <section className="border-t border-line bg-base px-6 py-24 md:py-36">
        <div className="mx-auto max-w-7xl">
          <HomeSection>
            <p className="type-eyebrow mb-8">{SITE.status}</p>
            <h2 className="type-display type-display-xl">
              Let&apos;s
              <br />
              connect.
            </h2>
            <div className="mt-12 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-x-10 sm:gap-y-4">
              <a
                href={`mailto:${SITE.email}`}
                className="type-body-lg text-ink-secondary transition-colors duration-500 hover:text-ink"
              >
                {SITE.email}
              </a>
              <a
                href={SITE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="type-body-lg text-ink-muted transition-colors duration-500 hover:text-ink"
              >
                LinkedIn
              </a>
              <a
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="type-body-lg text-ink-muted transition-colors duration-500 hover:text-ink"
              >
                Resume
              </a>
            </div>
          </HomeSection>
        </div>
      </section>
    </>
  )
}
