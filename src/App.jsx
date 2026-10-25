import { lazy, Suspense, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Projects from './pages/Projects'
import CaseStudy from './pages/CaseStudy'
import LuminiPetPreview from './pages/preview/LuminiPetPreview'

// The redesign (homepage + the two rebuilt case studies) is lazy-loaded and self-contained.
const RedesignHome = lazy(() => import('./pages/preview/RedesignPreview'))
const RedesignSocCase = lazy(() => import('./pages/preview/RedesignSocCase'))
const RedesignCase = lazy(() => import('./pages/preview/RedesignCase'))
const MagazineHome = lazy(() => import('./pages/preview/MagazineHome'))
const MagazineWork = lazy(() => import('./pages/preview/MagazineWork'))
const PortfolioPreview = lazy(() => import('./pages/preview/PortfolioPreview'))
const LuminiPetCaseStudyPreview = lazy(() => import('./pages/preview/LuminiPetCaseStudyPreview'))
const LuminiPetVisualPreview = lazy(() => import('./pages/preview/LuminiPetVisualPreview'))
const LuminiStoryPreview = lazy(() => import('./pages/preview/LuminiStoryPreview'))
const SocStoryPreview = lazy(() => import('./pages/preview/SocStoryPreview'))
const GradeWithContext = lazy(() => import('./pages/preview/GradeWithContext'))

const lazyPage = (Page, props) => (
  <Suspense fallback={null}>
    <Page {...props} />
  </Suspense>
)

// Case studies rendered from src/data/projects.js in the redesign's style.
const RENDERED_CASES = ['stellantis-ivi', 'zingerman-deli', 'still-here', 'echoes-you-can-touch']

/** Keeps the previous site reachable without letting it compete with the new pages in search. */
function Classic({ children }) {
  useEffect(() => {
    const meta = document.createElement('meta')
    meta.name = 'robots'
    meta.content = 'noindex, nofollow'
    document.head.appendChild(meta)
    return () => meta.remove()
  }, [])
  return children
}

export default function App() {
  return (
    <Routes>
      {/* Live: magazine homepage + redesigned case studies (self-contained, no site Layout). */}
      <Route path="/" element={lazyPage(MagazineHome)} />
      <Route path="work" element={lazyPage(MagazineWork)} />
      <Route path="projects/surveys-of-consumers" element={lazyPage(RedesignSocCase)} />
      <Route path="projects/luminipet-shopify" element={lazyPage(LuminiStoryPreview)} />
      {RENDERED_CASES.map((slug) => (
        <Route key={slug} path={`projects/${slug}`} element={lazyPage(RedesignCase, { slug })} />
      ))}

      <Route element={<Layout />}>
        <Route path="about" element={<About />} />
        <Route path="projects" element={<Projects />} />
        <Route path="projects/:slug" element={<CaseStudy />} />

        {/* Previous homepage and case studies, kept under /classic. */}
        <Route path="classic" element={<Classic><Home /></Classic>} />
        <Route path="classic/projects/:slug" element={<Classic><CaseStudy /></Classic>} />

        {/* Earlier LuminiPet comparison previews. */}
        <Route path="preview/luminipet" element={<LuminiPetPreview />} />
        <Route path="preview/projects/luminipet" element={lazyPage(LuminiPetCaseStudyPreview)} />
        <Route path="preview/projects/luminipet-visual" element={lazyPage(LuminiPetVisualPreview)} />
      </Route>

      <Route path="preview/portfolio" element={lazyPage(PortfolioPreview)} />
      {/* Same LuminiPet story as the published case, kept so the preview URL still opens. */}
      <Route path="preview/luminipet-story" element={lazyPage(LuminiStoryPreview)} />
      {/* Surveys of Consumers visual story preview — does not replace the published case. */}
      <Route path="preview/soc-story" element={lazyPage(SocStoryPreview)} />
      {/* Grade with Context — LMS assignment feedback design proposal. */}
      <Route path="preview/grade-with-context" element={lazyPage(GradeWithContext)} />
      {/* Previous dark redesign homepage, kept for comparison. */}
      <Route path="preview/redesign-home" element={lazyPage(RedesignHome)} />

      {/* The magazine + redesign previews are now the live pages. */}
      <Route path="preview/magazine" element={<Navigate to="/" replace />} />
      <Route path="preview/redesign" element={<Navigate to="/" replace />} />
      <Route path="preview/redesign/surveys-of-consumers" element={<Navigate to="/projects/surveys-of-consumers" replace />} />
      <Route path="preview/redesign/luminipet" element={<Navigate to="/projects/luminipet-shopify" replace />} />
    </Routes>
  )
}
