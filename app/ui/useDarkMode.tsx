import { useEffect, useState } from 'react'

function useDarkMode() {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      // Retrieve theme from localStorage, default to 'dark'
      return localStorage.getItem('theme') || 'dark'
    }
    return 'dark'
  })

  const colorTheme = theme === 'dark' ? 'light' : 'dark'

  useEffect(() => {
    const root = window.document.documentElement

    root.classList.remove(colorTheme)
    root.classList.add(theme)

    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', theme)
    }
  }, [theme, colorTheme]) // Included colorTheme for clarity

  return [colorTheme, setTheme] as const
}

export default useDarkMode
