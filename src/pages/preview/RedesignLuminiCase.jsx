import CaseShell from '../../components/redesign/CaseShell'
import { LHero, Problem, Menu, Pages, Home, Proof, Iteration, System, Search, Lesson } from '../../components/redesign/LuminiCase'
import { SEC_NAV } from '../../data/redesignLumini'
import '../../styles/redesign-preview.css'

/**
 * /preview/redesign/luminipet — the LuminiPet case study (visual version) in the redesign's
 * visual language. The published case study at /projects/luminipet-shopify is untouched.
 */
export default function RedesignLuminiCase() {
  return (
    <CaseShell title="LuminiPet" nav={SEC_NAV} skipTo="#problem">
      <LHero />
      <Problem />
      <Menu />
      <Pages />
      <Home />
      <Proof />
      <Iteration />
      <System />
      <Search />
      <Lesson />
    </CaseShell>
  )
}
