import { useEffect, useRef, type ReactNode } from 'react'
import { Icon } from './Icons'

interface ModalProps {
  open: boolean
  onClose: () => void
  title?: string
  subtitle?: string
  children: ReactNode
  size?: 'sm' | 'md' | 'lg'
  labelledBy?: string
}

export function Modal({ open, onClose, title, subtitle, children, size = 'md', labelledBy }: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  const previouslyFocused = useRef<Element | null>(null)

  useEffect(() => {
    if (!open) return
    previouslyFocused.current = document.activeElement

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'Tab' && panelRef.current) {
        const focusable = panelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])',
        )
        if (focusable.length === 0) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener('keydown', onKey)
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'
    window.setTimeout(() => {
      const target = panelRef.current?.querySelector<HTMLElement>('input, button, select, textarea')
      target?.focus()
    }, 60)

    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = overflow
      ;(previouslyFocused.current as HTMLElement | null)?.focus?.()
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="modal-overlay" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div
        className={`modal-panel modal-${size}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        ref={panelRef}
      >
        {(title || subtitle) && (
          <div className="modal-head">
            <div>
              {title && (
                <h3 className="modal-title" id={labelledBy}>
                  {title}
                </h3>
              )}
              {subtitle && <p className="modal-sub">{subtitle}</p>}
            </div>
            <button className="modal-close" onClick={onClose} aria-label="Close dialog">
              <Icon name="close" size={20} />
            </button>
          </div>
        )}
        {!title && (
          <button className="modal-close modal-close-float" onClick={onClose} aria-label="Close dialog">
            <Icon name="close" size={20} />
          </button>
        )}
        <div className="modal-body">{children}</div>
      </div>
    </div>
  )
}
