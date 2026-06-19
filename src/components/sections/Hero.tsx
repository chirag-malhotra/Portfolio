import React, { useState, useEffect, useRef } from 'react'
import { useI18n } from '../../i18n/I18nContext'
import './Hero.scss'

const Hero: React.FC = () => {
  const { t, tRaw, locale } = useI18n()  // ← also pull locale

  const [currentRoleIndex, setCurrentRoleIndex] = useState(0)
  const [currentText, setCurrentText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [typingSpeed, setTypingSpeed] = useState(150)

  // Use a ref so the typewriter always reads the latest roles
  // without needing to be in the dependency array
  
  const rolesRef = useRef<string[]>([])
  const maybeRoles = tRaw('hero.roles')
  rolesRef.current = Array.isArray(maybeRoles)
    ? maybeRoles
    : ['Frontend Developer', 'React & TypeScript Specialist', 'Problem Solver']

  // Reset typewriter when language changes
  useEffect(() => {
    setCurrentRoleIndex(0)
    setCurrentText('')
    setIsDeleting(false)
    setTypingSpeed(150)
  }, [locale])

  useEffect(() => {
    const roles = rolesRef.current
    if (!roles?.length) return  // guard: don't run if roles aren't loaded yet

    const handleType = () => {
      const fullText = roles[currentRoleIndex] ?? ''

      if (!isDeleting) {
        setCurrentText(fullText.substring(0, currentText.length + 1))
        setTypingSpeed(100)

        if (currentText === fullText) {
          setTypingSpeed(2000)
          setIsDeleting(true)
        }
      } else {
        setCurrentText(fullText.substring(0, currentText.length - 1))
        setTypingSpeed(50)

        if (currentText === '') {
          setIsDeleting(false)
          setCurrentRoleIndex((prev) => (prev + 1) % roles.length)
          setTypingSpeed(500)
        }
      }
    }

    const timer = setTimeout(handleType, typingSpeed)
    return () => clearTimeout(timer)
  }, [currentText, isDeleting, currentRoleIndex, typingSpeed])

  return (
    <section id="hero" className="hero-section">
      <div className="section-container hero-grid">

        <div className="hero-info animate-float">
          <div className="status-badge">
            <span className="pulse-dot"></span>
            {t('hero.location')}
          </div>

          <h1 className="hero-name">
            {t('hero.greeting')} <span className="gradient-text">{t('hero.name')}</span>
          </h1>

          <div className="typewriter-container">
            <span className="typewriter-label">const role = </span>
            <span className="typewriter-text">"{currentText}"</span>
            <span className="cursor">|</span>
          </div>

          <p className="hero-lead">
            {t('summary.content').substring(0, 180)}...
          </p>

          <div className="hero-ctas">
            <a href="#contact" className="cta-btn primary-btn">
              {t('hero.cta.connect')}
            </a>
            <a href="#experience" className="cta-btn secondary-btn">
              {t('hero.cta.work')}
            </a>
          </div>
        </div>

        <div className="hero-visual glass-panel">
          <div className="editor-header">
            <div className="editor-actions">
              <span></span><span></span><span></span>
            </div>
            <div className="editor-tab">developer.tsx</div>
          </div>
          <div className="editor-body">
            <pre><code>
              <span className="code-keyword">import</span> React <span className="code-keyword">from</span> <span className="code-string">'react'</span>;<br />
              <span className="code-keyword">import</span> &#123; Developer &#125; <span className="code-keyword">from</span> <span className="code-string">'@core/dev'</span>;<br /><br />
              <span className="code-keyword">const</span> Chirag: React.FC = () =&gt; &#123;<br />
              &nbsp;&nbsp;<span className="code-keyword">return</span> (<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="code-tag">Developer</span><br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-prop">name</span>=<span className="code-string">"{t('hero.name')}"</span><br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-prop">exp</span>=&#123;<span className="code-number">5.5</span>&#125;<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-prop">skills</span>=&#123;[<span className="code-string">'React'</span>, <span className="code-string">'TS'</span>, <span className="code-string">'Redux'</span>]&#125;<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-prop">passionate</span>=&#123;<span className="code-boolean">true</span>&#125;<br />
              &nbsp;&nbsp;&nbsp;&nbsp;/&gt;<br />
              &nbsp;&nbsp;);<br />
              &#125;;<br /><br />
              <span className="code-keyword">export default</span> Chirag;
            </code></pre>
          </div>
        </div>

      </div>
    </section>
  )
}

export default Hero