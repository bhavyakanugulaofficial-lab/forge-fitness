export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/
export const MOBILE_RE = /^[6-9]\d{9}$/

/** Strips spaces, dashes and the +91 / 0 prefix from a typed phone number. */
export const normaliseMobile = (raw: string): string =>
  raw.replace(/[\s-]/g, '').replace(/^\+?91/, '').replace(/^0/, '')

export const isEmail = (value: string): boolean => EMAIL_RE.test(value.trim())
export const isMobile = (value: string): boolean => MOBILE_RE.test(normaliseMobile(value))

export const isName = (value: string): boolean => value.trim().length >= 3

export const isAge = (value: string): boolean => {
  const n = Number(value)
  return Number.isInteger(n) && n >= 13 && n <= 90
}
