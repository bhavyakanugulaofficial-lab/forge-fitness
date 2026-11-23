import { useState, type FormEvent } from 'react'
import { useLang } from '../i18n/LanguageContext'
import { BUSINESS } from '../data/content'
import { Reveal } from './Reveal'
import { SectionHead } from './SectionHead'
import { useToast } from './Toast'
import { Icon } from './Icons'
import { isEmail, isName } from '../lib/validators'
import { submitContact } from '../lib/api'

interface FormState {
  name: string
  email: string
  subject: string
  message: string
}

export function Contact() {
  const { t } = useLang()
  const { toast } = useToast()
  const [form, setForm] = useState<FormState>({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState<Partial<FormState>>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'done'>('idle')
  const [mapLoaded, setMapLoaded] = useState(false)

  const update = (key: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }))
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: '' }))
  }

  const submit = async (event: FormEvent) => {
    event.preventDefault()
    const next: Partial<FormState> = {}
    if (!isName(form.name)) next.name = t.register.errors.name
    if (!isEmail(form.email)) next.email = t.register.errors.email
    if (form.message.trim().length < 10) next.message = t.register.errors.required
    setErrors(next)
    if (Object.keys(next).length > 0) return

    setStatus('sending')
    try {
      await submitContact(form)
      setStatus('done')
      toast(t.contact.sentTitle)
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch {
      setStatus('idle')
      toast(t.common.error, 'error')
    }
  }

  return (
    <section className="section contact" id="contact" aria-labelledby="contact-title">
      <div className="container">
        <SectionHead eyebrow={t.contact.eyebrow} title={t.contact.title} subtitle={t.contact.subtitle} id="contact-title" />

        <div className="contact-grid">
          <Reveal className="contact-info">
            <div className="contact-card">
              <span className="info-icon">
                <Icon name="mapPin" size={20} />
              </span>
              <div>
                <span className="info-label">{t.contact.addressLabel}</span>
                <span className="info-value">{BUSINESS.address}</span>
              </div>
            </div>
            <div className="contact-card">
              <span className="info-icon">
                <Icon name="phone" size={20} />
              </span>
              <div>
                <span className="info-label">{t.contact.phoneLabel}</span>
                <a className="info-value" href={`tel:${BUSINESS.phoneHref}`}>
                  {BUSINESS.phone}
                </a>
              </div>
            </div>
            <div className="contact-card">
              <span className="info-icon">
                <Icon name="mail" size={20} />
              </span>
              <div>
                <span className="info-label">{t.contact.emailLabel}</span>
                <a className="info-value" href={`mailto:${BUSINESS.email}`}>
                  {BUSINESS.email}
                </a>
              </div>
            </div>
            <div className="contact-card">
              <span className="info-icon">
                <Icon name="clock" size={20} />
              </span>
              <div>
                <span className="info-label">{t.contact.hoursLabel}</span>
                {t.contact.hours.map((line) => (
                  <span className="info-value" key={line}>
                    {line}
                  </span>
                ))}
              </div>
            </div>

            <div className="contact-social">
              <span className="muted-label">{t.contact.social}</span>
              <div className="social-row">
                <a href={BUSINESS.social.instagram} target="_blank" rel="noreferrer noopener" aria-label="Instagram">
                  <Icon name="instagram" size={18} />
                </a>
                <a href={BUSINESS.social.facebook} target="_blank" rel="noreferrer noopener" aria-label="Facebook">
                  <Icon name="facebook" size={18} />
                </a>
                <a href={BUSINESS.social.youtube} target="_blank" rel="noreferrer noopener" aria-label="YouTube">
                  <Icon name="youtube" size={18} />
                </a>
                <a href={BUSINESS.social.x} target="_blank" rel="noreferrer noopener" aria-label="X">
                  <Icon name="x" size={18} />
                </a>
                <a href={BUSINESS.social.whatsapp} target="_blank" rel="noreferrer noopener" aria-label="WhatsApp">
                  <Icon name="whatsapp" size={18} />
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal className="contact-form-wrap" delay={120}>
            <h3 className="contact-form-title">{t.contact.formTitle}</h3>
            {status === 'done' ? (
              <div className="form-success">
                <span className="success-icon">
                  <Icon name="check" size={28} />
                </span>
                <h3>{t.contact.sentTitle}</h3>
                <p>{t.contact.sentText}</p>
                <button className="btn btn-ghost btn-sm" onClick={() => setStatus('idle')}>
                  {t.register.again}
                </button>
              </div>
            ) : (
              <form className="form" onSubmit={submit} noValidate>
                <div className="field-row">
                  <label className={`field ${errors.name ? 'field-invalid' : ''}`}>
                    <span className="field-label">{t.contact.fieldName}</span>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => update('name', e.target.value)}
                      aria-invalid={!!errors.name}
                      autoComplete="name"
                    />
                    {errors.name && <span className="field-error">{errors.name}</span>}
                  </label>
                  <label className={`field ${errors.email ? 'field-invalid' : ''}`}>
                    <span className="field-label">{t.contact.fieldEmail}</span>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => update('email', e.target.value)}
                      aria-invalid={!!errors.email}
                      autoComplete="email"
                    />
                    {errors.email && <span className="field-error">{errors.email}</span>}
                  </label>
                </div>

                <label className="field">
                  <span className="field-label">{t.contact.fieldSubject}</span>
                  <select value={form.subject} onChange={(e) => update('subject', e.target.value)}>
                    {t.contact.subjects.map((subject) => (
                      <option key={subject} value={subject}>
                        {subject}
                      </option>
                    ))}
                  </select>
                </label>

                <label className={`field ${errors.message ? 'field-invalid' : ''}`}>
                  <span className="field-label">{t.contact.fieldMessage}</span>
                  <textarea
                    rows={4}
                    value={form.message}
                    onChange={(e) => update('message', e.target.value)}
                    aria-invalid={!!errors.message}
                  />
                  {errors.message && <span className="field-error">{errors.message}</span>}
                </label>

                <button type="submit" className="btn btn-primary btn-block" disabled={status === 'sending'}>
                  {status === 'sending' ? t.contact.sending : t.contact.send}
                  {status !== 'sending' && <Icon name="arrowRight" size={17} />}
                </button>
              </form>
            )}
          </Reveal>
        </div>

        <Reveal className="map-wrap" delay={120}>
          <div className="map-head">
            <h3>{t.contact.mapTitle}</h3>
            <a
              className="btn btn-ghost btn-sm"
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(BUSINESS.mapQuery)}`}
              target="_blank"
              rel="noreferrer noopener"
            >
              {t.contact.directions}
              <Icon name="arrowRight" size={15} />
            </a>
          </div>
          <div className="map-frame">
            {mapLoaded ? (
              <iframe
                title={t.contact.mapTitle}
                src={`https://www.google.com/maps?q=${encodeURIComponent(BUSINESS.mapQuery)}&output=embed`}
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            ) : (
              <div className="map-canvas">
                <svg
                  className="map-svg"
                  viewBox="0 0 1200 520"
                  preserveAspectRatio="xMidYMid slice"
                  aria-hidden="true"
                >
                  <defs>
                    <pattern id="map-grid" width="64" height="64" patternUnits="userSpaceOnUse">
                      <path d="M64 0H0V64" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
                    </pattern>
                    <radialGradient id="map-glow">
                      <stop offset="0%" stopColor="rgba(255,92,26,0.34)" />
                      <stop offset="65%" stopColor="rgba(255,92,26,0)" />
                    </radialGradient>
                    <linearGradient id="map-fade" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="rgba(8,8,10,0)" />
                      <stop offset="100%" stopColor="rgba(8,8,10,0.92)" />
                    </linearGradient>
                  </defs>

                  <rect width="1200" height="520" fill="#0A0A0C" />
                  <rect width="1200" height="520" fill="url(#map-grid)" />

                  {/* abstract street grid */}
                  <g stroke="rgba(255,255,255,0.06)" fill="none" strokeLinecap="round">
                    <path d="M-40 150 L 1240 60" strokeWidth="18" />
                    <path d="M-40 330 L 1240 250" strokeWidth="30" />
                    <path d="M-40 470 L 1240 400" strokeWidth="14" />
                    <path d="M180 -40 L 120 560" strokeWidth="16" />
                    <path d="M520 -40 L 470 560" strokeWidth="26" />
                    <path d="M880 -40 L 840 560" strokeWidth="12" />
                    <path d="M1080 -40 L 1050 560" strokeWidth="20" />
                  </g>
                  <g stroke="rgba(255,138,61,0.16)" fill="none" strokeLinecap="round">
                    <path d="M-40 330 L 1240 250" strokeWidth="3" />
                    <path d="M520 -40 L 470 560" strokeWidth="3" />
                  </g>

                  <circle cx="600" cy="240" r="170" fill="url(#map-glow)" />
                  <rect y="300" width="1200" height="220" fill="url(#map-fade)" />
                </svg>

                <span className="map-pin" aria-hidden="true">
                  <span className="map-pin-pulse" />
                  <Icon name="mapPin" size={26} />
                </span>

                <div className="map-overlay">
                  <span className="map-overlay-name">FORGE FITNESS CENTRE</span>
                  <span className="map-overlay-addr">{BUSINESS.address}</span>
                  <button className="btn btn-primary btn-sm" onClick={() => setMapLoaded(true)}>
                    {t.contact.mapLoad}
                    <Icon name="arrowRight" size={15} />
                  </button>
                  <p className="map-hint">{t.contact.mapHint}</p>
                </div>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
