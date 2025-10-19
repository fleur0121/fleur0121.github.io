import { useI18n } from '../contexts/I18nContext'
import { useTheme } from '../contexts/ThemeContext'
import { Moon, Sun, Languages } from 'lucide-react'
import React from 'react'

const TopBar: React.FC = () => {
  const { locale, toggleLocale } = useI18n()
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="topbar">
      <button className="topbar-btn" onClick={toggleLocale} aria-label="Toggle language">
        <Languages size={18} /> {locale.toUpperCase()}
      </button>
      <button className="topbar-btn" onClick={toggleTheme} aria-label="Toggle theme">
        {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
      </button>
    </div>
  )
}

export default TopBar
