import { useEffect, useId, useState } from 'react'
import { Link } from 'react-router-dom'
import '../../styles/grade-with-context.css'

const FONTS = 'https://fonts.googleapis.com/css2?family=Lato:wght@400;700;900&display=swap'

const COURSE_NAV = [
  { id: 'home', label: 'Home' },
  { id: 'announcements', label: 'Announcements' },
  { id: 'modules', label: 'Modules' },
  { id: 'assignments', label: 'Assignments', current: true },
  { id: 'discussions', label: 'Discussions' },
  { id: 'grades', label: 'Grades' },
  { id: 'people', label: 'People' },
  { id: 'files', label: 'Files' },
  { id: 'syllabus', label: 'Syllabus' },
]

const RUBRIC = [
  {
    id: 'argument',
    name: 'Argument and evidence',
    score: '4 / 5',
    earned: 4,
    description:
      'How clearly the response states the author’s main claim and connects evidence from the text to that claim.',
    levels: [
      { pts: '5', text: 'Claim is precise; evidence is selected and explained in relation to the claim.' },
      { pts: '4', text: 'Claim is clear; evidence is relevant, with a brief but incomplete link to the claim.' },
      { pts: '3', text: 'Claim is present; evidence is listed with little explanation of how it supports the claim.' },
      { pts: '1–2', text: 'Claim is unclear or missing; evidence is absent or unrelated.' },
    ],
  },
  {
    id: 'interpretation',
    name: 'Interpretation',
    score: '4 / 5',
    earned: 4,
    description:
      'How thoughtfully the response explains what the evidence means in the context of the author’s argument.',
    levels: [
      { pts: '5', text: 'Interpretation shows how the evidence advances the argument and considers its limits.' },
      { pts: '4', text: 'Interpretation is accurate and mostly connected to the argument.' },
      { pts: '3', text: 'Interpretation restates the evidence without deepening the argument.' },
      { pts: '1–2', text: 'Interpretation is missing, inaccurate, or unrelated to the text.' },
    ],
  },
]

const DISTRIBUTION = [
  { label: '0–2', height: 12 },
  { label: '3–4', height: 28 },
  { label: '5–6', height: 52 },
  { label: '7–8', height: 100, you: true },
  { label: '9–10', height: 64 },
]

const NEXT_STEPS = [
  { id: 'understand', label: 'I understand what to work on' },
  { id: 'question', label: 'I have a question about the feedback' },
  { id: 'revisit', label: 'I want to revisit the assignment prompt' },
]

function IconCourses() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 6.5A2.5 2.5 0 0 1 6.5 4H12v16H6.5A2.5 2.5 0 0 1 4 17.5v-11ZM12 4h5.5A2.5 2.5 0 0 1 20 6.5v11a2.5 2.5 0 0 1-2.5 2.5H12V4Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
    </svg>
  )
}

function IconDashboard() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 4h7v7H4V4Zm9 0h7v4h-7V4ZM4 13h7v7H4v-7Zm9 2h7v5h-7v-5Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
    </svg>
  )
}

function IconCalendar() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M7 3v3M17 3v3M4 9h16M5 6h14a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  )
}

function IconInbox() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 8.5 12 13l8-4.5M5 19h14a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function IconAccount() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM5 20a7 7 0 0 1 14 0"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  )
}

