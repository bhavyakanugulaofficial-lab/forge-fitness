import { en } from './en'
import { te } from './te'
import { hi } from './hi'
import { ta } from './ta'

export type Lang = 'en' | 'te' | 'hi' | 'ta'
export type { Dict } from './en'

export const LANGS: { code: Lang; label: string; native: string; dir: 'ltr' }[] = [
  { code: 'en', label: 'English', native: 'English', dir: 'ltr' },
  { code: 'te', label: 'Telugu', native: 'తెలుగు', dir: 'ltr' },
  { code: 'hi', label: 'Hindi', native: 'हिन्दी', dir: 'ltr' },
  { code: 'ta', label: 'Tamil', native: 'தமிழ்', dir: 'ltr' },
]

export const translations: Record<Lang, typeof en> = { en, te, hi, ta }

export const DEFAULT_LANG: Lang = 'en'
