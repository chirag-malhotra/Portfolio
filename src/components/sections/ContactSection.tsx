import React from 'react'
import emailjs from '@emailjs/browser'
import { useDispatch, useSelector } from 'react-redux'
import { useI18n } from '../../i18n/I18nContext'
import { setField, setErrors, setStatus, setSubmitMessage, resetForm } from '../../features/contactForm/contactFormSlice'
import { RootState } from '../../store'
import './ContactSection.scss'

const ContactSection: React.FC = () => {
  const { t } = useI18n()
  const dispatch = useDispatch()
  const { name, email, message, errors, status } = useSelector((state: RootState) => state.contactForm)

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}
    if (!name.trim()) newErrors.name = t('contact.form.validationErrors.nameRequired')
    if (!email.trim()) newErrors.email = t('contact.form.validationErrors.emailRequired')
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = t('contact.form.validationErrors.emailInvalid')
    if (!message.trim()) newErrors.message = t('contact.form.validationErrors.messageRequired')

    dispatch(setErrors(newErrors))
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!validateForm()) return

        dispatch(setStatus('sending'))

        try {
            await emailjs.send(
            import.meta.env.VITE_EMAILJS_SERVICE_ID,
            import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
            {
                from_name: name,
                from_email: email,
                message,
                time: new Date().toLocaleString(),
            },
            import.meta.env.VITE_EMAILJS_PUBLIC_KEY
            )

            dispatch(setStatus('success'))
            dispatch(setSubmitMessage(t('contact.form.successMessage')))

            setTimeout(() => dispatch(resetForm()), 3000)
        } catch (err) {
            dispatch(setStatus('error'))
            dispatch(setSubmitMessage(t('contact.form.errorMessage')))
        }
    }

  return (
    <section id="contact" className="contact">
      <div className="section-container">
        <h2 className="section-title">{t('contact.title')}</h2>
        <p className="contact-description">{t('contact.description')}</p>

        <form className="contact-form" onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="name">{t('contact.form.name')}</label>
            <input
              id="name"
              type="text"
              placeholder={t('contact.form.namePlaceholder')}
              value={name}
              onChange={(e) => dispatch(setField({ field: 'name', value: e.target.value }))}
              className={errors.name ? 'error' : ''}
              required
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">{t('contact.form.email')}</label>
            <input
              id="email"
              type="email"
              placeholder={t('contact.form.emailPlaceholder')}
              value={email}
              onChange={(e) => dispatch(setField({ field: 'email', value: e.target.value }))}
              className={errors.email ? 'error' : ''}
              required
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="message">{t('contact.form.message')}</label>
            <textarea
              id="message"
              placeholder={t('contact.form.messagePlaceholder')}
              value={message}
              onChange={(e) => dispatch(setField({ field: 'message', value: e.target.value }))}
              className={errors.message ? 'error' : ''}
              required
            />
            {errors.message && <span className="error-message">{errors.message}</span>}
          </div>

          <button type="submit" className="submit-btn" disabled={status === 'sending'}>
            {status === 'sending' ? t('contact.form.sending') : t('contact.form.submit')}
          </button>

          {(status === 'success' || status === 'error') && (
            <div className={`message ${status}`}>
              {status === 'success' ? t('contact.form.successMessage') : t('contact.form.errorMessage')}
            </div>
          )}
        </form>

        <p className="contact-links">{t('contact.links')}</p>
        <div className="social-links">
          <a href="mailto:chiragmalhotra3098@gmail.com" className="social-link">{t('contact.social.email')}</a>
          <a href="https://www.linkedin.com/in/chirag-malhotra-383414167" target="_blank" rel="noopener noreferrer" className="social-link">LinkedIn</a>
          <a href="https://github.com/chirag-malhotra" target="_blank" rel="noopener noreferrer" className="social-link">GitHub</a>
        </div>
      </div>
    </section>
  )
}

export default ContactSection