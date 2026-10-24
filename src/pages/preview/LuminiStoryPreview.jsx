import CaseShell from '../../components/redesign/CaseShell'
import { LuminiStory } from '../../components/redesign/LuminiStory'
import { NAV } from '../../data/luminipetStory'
import '../../styles/redesign-preview.css'

const MAG_FONTS =
  'https://fonts.googleapis.com/css2?family=Caveat:wght@500;600;700&family=Fraunces:opsz,wght@9..144,600;700;800&display=swap'

/**
 * Published LuminiPet case at /projects/luminipet-shopify.
 * Also mounted at /preview/luminipet-story.
 */
export default function LuminiStoryPreview() {
  return (
    <CaseShell
      title="LuminiPet"
      nav={NAV}
      skipTo="#outcome"
      className="ls"
      fonts={MAG_FONTS}
    >
      <LuminiStory />
    </CaseShell>
  )
}
