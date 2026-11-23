import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { translations, LANGS, DEFAULT_LANG, type Lang, type Dict } from './translations'

interface LanguageContextValue {
  lang: Lang
  setLang: (lang: Lang) => void
  t: Dict
  langs: typeof LANGS
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

const STORAGE_KEY = 'forge-lang'

const readInitial = (): Lang => {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    if (saved === 'en' || saved === 'te' || saved === 'hi' || saved === 'ta') return saved
  } catch {
    /* private mode — ignore */
  }
  return DEFAULT_LANG
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(readInitial)

  const setLang = useCallback((next: Lang) => {
    setLangState(next)
    try {
      window.localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* ignore */
    }
  }, [])

  useEffect(() => {
    document.documentElement.lang = lang
    document.title = translations[lang].meta.title
    const desc = document.querySelector('meta[name="description"]')
    if (desc) desc.setAttribute('content', translations[lang].meta.description)
  }, [lang])

  const value = useMemo<LanguageContextValue>(
    () => ({ lang, setLang, t: translations[lang], langs: LANGS }),
    [lang, setLang],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLang(): LanguageContextValue {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLang must be used inside <LanguageProvider>')
  return ctx
}
