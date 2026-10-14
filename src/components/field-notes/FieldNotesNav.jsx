import { Link } from 'react-router-dom'
import { RESUME_URL } from '../../data/projects'

export default function FieldNotesNav() {
  return (
    <header className="fn-nav">
      <Link to="/" className="fn-nav__name">
        Hazel Jiang
      </Link>
      <nav className="fn-nav__links" aria-label="Field notes navigation">
        <a href="#fn-work">Work</a>
        <a href="#fn-about">About</a>
        <a href={RESUME_URL} target="_blank" rel="noopener noreferrer">
          Resume
        </a>
      </nav>
    </header>
  )
}
