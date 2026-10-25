import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import VisitAnalytics from './components/VisitAnalytics.jsx'
import ClarityEvents from './components/ClarityEvents.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <VisitAnalytics />
      <ClarityEvents />
      <App />
    </BrowserRouter>
  </StrictMode>,
)
