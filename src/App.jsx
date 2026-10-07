import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Projects from './pages/Projects'
import CaseStudy from './pages/CaseStudy'
import FieldNotes from './pages/FieldNotes'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="projects" element={<Projects />} />
        <Route path="projects/:slug" element={<CaseStudy />} />
      </Route>
      {/* Isolated homepage concept preview — self-contained, no global nav/footer. */}
      <Route path="field-notes" element={<FieldNotes />} />
    </Routes>
  )
}
