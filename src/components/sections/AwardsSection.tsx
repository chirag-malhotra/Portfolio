import React from 'react'
import { useI18n } from '../../i18n/I18nContext'
import './AwardsSection.scss'

interface Award {
  year: string
  title: string
  description: string
}

const AwardsSection: React.FC = () => {
  const { t, tRaw } = useI18n()

  const awardItems: Award[] = tRaw('awards.list') || []

  return (
    <section id="awards" className="awards">
      <div className="section-container">
        <h2 className="section-title">{t('awards.title')}</h2>
        <div className="awards-list">
          {awardItems.map((award: Award, index: number) => (
            <div key={index} className="award-item">
              <p className="year">{award.year}</p>
              <h3>{award.title}</h3>
              <p className="description">{award.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default AwardsSection
