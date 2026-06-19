import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import en from './translations/en.json'
import es from './translations/es.json'
import de from './translations/de.json'
import nl from './translations/nl.json'

export type Locale = 'en' | 'es' | 'de' | 'nl'

const translations: Record<Locale, typeof en> = { en, es, de, nl }

interface I18nContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: string, defaultValue?: string) => string
  tRaw: (key: string) => any
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

export const I18nProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [locale, setLocaleState] = useState<Locale>(() => {
    const stored = localStorage.getItem('locale') as Locale | null
    return stored || 'en'
  })

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale)
    localStorage.setItem('locale', newLocale)
  }

  const tRaw = useCallback((key: string): any => {
    const keys = key.split('.')
    let value: any = translations[locale]
    for (const k of keys) {
      value = value?.[k]
    }
    return value
  }, [locale])  // ← recreates when locale changes

  const t = useCallback((key: string, defaultValue: string = key): string => {
    const value = tRaw(key)
    return typeof value === 'string' ? value : defaultValue
  }, [tRaw])  // ← recreates when tRaw changes

  return (
    <I18nContext.Provider value={{ locale, setLocale, t, tRaw }}>
      {children}
    </I18nContext.Provider>
  )
}

export const useI18n = () => {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error('useI18n must be used within I18nProvider')
  }
  return context
}