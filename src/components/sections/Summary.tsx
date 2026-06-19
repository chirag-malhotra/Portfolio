import React from 'react'
import { useI18n } from '../../i18n/I18nContext'
import './Summary.scss'

const Summary: React.FC = () => {
  const { t } = useI18n()

  return (
    <section id="summary" className="summary">
      <div className="section-container">
        <h2 className="section-title">{t('summary.title')}</h2>
        <p className="summary-text">{t('summary.content')}</p>
      </div>
    </section>
  )
}

export default Summary
