import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'

if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual'
}

export default function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useLayoutEffect(() => {
    // Section links like /#calendar should still scroll to their section
    if (hash && document.querySelector(hash)) return

    // The page uses smooth scrolling, which can cancel or delay the jump on mobile
    const root = document.documentElement
    const previous = root.style.scrollBehavior
    root.style.scrollBehavior = 'auto'
    window.scrollTo(0, 0)
    root.scrollTop = 0
    document.body.scrollTop = 0
    root.style.scrollBehavior = previous
  }, [pathname, hash])

  return null
}
