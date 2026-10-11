import CaseShell from '../../components/redesign/CaseShell'
import { CaseHero, Overview, Challenge, Built, Problem, Research, Quant, Qual, Competitive, Journey, IA, Principles, Decisions, Results } from '../../components/redesign/SocCase'
import { SEC_NAV } from '../../data/redesignSoc'
import '../../styles/redesign-preview.css'

/**
 * /preview/redesign/surveys-of-consumers — the first case study in the redesign's visual language.
 * The published case study at /projects/surveys-of-consumers is untouched.
 */
export default function RedesignSocCase() {
  return (
    <CaseShell title="Surveys of Consumers Redesign" nav={SEC_NAV} skipTo="#context">
      <CaseHero />
      <Overview />
      <Challenge />
      <Built />
      <Problem />
      <Research />
      <Quant />
      <Qual />
      <Competitive />
      <Journey />
      <IA />
      <Principles />
      <Decisions />
      <Results />
    </CaseShell>
  )
}
