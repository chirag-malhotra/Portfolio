import React from 'react'
import { useI18n } from '../../i18n/I18nContext'
import './CertificationsSection.scss'

const CertificationsSection: React.FC = () => {
  const { t, tRaw } = useI18n()

  const certificationItems: string[] = tRaw('certifications.certs') || []

  return (
    <section id="certifications" className="certifications">
      <div className="section-container">
        <h2 className="section-title">{t('certifications.title')}</h2>
        <ul className="certifications-list">
          {certificationItems.map((cert: string, index: number) => (
            <li key={index}>{cert}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default CertificationsSection
