import { useLang } from '../i18n/LanguageContext'
import { TRAINERS, pick } from '../data/content'
import { Reveal } from './Reveal'
import { SectionHead } from './SectionHead'
import { useUi } from './UiContext'
import { Icon } from './Icons'
import type { CSSProperties } from 'react'

export function Trainers() {
  const { t, lang } = useLang()
  const { openTrainer } = useUi()

  return (
    <section className="section trainers" id="trainers" aria-labelledby="trainers-title">
      <div className="container">
        <SectionHead eyebrow={t.trainers.eyebrow} title={t.trainers.title} subtitle={t.trainers.subtitle} id="trainers-title" />

        <div className="trainer-grid">
          {TRAINERS.map((trainer, index) => (
            <Reveal className="trainer-card" key={trainer.id} delay={(index % 4) * 80}>
              <div className="trainer-media" style={{ '--accent': trainer.accent } as CSSProperties}>
                <img src={trainer.photo} alt={trainer.name} loading="lazy" decoding="async" />
                <span className="trainer-exp">
                  <strong>{trainer.experience}</strong>
                  <span>{t.common.years}</span>
                </span>
              </div>

              <div className="trainer-body">
                <h3 className="trainer-name">{trainer.name}</h3>
                <span className="trainer-spec">{pick(trainer.specialization, lang)}</span>

                <div className="trainer-cert">
                  {trainer.certifications.map((cert) => (
                    <span className="cert-chip" key={cert.en}>
                      <Icon name="award" size={13} />
                      {pick(cert, lang)}
                    </span>
                  ))}
                </div>

                <p className="trainer-bio">{pick(trainer.bio, lang)}</p>

                <div className="trainer-hours">
                  <Icon name="clock" size={15} />
                  <span>
                    <span className="muted-label">{t.trainers.hours}</span>
                    {pick(trainer.hours, lang)}
                  </span>
                </div>

                <button className="btn btn-outline btn-block" onClick={() => openTrainer(trainer.id)}>
                  {t.trainers.book}
                  <Icon name="arrowRight" size={16} />
                </button>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
