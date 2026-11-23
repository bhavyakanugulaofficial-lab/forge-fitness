import { useEffect, useState } from 'react'
import { LanguageProvider } from './i18n/LanguageContext'
import { ToastProvider } from './components/Toast'
import { UiProvider, useUi } from './components/UiContext'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { Marquee } from './components/Marquee'
import { About } from './components/About'
import { Programs } from './components/Programs'
import { ProgramModal } from './components/ProgramModal'
import { Trainers } from './components/Trainers'
import { TrainerModal } from './components/TrainerModal'
import { Membership } from './components/Membership'
import { Facilities } from './components/Facilities'
import { Schedule } from './components/Schedule'
import { Assessment } from './components/Assessment'
import { Register } from './components/Register'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { Icon } from './components/Icons'
import { useLang } from './i18n/LanguageContext'

function BackToTop() {
  const { t } = useLang()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 700)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <button
      className={`back-to-top ${visible ? 'is-visible' : ''}`}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label={t.common.backToTop}
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
    >
      <Icon name="arrowUp" size={18} />
    </button>
  )
}

function Shell() {
  const { trainerModal, programModal, closeModals } = useUi()

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <Marquee />
        <About />
        <Programs />
        <Trainers />
        <Membership />
        <Facilities />
        <Schedule />
        <Assessment />
        <Register />
        <Contact />
      </main>
      <Footer />
      <ProgramModal id={programModal} onClose={closeModals} />
      <TrainerModal id={trainerModal} onClose={closeModals} />
      <BackToTop />
    </>
  )
}

export default function App() {
  return (
    <LanguageProvider>
      <ToastProvider>
        <UiProvider>
          <Shell />
        </UiProvider>
      </ToastProvider>
    </LanguageProvider>
  )
}
