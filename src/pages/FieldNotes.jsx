import '../styles/field-notes.css'
import PageMeta from '../components/PageMeta'
import FieldNotesNav from '../components/field-notes/FieldNotesNav'
import KeyringHero from '../components/field-notes/KeyringHero'
import ProjectFolder from '../components/field-notes/ProjectFolder'
import FieldNotesAbout from '../components/field-notes/FieldNotesAbout'
import { projects } from '../data/projects'

/**
 * "Hazel's Field Notes" — isolated homepage concept preview.
 * Not linked from main navigation and does not replace the live
 * homepage. Visit directly at /field-notes.
 *
 * First implementation scope (per brief): nav + hero + one complete
 * project folder + a simple transition between them. Case studies
 * themselves are untouched — all links route to the existing,
 * unmodified case study pages.
 */
export default function FieldNotes() {
  const featuredProject = projects.find((p) => p.slug === 'surveys-of-consumers')

  return (
    <div className="fn-page">
      <PageMeta
        title="Hazel's Field Notes — concept preview"
        description="An interactive, physical-object concept for Hazel Jiang's UX portfolio homepage."
      />

      <FieldNotesNav />
      <KeyringHero />

      <section id="fn-work" className="fn-work">
        <p className="fn-work__heading">Selected work</p>
        {featuredProject && <ProjectFolder project={featuredProject} index={1} />}
      </section>

      <div id="fn-about">
        <FieldNotesAbout />
      </div>
    </div>
  )
}
