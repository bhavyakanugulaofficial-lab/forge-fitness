import { createElement, useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'

interface RevealProps {
  children: ReactNode
  delay?: number
  className?: string
  style?: CSSProperties
  as?: 'div' | 'section' | 'li' | 'article'
}

const TAGS = { div: 'div', section: 'section', li: 'li', article: 'article' } as const

/**
 * Adds `.reveal` (hidden + shifted) and flips to `.is-visible` when the
 * element scrolls into view. Respects prefers-reduced-motion.
 */
export function Reveal({ children, delay = 0, className = '', style, as = 'div' }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true)
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true)
            io.disconnect()
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -6% 0px' },
    )
    io.observe(node)
    return () => io.disconnect()
  }, [])

  return createElement(
    TAGS[as],
    {
      ref,
      className: `reveal ${visible ? 'is-visible' : ''} ${className}`.trim(),
      style: { ...style, transitionDelay: `${delay}ms` },
    },
    children,
  )
}
