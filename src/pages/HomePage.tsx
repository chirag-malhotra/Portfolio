import React from 'react'
import Hero from '../components/sections/Hero'
import Summary from '../components/sections/Summary'
import SkillsSection from '../components/sections/SkillsSection'
import ExperienceSection from '../components/sections/ExperienceSection'
import EducationSection from '../components/sections/EducationSection'
import CertificationsSection from '../components/sections/CertificationsSection'
import AwardsSection from '../components/sections/AwardsSection'
import ContactSection from '../components/sections/ContactSection'

const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <Summary />
      <SkillsSection />
      <ExperienceSection />
      <EducationSection />
      <CertificationsSection />
      <AwardsSection />
      <ContactSection />
    </>
  )
}

export default HomePage
