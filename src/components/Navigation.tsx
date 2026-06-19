import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleTheme } from '../features/theme/themeSlice'
import { useI18n } from '../i18n/I18nContext'
import { RootState } from '../store'
import './Navigation.scss'

const Navigation: React.FC = () => {
  const dispatch = useDispatch()
  const { locale, setLocale } = useI18n()
  const theme = useSelector((state: RootState) => state.theme.mode)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLocale(event.target.value as 'en' | 'es')
  }

  const handleThemeToggle = () => {
    dispatch(toggleTheme())
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleNavClick = () => {
    setIsMenuOpen(false)
  }

  return (
    <nav className="navigation">
      <div className="nav-container">
        <div className="nav-logo">
          <a href="#hero">CM</a>
        </div>
        <ul className={`nav-sections ${isMenuOpen ? 'active' : ''}`}>
          <li><a href="#summary" onClick={handleNavClick}>Summary</a></li>
          <li><a href="#skills" onClick={handleNavClick}>Skills</a></li>
          <li><a href="#experience" onClick={handleNavClick}>Experience</a></li>
          <li><a href="#contact" onClick={handleNavClick}>Contact</a></li>
        </ul>
        <div className="nav-controls">
          <button
            className="theme-toggle"
            onClick={handleThemeToggle}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            title={`${theme === 'light' ? 'Dark' : 'Light'} mode`}
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
          <select
            className="language-switcher"
            value={locale}
            onChange={handleLanguageChange}
            aria-label="Select language"
          >
            <option value="en">English</option>
            <option value="es">Español</option>
            <option value="de">Deutsch</option>
            <option value="nl">Nederlands</option>
          </select>
          <button
            className="hamburger-menu"
            onClick={toggleMenu}
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
