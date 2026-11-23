export const prefersReducedMotion = (): boolean =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** Smooth-scrolls to a section, compensating for the fixed header. */
export const scrollToId = (id: string): void => {
  const el = document.getElementById(id)
  if (!el) return
  const top = el.getBoundingClientRect().top + window.scrollY - 78
  window.scrollTo({ top: Math.max(0, top), behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
  window.setTimeout(() => {
    el.setAttribute('tabindex', '-1')
    el.focus({ preventScroll: true })
  }, 600)
}
