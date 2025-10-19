import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

type Theme = 'light' | 'dark'

interface ThemeContextValue {
  theme: Theme
  toggleTheme: () => void
  setTheme: (t: Theme) => void
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

const THEME_KEY = 'theme'

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const getInitialTheme = (): Theme => {
    if (typeof window === 'undefined') return 'light'
    const stored = (localStorage.getItem(THEME_KEY) as Theme | null)
    if (stored === 'light' || stored === 'dark') return stored
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    return prefersDark ? 'dark' : 'light'
  }

  const [theme, setThemeState] = useState<Theme>(getInitialTheme)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    localStorage.setItem(THEME_KEY, theme)
  }, [theme])

  const value = useMemo<ThemeContextValue>(() => ({
    theme,
    toggleTheme: () => setThemeState((t) => (t === 'light' ? 'dark' : 'light')),
    setTheme: (t: Theme) => setThemeState(t),
  }), [theme])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export const useTheme = () => {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
