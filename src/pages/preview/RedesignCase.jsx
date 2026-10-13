import { Navigate } from 'react-router-dom'
import CaseShell from '../../components/redesign/CaseShell'
import { CaseHero, CaseOverview, CaseSections } from '../../components/redesign/CaseKit'
import { getCase } from '../../data/redesignCases'
import '../../styles/redesign-preview.css'

/**
 * One redesigned case study in the portfolio's visual language, rendered from src/data/projects.js
 * (Alfa Romeo IVI, Zingerman's, Still Here, Echoes). Surveys of Consumers and LuminiPet have
 * their own hand-composed pages.
 */
export default function RedesignCase({ slug }) {
  const c = getCase(slug)
  if (!c) return <Navigate to="/projects" replace />
  return (
    <CaseShell title={c.title} nav={c.nav} skipTo="#overview">
      <CaseHero c={c} />
      <CaseOverview c={c} />
      <CaseSections c={c} />
    </CaseShell>
  )
}
