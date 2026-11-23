import { useState } from 'react'
import { useLang } from '../i18n/LanguageContext'
import { BUSINESS, PROGRAMS, pick } from '../data/content'
import { Modal } from './Modal'
import { Icon, Logo } from './Icons'
import { scrollToId } from '../lib/scroll'

export function Footer() {
  const { t, lang } = useLang()
  const [legal, setLegal] = useState<'privacy' | 'terms' | null>(null)

  const quickLinks = ['about', 'trainers', 'membership', 'facilities', 'schedule', 'contact'] as const

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-cta">
          <div>
            <h2 className="footer-cta-title">{t.hero.titleTop + ' ' + t.hero.titleHighlight}</h2>
            <p>{t.hero.subtitle}</p>
          </div>
          <button className="btn btn-primary btn-lg" onClick={() => scrollToId('register')}>
            {t.nav.join}
            <Icon name="arrowRight" size={18} />
          </button>
        </div>

        <div className="footer-grid">
          <div className="footer-brand">
            <a className="brand" href="#home" onClick={(e) => { e.preventDefault(); scrollToId('home') }}>
              <Logo size={38} />
              <span className="brand-text">
                <span className="brand-name">FORGE</span>
                <span className="brand-sub">Fitness Centre</span>
              </span>
            </a>
            <p className="footer-about">{t.footer.about}</p>
            <div className="social-row">
              <a href={BUSINESS.social.instagram} target="_blank" rel="noreferrer noopener" aria-label="Instagram">
                <Icon name="instagram" size={17} />
              </a>
              <a href={BUSINESS.social.facebook} target="_blank" rel="noreferrer noopener" aria-label="Facebook">
                <Icon name="facebook" size={17} />
              </a>
              <a href={BUSINESS.social.youtube} target="_blank" rel="noreferrer noopener" aria-label="YouTube">
                <Icon name="youtube" size={17} />
              </a>
              <a href={BUSINESS.social.x} target="_blank" rel="noreferrer noopener" aria-label="X">
                <Icon name="x" size={17} />
              </a>
              <a href={BUSINESS.social.whatsapp} target="_blank" rel="noreferrer noopener" aria-label="WhatsApp">
                <Icon name="whatsapp" size={17} />
              </a>
            </div>
          </div>

          <nav className="footer-col" aria-label="Footer quick links">
            <h3>{t.footer.quickLinks}</h3>
            <ul>
              {quickLinks.map((key) => (
                <li key={key}>
                  <a href={`#${key}`} onClick={(e) => { e.preventDefault(); scrollToId(key) }}>
                    {t.nav[key]}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="footer-col" aria-label="Programs">
            <h3>{t.footer.programs}</h3>
            <ul>
              {PROGRAMS.slice(0, 6).map((program) => (
                <li key={program.id}>
                  <a href="#programs" onClick={(e) => { e.preventDefault(); scrollToId('programs') }}>
                    {pick(program.name, lang)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="footer-col">
            <h3>{t.footer.contact}</h3>
            <ul className="footer-contact">
              <li>
                <Icon name="mapPin" size={15} />
                <span>{BUSINESS.address}</span>
              </li>
              <li>
                <Icon name="phone" size={15} />
                <a href={`tel:${BUSINESS.phoneHref}`}>{BUSINESS.phone}</a>
              </li>
              <li>
                <Icon name="mail" size={15} />
                <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a>
              </li>
              <li>
                <Icon name="clock" size={15} />
                <span>{t.about.hours[0]}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} {BUSINESS.name}. {t.footer.rights}
          </p>
          <div className="footer-legal">
            <button onClick={() => setLegal('privacy')}>{t.footer.privacy}</button>
            <span aria-hidden="true">·</span>
            <button onClick={() => setLegal('terms')}>{t.footer.terms}</button>
          </div>
          <p className="footer-designed">
            <Icon name="sparkles" size={14} />
            {t.footer.designed}
          </p>
        </div>

        <p className="footer-demo">{t.footer.demoNote}</p>
      </div>

      <Modal
        open={!!legal}
        onClose={() => setLegal(null)}
        title={legal === 'privacy' ? t.legal.privacyTitle : t.legal.termsTitle}
        size="md"
        labelledBy="legal-title"
      >
        <div className="legal">
          {(legal === 'privacy' ? t.legal.privacyText : t.legal.termsText).map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <p className="legal-meta">
            {t.legal.updated}: {t.legal.updatedDate}
          </p>
        </div>
      </Modal>
    </footer>
  )
}
