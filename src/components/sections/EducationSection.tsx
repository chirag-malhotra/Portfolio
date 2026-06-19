import React from 'react'
import { useI18n } from '../../i18n/I18nContext'
import './EducationSection.scss'

interface EducationItem {
  degree: string
  percentage: string
  duration: string
  institution: string
}

const EducationSection: React.FC = () => {
  const { t, tRaw } = useI18n()

  const educationItems: EducationItem[] = tRaw('education.schools') || []

  return (
    <section id="education" className="education">
      <div className="section-container">
        <h2 className="section-title">{t('education.title')}</h2>
        <div className="education-list">
          {educationItems.map((item: EducationItem, index: number) => (
            <div key={index} className="education-item">
              <h3>{item.degree}</h3>
              <p className="institution">{item.institution}</p>
              <p className="meta">{item.duration} • {item.percentage}%</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default EducationSection
