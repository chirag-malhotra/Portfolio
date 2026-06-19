import React, { useState, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleTheme } from '../features/theme/themeSlice'
import { useI18n } from '../i18n/I18nContext'
import { RootState } from '../store'
import './Navigation.scss'

interface NavigationProps {
  onOpenTerminal: () => void
}

const LANGUAGES = [
  { code: 'en', label: 'EN', full: 'English' },
  { code: 'es', label: 'ES', full: 'Español' },
  { code: 'de', label: 'DE', full: 'Deutsch' },
  { code: 'nl', label: 'NL', full: 'Nederlands' },
]

const Navigation: React.FC<NavigationProps> = ({ onOpenTerminal }) => {
  const dispatch = useDispatch()
  const { t, locale, setLocale } = useI18n()
  const theme = useSelector((state: RootState) => state.theme.mode)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLangOpen, setIsLangOpen] = useState(false)
  const langRef = useRef<HTMLDivElement>(null)

  const currentLang = LANGUAGES.find(l => l.code === locale) || LANGUAGES[0]

  // Close lang dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setIsLangOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <nav className="navigation glass-panel">
      <div className="nav-container">
        <div className="nav-logo">
          <a href="#hero" className="logo-text">CM</a>
        </div>

        <ul className={`nav-sections ${isMenuOpen ? 'active' : ''}`}>
          <li><a href="#summary" onClick={() => setIsMenuOpen(false)}>{t('nav.summary')}</a></li>
          <li><a href="#skills" onClick={() => setIsMenuOpen(false)}>{t('nav.skills')}</a></li>
          <li><a href="#experience" onClick={() => setIsMenuOpen(false)}>{t('nav.experience')}</a></li>
          <li><a href="#contact" onClick={() => setIsMenuOpen(false)}>{t('nav.contact')}</a></li>
        </ul>

        <div className="nav-controls">
          <button
            className="nav-control-btn terminal-btn"
            onClick={onOpenTerminal}
            aria-label="Open Terminal Console"
            title="Open Interactive Terminal"
          >
            <span>&gt;_</span>
          </button>

          <button
            className="nav-control-btn theme-toggle"
            onClick={() => dispatch(toggleTheme())}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>

          {/* Custom language dropdown */}
          <div className="lang-switcher" ref={langRef}>
            <button
              className={`lang-trigger nav-control-btn ${isLangOpen ? 'active' : ''}`}
              onClick={() => setIsLangOpen(prev => !prev)}
              aria-label="Select language"
              aria-expanded={isLangOpen}
            >
              <span className="lang-globe">🌐</span>
              <span className="lang-code">{currentLang.label}</span>
              <span className={`lang-chevron ${isLangOpen ? 'open' : ''}`}>▾</span>
            </button>

            {isLangOpen && (
              <ul className="lang-dropdown" role="listbox">
                {LANGUAGES.map(lang => (
                  <li
                    key={lang.code}
                    role="option"
                    aria-selected={locale === lang.code}
                    className={locale === lang.code ? 'active' : ''}
                    onClick={() => {
                      setLocale(lang.code as 'en' | 'es' | 'de' | 'nl')
                      setIsLangOpen(false)
                    }}
                  >
                    <span className="lang-option-code">{lang.label}</span>
                    <span className="lang-option-full">{lang.full}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <button
            className="hamburger-menu"
            onClick={() => setIsMenuOpen(prev => !prev)}
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navigation