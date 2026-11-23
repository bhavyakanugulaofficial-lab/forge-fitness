import { useLang } from '../i18n/LanguageContext'
import { Reveal } from './Reveal'
import { SectionHead } from './SectionHead'
import { useUi } from './UiContext'
import { Icon } from './Icons'
import { BUSINESS } from '../data/content'

export function About() {
  const { t } = useLang()
  const { goToRegister } = useUi()

  const pillars = [t.about.mission, t.about.vision, t.about.philosophy]

  return (
    <section className="section about" id="about" aria-labelledby="about-title">
      <div className="container">
        <div className="about-grid">
          <Reveal className="about-media">
            <img src="/images/about.jpg" alt="" loading="lazy" decoding="async" />
            <span className="about-frame" aria-hidden="true" />
            <div className="about-badge">
              <span className="about-badge-value">{t.about.badgeYears}</span>
              <span className="about-badge-label">{t.about.badgeYearsLabel}</span>
            </div>
            <div className="about-badge about-badge-alt">
              <span className="about-badge-value">{t.about.badgeMembers}</span>
              <span className="about-badge-label">{t.about.badgeMembersLabel}</span>
            </div>
          </Reveal>

          <div className="about-copy">
            <SectionHead eyebrow={t.about.eyebrow} title={t.about.title} id="about-title" />
            <Reveal>
              <p className="about-lead">{t.about.lead}</p>
              <p className="about-p">{t.about.p1}</p>
              <p className="about-p">{t.about.p2}</p>
            </Reveal>

            <div className="pillars">
              {pillars.map((pillar, index) => (
                <Reveal className="pillar" key={pillar.title} delay={index * 90}>
                  <span className="pillar-index">0{index + 1}</span>
                  <h3>{pillar.title}</h3>
                  <p>{pillar.text}</p>
                </Reveal>
              ))}
            </div>

            <Reveal>
              <button className="btn btn-primary" onClick={() => goToRegister()}>
                {t.about.cta}
                <Icon name="arrowRight" size={17} />
              </button>
            </Reveal>
          </div>
        </div>

        <div className="why">
          <Reveal className="section-head">
            <span className="eyebrow">
              <span className="eyebrow-line" aria-hidden="true" />
              {t.about.whyTitle}
            </span>
          </Reveal>
          <div className="why-grid">
            {t.about.why.map((item, index) => (
              <Reveal className="why-card" key={item.title} delay={index * 90}>
                <span className="why-num">0{index + 1}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal className="info-bar">
          <div className="info-item">
            <span className="info-icon">
              <Icon name="mapPin" size={20} />
            </span>
            <div>
              <span className="info-label">{t.about.addressLabel}</span>
              <span className="info-value">{BUSINESS.address}</span>
            </div>
          </div>
          <div className="info-item">
            <span className="info-icon">
              <Icon name="phone" size={20} />
            </span>
            <div>
              <span className="info-label">{t.about.phoneLabel}</span>
              <a className="info-value" href={`tel:${BUSINESS.phoneHref}`}>
                {BUSINESS.phone}
              </a>
            </div>
          </div>
          <div className="info-item">
            <span className="info-icon">
              <Icon name="mail" size={20} />
            </span>
            <div>
              <span className="info-label">{t.about.emailLabel}</span>
              <a className="info-value" href={`mailto:${BUSINESS.email}`}>
                {BUSINESS.email}
              </a>
            </div>
          </div>
          <div className="info-item">
            <span className="info-icon">
              <Icon name="clock" size={20} />
            </span>
            <div>
              <span className="info-label">{t.about.hoursLabel}</span>
              {t.about.hours.map((line) => (
                <span className="info-value" key={line}>
                  {line}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
