import { useEffect, useRef, useState } from 'react'
import { Icon, Logo } from './Icons'
import { useLang } from '../i18n/LanguageContext'
import { scrollToId } from '../lib/scroll'
import type { Lang } from '../i18n/translations'

const ITEMS = ['about', 'programs', 'trainers', 'membership', 'facilities', 'schedule', 'assess', 'contact'] as const

type ItemKey = (typeof ITEMS)[number]

export function Navbar() {
  const { t, lang, setLang, langs } = useLang()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const [active, setActive] = useState('home')
  const langRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24)
      let current = 'home'
      for (const id of ['home', ...ITEMS]) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= 140) current = id
      }
      setActive(current)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!langOpen) return
    const onClick = (event: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(event.target as Node)) setLangOpen(false)
    }
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && setLangOpen(false)
    document.addEventListener('mousedown', onClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [langOpen])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const navigate = (id: string) => {
    setMenuOpen(false)
    scrollToId(id)
  }

  const selectLang = (code: Lang) => {
    setLang(code)
    setLangOpen(false)
    setMenuOpen(false)
  }

  return (
    <header className={`nav ${scrolled ? 'is-scrolled' : ''} ${menuOpen ? 'is-open' : ''}`}>
      <div className="container nav-inner">
        <a
          className="brand"
          href="#home"
          onClick={(e) => {
            e.preventDefault()
            navigate('home')
          }}
          aria-label="FORGE Fitness Centre — home"
        >
          <Logo size={38} />
          <span className="brand-text">
            <span className="brand-name">FORGE</span>
            <span className="brand-sub">Fitness Centre</span>
          </span>
        </a>

        <nav className="nav-links" aria-label="Primary">
          {ITEMS.map((key: ItemKey) => (
            <a
              key={key}
              href={`#${key}`}
              className={`nav-link ${active === key ? 'is-active' : ''}`}
              onClick={(e) => {
                e.preventDefault()
                navigate(key)
              }}
            >
              {t.nav[key]}
            </a>
          ))}
        </nav>

        <div className="nav-actions">
          <div className="lang" ref={langRef}>
            <button
              className={`lang-btn ${langOpen ? 'is-open' : ''}`}
              onClick={() => setLangOpen((v) => !v)}
              aria-haspopup="listbox"
              aria-expanded={langOpen}
              aria-label={t.nav.language}
            >
              <Icon name="globe" size={17} />
              <span className="lang-current">{langs.find((l) => l.code === lang)?.native}</span>
              <Icon name="chevronDown" size={13} className="lang-caret" />
            </button>
            {langOpen && (
              <ul className="lang-menu" role="listbox" aria-label={t.nav.language}>
                {langs.map((item) => (
                  <li key={item.code}>
                    <button
                      role="option"
                      aria-selected={item.code === lang}
                      className={`lang-option ${item.code === lang ? 'is-active' : ''}`}
                      onClick={() => selectLang(item.code)}
                    >
                      <span className="lang-native">{item.native}</span>
                      <span className="lang-label">{item.label}</span>
                      {item.code === lang && <Icon name="check" size={15} />}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <a
            className="btn btn-primary btn-sm nav-cta"
            href="#register"
            onClick={(e) => {
              e.preventDefault()
              navigate('register')
            }}
          >
            {t.nav.join}
          </a>

          <button
            className="nav-burger"
            aria-label={menuOpen ? t.nav.closeMenu : t.nav.openMenu}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <Icon name={menuOpen ? 'close' : 'menu'} size={24} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`mobile-menu ${menuOpen ? 'is-open' : ''}`} id="mobile-menu" aria-hidden={!menuOpen}>
        <nav className="mobile-links" aria-label="Mobile">
          {ITEMS.map((key: ItemKey) => (
            <a
              key={key}
              href={`#${key}`}
              className={`mobile-link ${active === key ? 'is-active' : ''}`}
              onClick={(e) => {
                e.preventDefault()
                navigate(key)
              }}
              tabIndex={menuOpen ? 0 : -1}
            >
              <span>{t.nav[key]}</span>
              <Icon name="chevronRight" size={18} />
            </a>
          ))}
          <a
            href="#register"
            className="mobile-link mobile-link-accent"
            onClick={(e) => {
              e.preventDefault()
              navigate('register')
            }}
            tabIndex={menuOpen ? 0 : -1}
          >
            <span>{t.nav.join}</span>
            <Icon name="arrowRight" size={18} />
          </a>
        </nav>
        <div className="mobile-lang">
          <p className="mobile-lang-title">{t.nav.language}</p>
          <div className="mobile-lang-grid">
            {langs.map((item) => (
              <button
                key={item.code}
                className={`mobile-lang-btn ${item.code === lang ? 'is-active' : ''}`}
                onClick={() => selectLang(item.code)}
                tabIndex={menuOpen ? 0 : -1}
              >
                <span className="mobile-lang-native">{item.native}</span>
                <span className="mobile-lang-label">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  )
}
