import React from 'react'
import { useI18n } from '../../i18n/I18nContext'
import './ExperienceSection.scss'

interface ExperienceJob {
  position: string
  company: string
  duration: string
  highlights: string[]
}

const ExperienceSection: React.FC = () => {
  const { t, tRaw } = useI18n()

  const experienceItems: ExperienceJob[] = tRaw('experience.jobs') || []

  return (
    <section id="experience" className="experience">
      <div className="section-container">
        <h2 className="section-title">{t('experience.title')}</h2>
        <div className="timeline">
          {experienceItems.map((item: ExperienceJob, index: number) => (
            <div key={index} className="timeline-item">
              <div className="timeline-content">
                <h3 className="job-title">{item.position}</h3>
                <p className="company">{item.company}</p>
                <p className="duration">{item.duration}</p>
                <ul className="highlights">
                  {item.highlights.map((highlight: string, i: number) => (
                    <li key={i}>{highlight}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ExperienceSection
