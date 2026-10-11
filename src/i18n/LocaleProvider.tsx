import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { messages, type Locale } from './messages.ts'

const STORAGE_KEY = 'daily-club-locale'

type LocaleContextValue = {
  locale: Locale
  setLocale: (locale: Locale) => void
  messages: (typeof messages)[Locale]
  formatPrice: (amount: number) => string
}

const LocaleContext = createContext<LocaleContextValue | null>(null)

function readLocale(): Locale {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'en' ? 'en' : 'es'
  } catch {
    return 'es'
  }
}

function formatPrice(locale: Locale, amount: number) {
  return new Intl.NumberFormat(locale === 'es' ? 'es-MX' : 'en-US', {
    style: 'currency',
    currency: 'MXN',
    currencyDisplay: 'code',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(() => {
    const initial = readLocale()
    document.documentElement.lang = initial
    return initial
  })

  useEffect(() => {
    document.documentElement.lang = locale
    try {
      localStorage.setItem(STORAGE_KEY, locale)
    } catch {
      // The page still switches language if storage is unavailable.
    }
  }, [locale])

  const value = useMemo<LocaleContextValue>(
    () => ({
      locale,
      setLocale,
      messages: messages[locale],
      formatPrice: (amount) => formatPrice(locale, amount),
    }),
    [locale],
  )

  return <LocaleContext value={value}>{children}</LocaleContext>
}

export function useLocale() {
  const value = useContext(LocaleContext)
  if (!value) throw new Error('useLocale must be used within LocaleProvider')
  return value
}
