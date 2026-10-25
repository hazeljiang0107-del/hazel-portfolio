import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const PROJECT_PATH = /^\/(?:classic\/)?projects\/[^/]+\/?$/
let lastProjectPath = ''

function clarityEvent(name) {
  if (typeof window.clarity === 'function') window.clarity('event', name)
}

function maskSensitive(root) {
  if (!(root instanceof Element)) return
  if (root.matches('a[href^="mailto:"], a[href^="tel:"]')) root.setAttribute('data-clarity-mask', 'true')
  root.querySelectorAll('a[href^="mailto:"], a[href^="tel:"]').forEach((el) => {
    el.setAttribute('data-clarity-mask', 'true')
  })
}

function classifyClick(anchor) {
  const href = anchor.getAttribute('href') || ''
  if (!href) return null
  if (href === '#contact' || href.endsWith('#contact')) return 'contact_click'
  if (href.startsWith('mailto:')) return 'contact_click'

  let url
  try {
    url = new URL(href, window.location.origin)
  } catch {
    return null
  }

  if (url.pathname.toLowerCase().endsWith('/resume.pdf')) return 'resume_click'
  if (url.hostname === 'www.linkedin.com' || url.hostname === 'linkedin.com') return 'contact_click'
  if (url.origin !== window.location.origin && (url.protocol === 'http:' || url.protocol === 'https:')) {
    return 'external_link_click'
  }
  return null
}

/**
 * One listener for Clarity custom events. Page views and UTM tags come from the
 * script in index.html, which follows History API route changes. No consent
 * banner exists in this site, so events are not gated on one.
 */
export default function ClarityEvents() {
  const { pathname } = useLocation()

  useEffect(() => {
    maskSensitive(document.body)
    const observer = new MutationObserver((records) => {
      records.forEach((record) => {
        record.addedNodes.forEach((node) => maskSensitive(node))
      })
    })
    observer.observe(document.body, { childList: true, subtree: true })
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!PROJECT_PATH.test(pathname) || lastProjectPath === pathname) return
    lastProjectPath = pathname
    clarityEvent('project_open')
  }, [pathname])

  useEffect(() => {
    const onClick = (event) => {
      const anchor = event.target instanceof Element ? event.target.closest('a[href]') : null
      if (!anchor) return
      const name = classifyClick(anchor)
      if (name) clarityEvent(name)
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  return null
}
