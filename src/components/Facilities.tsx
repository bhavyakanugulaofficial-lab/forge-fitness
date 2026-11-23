import { useLang } from '../i18n/LanguageContext'
import { FACILITIES, pick } from '../data/content'
import { Reveal } from './Reveal'
import { SectionHead } from './SectionHead'
import { Icon } from './Icons'

export function Facilities() {
  const { t, lang } = useLang()
  const featured = FACILITIES.filter((f) => f.featured)
  const rest = FACILITIES.filter((f) => !f.featured)

  return (
    <section className="section facilities" id="facilities" aria-labelledby="facilities-title">
      <div className="container">
        <SectionHead eyebrow={t.facilities.eyebrow} title={t.facilities.title} subtitle={t.facilities.subtitle} id="facilities-title" />

        <div className="facility-featured">
          {featured.map((facility, index) => (
            <Reveal className="facility-card-lg" key={facility.id} delay={index * 100}>
              <img src={facility.image} alt="" loading="lazy" decoding="async" />
              <div className="facility-overlay" />
              <div className="facility-card-content">
                <span className="facility-icon">
                  <Icon name={facility.icon} size={22} />
                </span>
                <h3>{pick(facility.name, lang)}</h3>
                <p>{pick(facility.description, lang)}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="facility-grid">
          {rest.map((facility, index) => (
            <Reveal className="facility-card" key={facility.id} delay={(index % 3) * 80}>
              <span className="facility-icon facility-icon-sm">
                <Icon name={facility.icon} size={20} />
              </span>
              <div>
                <h3>{pick(facility.name, lang)}</h3>
                <p>{pick(facility.description, lang)}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
