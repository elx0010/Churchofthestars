import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual'
}

export default function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    // Section links like /#calendar should still scroll to their section
    if (hash && document.querySelector(hash)) return
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname, hash])

  return null
}
