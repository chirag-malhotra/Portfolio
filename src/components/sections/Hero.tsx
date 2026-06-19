import React from 'react'
import { useI18n } from '../../i18n/I18nContext'
import './Hero.scss'

const Hero: React.FC = () => {
  const { t } = useI18n()

  return (
    <section id="hero" className="hero">
      <div className="hero-container">
        <h1 className="hero-name">{t('hero.name')}</h1>
        <p className="hero-title">{t('hero.title')}</p>
        <p className="hero-location">{t('hero.location')}</p>
        <div className="hero-contact">
          <a href={`mailto:${t('hero.email')}`} className="contact-link">
            {t('hero.email')}
          </a>
          <span className="separator">•</span>
          <a href={`tel:${t('hero.phone')}`} className="contact-link">
            {t('hero.phone')}
          </a>
          <span className="separator">•</span>
          <a href="https://linkedin.com/in/chiragmalhotra" target="_blank" rel="noopener noreferrer" className="contact-link">
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  )
}

export default Hero
