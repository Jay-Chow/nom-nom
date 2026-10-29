import { useEffect, useState } from 'react'
import styles from './ThemeToggle.module.css'

const STORAGE_KEY = 'nom-nom-theme'

function readStoredTheme() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored === 'light' || stored === 'dark' ? stored : null
  } catch {
    return null
  }
}

function ThemeToggle() {
  // index.html sets data-theme before first paint, so start from that
  const [theme, setTheme] = useState(() =>
    document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light',
  )

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  // Keep following the system setting until the user picks a theme explicitly
  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)')

    function handleChange(event) {
      if (readStoredTheme()) return
      setTheme(event.matches ? 'dark' : 'light')
    }

    media.addEventListener('change', handleChange)
    return () => media.removeEventListener('change', handleChange)
  }, [])

  function handleToggle() {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // storage unavailable, the choice just won't persist
    }
  }

  const label = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'

  return (
    <button
      type="button"
      className={styles.toggle}
      onClick={handleToggle}
      aria-label={label}
      title={label}
    >
      {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
    </button>
  )
}

function SunIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  )
}

export default ThemeToggle
