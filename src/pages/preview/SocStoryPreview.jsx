import CaseShell from '../../components/redesign/CaseShell'
import { SocStory, NAV } from '../../components/redesign/SocStory'
import '../../styles/redesign-preview.css'

const MAG_FONTS =
  'https://fonts.googleapis.com/css2?family=Caveat:wght@500;600;700&family=Fraunces:opsz,wght@9..144,600;700;800&display=swap'

/**
 * Working preview for the Surveys of Consumers visual story.
 * Does not replace the published case at /projects/surveys-of-consumers.
 */
export default function SocStoryPreview() {
  return (
    <CaseShell
      title="Surveys of Consumers · story (preview)"
      nav={NAV}
      skipTo="#experience"
      className="ls ss"
      fonts={MAG_FONTS}
    >
      <SocStory />
    </CaseShell>
  )
}
