import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useI18n } from '../../i18n/I18nContext'
import { toggleCategory } from '../../features/skillFilter/skillFilterSlice'
import { RootState } from '../../store'
import type { SkillCategory } from '../../features/skillFilter/skillFilterSlice'
import './SkillsSection.scss'

const SkillsSection: React.FC = () => {
  const { t } = useI18n()
  const dispatch = useDispatch()
  const selectedCategories = useSelector((state: RootState) => state.skillFilter.selectedCategories)

  const categories: SkillCategory[] = ['all', 'frontend', 'frameworks', 'testing', 'collaboration', 'backend']

  const getSkillsForDisplay = (): string[] => {
    if (selectedCategories.includes('all')) {
      return [
        ...t('skills.items.frontend').split(', '),
        ...t('skills.items.frameworks').split(', '),
        ...t('skills.items.testing').split(', '),
        ...t('skills.items.collaboration').split(', '),
        ...t('skills.items.backend').split(', '),
      ]
    }
    let skills: string[] = []
    selectedCategories.forEach((cat) => {
      if (cat !== 'all') {
        const categorySkills = t(`skills.items.${cat}`)
        skills = [...skills, ...categorySkills.split(', ')]
      }
    })
    return skills
  }

  const handleCategoryClick = (category: SkillCategory) => {
    dispatch(toggleCategory(category))
  }

  return (
    <section id="skills" className="skills">
      <div className="section-container">
        <h2 className="section-title">{t('skills.title')}</h2>
        
        <div className="skill-categories">
          {categories.map((category) => (
            <button
              key={category}
              className={`category-btn ${selectedCategories.includes(category) ? 'active' : ''}`}
              onClick={() => handleCategoryClick(category)}
            >
              {t(`skills.categories.${category}`)}
            </button>
          ))}
        </div>

        <div className="skills-grid">
          {getSkillsForDisplay().map((skill, index) => (
            <div key={index} className="skill-tag">
              {skill}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SkillsSection
