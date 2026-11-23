import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'
import { Icon } from './Icons'

type ToastType = 'success' | 'error' | 'info'

interface ToastItem {
  id: number
  message: string
  type: ToastType
}

interface ToastContextValue {
  toast: (message: string, type?: ToastType) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)
let counter = 0

export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([])

  const dismiss = useCallback((id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }, [])

  const toast = useCallback(
    (message: string, type: ToastType = 'success') => {
      const id = ++counter
      setItems((prev) => [...prev.slice(-2), { id, message, type }])
      window.setTimeout(() => dismiss(id), 4600)
    },
    [dismiss],
  )

  const value = useMemo(() => ({ toast }), [toast])

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="toast-stack" role="status" aria-live="polite">
        {items.map((item) => (
          <div key={item.id} className={`toast toast-${item.type}`}>
            <span className="toast-icon">
              <Icon name={item.type === 'success' ? 'check' : item.type === 'error' ? 'info' : 'info'} size={18} />
            </span>
            <span className="toast-message">{item.message}</span>
            <button className="toast-close" onClick={() => dismiss(item.id)} aria-label="Dismiss">
              <Icon name="close" size={14} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used inside <ToastProvider>')
  return ctx
}
