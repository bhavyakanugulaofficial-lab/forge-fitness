import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'
import { scrollToId } from '../lib/scroll'

export interface RegisterPrefill {
  plan?: string
  trainer?: string
  schedule?: string
  goals?: string
}

interface UiContextValue {
  /** Opens the registration section, optionally pre-filling fields. */
  goToRegister: (prefill?: RegisterPrefill) => void
  prefill: RegisterPrefill
  clearPrefill: () => void
  openTrainer: (id: string) => void
  openProgram: (id: string) => void
  trainerModal: string | null
  programModal: string | null
  closeModals: () => void
}

const UiContext = createContext<UiContextValue | null>(null)

export function UiProvider({ children }: { children: ReactNode }) {
  const [prefill, setPrefill] = useState<RegisterPrefill>({})
  const [trainerModal, setTrainerModal] = useState<string | null>(null)
  const [programModal, setProgramModal] = useState<string | null>(null)

  const goToRegister = useCallback((next?: RegisterPrefill) => {
    if (next) setPrefill(next)
    scrollToId('register')
  }, [])

  const clearPrefill = useCallback(() => setPrefill({}), [])

  const value = useMemo<UiContextValue>(
    () => ({
      goToRegister,
      prefill,
      clearPrefill,
      openTrainer: setTrainerModal,
      openProgram: setProgramModal,
      trainerModal,
      programModal,
      closeModals: () => {
        setTrainerModal(null)
        setProgramModal(null)
      },
    }),
    [goToRegister, prefill, clearPrefill, trainerModal, programModal],
  )

  return <UiContext.Provider value={value}>{children}</UiContext.Provider>
}

export function useUi(): UiContextValue {
  const ctx = useContext(UiContext)
  if (!ctx) throw new Error('useUi must be used inside <UiProvider>')
  return ctx
}