function Chevron({ className }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M5 7.5 10 12.5 15 7.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M3.5 8.5 6.5 11.5 12.5 4.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ExternalIcon() {
  return (
    <svg viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path
        d="M5 3H3.5A1.5 1.5 0 0 0 2 4.5v6A1.5 1.5 0 0 0 3.5 12h6A1.5 1.5 0 0 0 11 10.5V9M8 2h4v4M6 8l6-6"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/**
 * Design proposal: student assignment feedback with score, rubric, and next steps
 * shown in context. Canvas-like shell for familiarity — not an official Canvas feature.
 */
export default function GradeWithContext() {
  const [openCriteria, setOpenCriteria] = useState(() => new Set())
  const [distOpen, setDistOpen] = useState(false)
  const [showScoreInNotifications, setShowScoreInNotifications] = useState(false)
  const [nextStep, setNextStep] = useState(null)
  const [savedFlash, setSavedFlash] = useState(false)
  const baseId = useId()

  useEffect(() => {
    document.documentElement.classList.add('gwc-root')
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = FONTS
    link.dataset.gwcFonts = 'true'
    document.head.appendChild(link)

    const prevTitle = document.title
    document.title = 'Critical Response · Learning and Technology'

    return () => {
      document.documentElement.classList.remove('gwc-root')
      link.remove()
      document.title = prevTitle
    }
  }, [])

  useEffect(() => {
    if (!nextStep) return undefined
    setSavedFlash(true)
    const t = window.setTimeout(() => setSavedFlash(false), 2800)
    return () => window.clearTimeout(t)
  }, [nextStep])

  const toggleCriterion = (id) => {
    setOpenCriteria((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <div className="gwc">
      <a className="gwc-skip" href="#gwc-content">
        Skip To Content
      </a>

      <aside className="gwc-global" aria-label="Global navigation">
        <a className="gwc-global-logo" href="#account" title="Account">
          <span className="gwc-global-logo-mark">LS</span>
        </a>
        <nav className="gwc-global-nav">
          <a className="gwc-global-item" href="#account">
            <IconAccount />
            Account
          </a>
          <a className="gwc-global-item" href="#dashboard">
            <IconDashboard />
            Dashboard
          </a>
          <a className="gwc-global-item" href="#courses" aria-current="page">
            <IconCourses />
            Courses
          </a>
          <a className="gwc-global-item" href="#calendar">
            <IconCalendar />
            Calendar
          </a>
          <a className="gwc-global-item" href="#inbox">
            <IconInbox />
            Inbox
          </a>
        </nav>
        <div className="gwc-global-foot">
          <span className="gwc-prototype-tag">
            Design
            <br />
            proposal
          </span>
        </div>
      </aside>

      <div className="gwc-shell">
        <nav className="gwc-course-nav" aria-label="Course navigation">
          <div className="gwc-course-header">
            <a href="#course">Learning and Technology</a>
            <p className="gwc-course-term">Fall 2026</p>
          </div>
          <ul className="gwc-course-list">
            {COURSE_NAV.map((item) => (
              <li key={item.id}>
                <a
                  className="gwc-course-link"
                  href={`#${item.id}`}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="gwc-content">
          <div className="gwc-tray">
            <p className="gwc-tray-note">
              <strong>Grade with Context</strong> — design proposal for assignment feedback. Not an
              official LMS feature.
            </p>
            <Link to="/">Back to portfolio</Link>
          </div>

          <nav className="gwc-crumb" aria-label="Breadcrumbs">
            <a href="#course">Learning and Technology</a>
            <span className="gwc-crumb-sep" aria-hidden="true">
              ›
            </span>
            <a href="#assignments">Assignments</a>
            <span className="gwc-crumb-sep" aria-hidden="true">
              ›
            </span>
            <span aria-current="page">Critical Response</span>
          </nav>

          <main id="gwc-content" className="gwc-main">
            <header className="gwc-header">
              <div className="gwc-header-row">
                <h1 className="gwc-title">Critical Response</h1>
                <p className="gwc-status">Feedback available</p>
              </div>
              <div className="gwc-meta">
                <span>
                  Due: <strong>Oct 8 at 11:59pm</strong>
                </span>
                <span>
                  Points: <strong>10</strong>
                </span>
                <span>
                  Submitting: <strong>a text entry</strong>
                </span>
              </div>
            </header>

            <section className="gwc-cluster" aria-labelledby={`${baseId}-score-cue`}>
              <div className="gwc-score-block">
                <p className="gwc-cue" id={`${baseId}-score-cue`}>
                  Score
                </p>
                <p className="gwc-score-value" aria-label="8 out of 10">
                  8 <span>/ 10</span>
                </p>
                <p className="gwc-score-note">
                  One part of how this work met the assignment goal.
                </p>
              </div>

              <div className="gwc-context">
                <div className="gwc-goal">
                  <p className="gwc-goal-label">Learning goal</p>
                  <p>Explain how the author supports the main argument.</p>
                </div>
                <a className="gwc-prompt-link" href="#prompt">
                  Review assignment instructions
                  <ExternalIcon />
                </a>
              </div>
            </section>

            <section className="gwc-section" aria-labelledby={`${baseId}-rubric`}>
              <div className="gwc-section-head">
                <h2 className="gwc-section-title" id={`${baseId}-rubric`}>
                  Rubric
                </h2>
                <p className="gwc-section-desc">
                  Expand a criterion to see what each rating means.
                </p>
              </div>

              <div className="gwc-rubric">
                {RUBRIC.map((item) => {
                  const open = openCriteria.has(item.id)
                  const panelId = `${baseId}-${item.id}-panel`
                  return (
                    <div
                      key={item.id}
                      className="gwc-criterion"
                      data-open={open ? 'true' : 'false'}
                    >
                      <button
                        type="button"
                        className="gwc-criterion-toggle"
                        aria-expanded={open}
                        aria-controls={panelId}
                        onClick={() => toggleCriterion(item.id)}
                      >
                        <span className="gwc-criterion-name">{item.name}</span>
                        <span className="gwc-criterion-score">{item.score}</span>
                        <Chevron className="gwc-criterion-chevron" />
                      </button>
                      <div
                        className="gwc-criterion-body"
                        id={panelId}
                        role="region"
                        aria-hidden={!open}
                      >
                        <div className="gwc-criterion-body-inner">
                          <div className="gwc-criterion-detail">
                            <p>{item.description}</p>
                            <div className="gwc-criterion-levels" role="list">
                              {item.levels.map((level) => {
                                const earned = Number(level.pts) === item.earned
                                return (
                                  <div
                                    key={level.pts}
                                    className="gwc-level"
                                    role="listitem"
                                    data-earned={earned ? 'true' : 'false'}
                                  >
                                    <span className="gwc-level-pts">{level.pts} pts</span>
                                    <span>
                                      {level.text}
                                      {earned ? (
                                        <span className="gwc-level-earned">Your rating</span>
                                      ) : null}
                                    </span>
                                  </div>
                                )
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </section>

            <section className="gwc-section" aria-labelledby={`${baseId}-feedback`}>
              <div className="gwc-section-head">
                <h2 className="gwc-section-title" id={`${baseId}-feedback`}>
                  Assignment Comments
                </h2>
              </div>
              <div className="gwc-feedback">
                <div className="gwc-feedback-meta">
                  <span className="gwc-feedback-from">Dr. Rivera</span>
                  <span className="gwc-feedback-date">Oct 10 at 2:14pm</span>
                </div>
                <p>
                  You identify the main claim clearly. For your next response, explain how one piece
                  of evidence supports that claim.
                </p>
              </div>
            </section>

            <section className="gwc-section" aria-labelledby={`${baseId}-dist`}>
              <div className="gwc-section-head">
                <h2 className="gwc-section-title" id={`${baseId}-dist`}>
                  Class Comparison
                </h2>
                <p className="gwc-section-desc">
                  Optional. Collapsed by default so feedback stays in focus.
                </p>
              </div>

              <div className="gwc-disclosure" data-open={distOpen ? 'true' : 'false'}>
                <button
                  type="button"
                  className="gwc-disclosure-toggle"
                  aria-expanded={distOpen}
                  aria-controls={`${baseId}-dist-panel`}
                  onClick={() => setDistOpen((v) => !v)}
                >
                  <span className="gwc-disclosure-label">
                    <strong>View class distribution</strong>
                    <span>Mean, median, high, and low for this assignment</span>
                  </span>
                  <Chevron className="gwc-disclosure-chevron" />
                </button>
                <div
                  className="gwc-disclosure-panel"
                  id={`${baseId}-dist-panel`}
                  role="region"
                  aria-hidden={!distOpen}
                >
                  <div className="gwc-disclosure-panel-inner">
                    <div className="gwc-dist">
                      <p className="gwc-dist-note">
                        These scores describe the class distribution; they do not explain individual
                        circumstances or measure learning by themselves.
                      </p>

                      <div
                        className="gwc-dist-chart"
                        role="img"
                        aria-label="Illustrative score distribution. Most scores fall between 7 and 8. Your score is in the 7 to 8 range."
                      >
                        {DISTRIBUTION.map((bar) => (
                          <div
                            key={bar.label}
                            className="gwc-bar"
                            data-you={bar.you ? 'true' : undefined}
                          >
                            <div
                              className="gwc-bar-fill"
                              style={{ height: `${bar.height}%` }}
                              title={bar.you ? `${bar.label} (your range)` : bar.label}
                            />
                            <span className="gwc-bar-label">{bar.label}</span>
                          </div>
                        ))}
                      </div>

                      <div className="gwc-dist-legend" aria-hidden="true">
                        <span className="gwc-legend-item">
                          <span className="gwc-legend-swatch" />
                          Class
                        </span>
                        <span className="gwc-legend-item">
                          <span className="gwc-legend-swatch gwc-legend-swatch--you" />
                          Your range (7–8)
                        </span>
                      </div>

                      <dl className="gwc-dist-stats">
                        <div className="gwc-stat">
                          <dt className="gwc-stat-label">Mean</dt>
                          <dd className="gwc-stat-value">7.4</dd>
                        </div>
                        <div className="gwc-stat">
                          <dt className="gwc-stat-label">Median</dt>
                          <dd className="gwc-stat-value">7.5</dd>
                        </div>
                        <div className="gwc-stat">
                          <dt className="gwc-stat-label">High</dt>
                          <dd className="gwc-stat-value">10</dd>
                        </div>
                        <div className="gwc-stat">
                          <dt className="gwc-stat-label">Low</dt>
                          <dd className="gwc-stat-value">3</dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="gwc-section" aria-labelledby={`${baseId}-pref`}>
              <h2 className="gwc-section-title" id={`${baseId}-pref`}>
                Notification Preferences
              </h2>
              <div className="gwc-pref">
                <div className="gwc-switch">
                  <input
                    id={`${baseId}-score-notif`}
                    type="checkbox"
                    checked={showScoreInNotifications}
                    onChange={(e) => setShowScoreInNotifications(e.target.checked)}
                    aria-describedby={`${baseId}-pref-help`}
                  />
                  <span className="gwc-switch-track" aria-hidden="true" />
                  <span className="gwc-switch-thumb" aria-hidden="true" />
                </div>
                <div className="gwc-pref-copy">
                  <label htmlFor={`${baseId}-score-notif`}>
                    <strong>Show score in notifications</strong>
                  </label>
                  <p id={`${baseId}-pref-help`}>
                    When off, you can still get a notice that feedback is ready—without seeing the
                    score until you open this page.
                  </p>
                </div>
              </div>
            </section>

            <section className="gwc-section" aria-labelledby={`${baseId}-next`}>
              <div className="gwc-next">
                <div className="gwc-section-head">
                  <h2 className="gwc-section-title" id={`${baseId}-next`}>
                    Your Next Step
                  </h2>
                  <p className="gwc-section-desc">Choose one so you leave with a clear action.</p>
                </div>

                <div className="gwc-options" role="radiogroup" aria-labelledby={`${baseId}-next`}>
                  {NEXT_STEPS.map((step) => {
                    const selected = nextStep === step.id
                    return (
                      <button
                        key={step.id}
                        type="button"
                        role="radio"
                        aria-checked={selected}
                        className="gwc-option"
                        data-selected={selected ? 'true' : 'false'}
                        onClick={() => setNextStep(step.id)}
                      >
                        <span className="gwc-option-radio" aria-hidden="true" />
                        <span className="gwc-option-text">{step.label}</span>
                      </button>
                    )
                  })}
                </div>

                {nextStep ? (
                  <p className="gwc-saved" role="status" key={savedFlash ? 'flash' : 'steady'}>
                    <CheckIcon />
                    Saved for this assignment.
                  </p>
                ) : null}
              </div>
            </section>

            <aside className="gwc-rationale" aria-label="Design rationale">
              <p className="gwc-rationale-label">Design note</p>
              <p>
                Scores are easier to interpret when students can see the criteria, feedback, and
                assignment goal together. Class statistics remain available by choice and are framed
                as comparison data.
              </p>
            </aside>
          </main>

          <footer className="gwc-footer">
            <p>
              Prototype for critique · Familiar LMS layout inspired by Canvas patterns · Not
              affiliated with Instructure · <Link to="/">Back to portfolio</Link>
            </p>
          </footer>
        </div>
      </div>
    </div>
  )
}
