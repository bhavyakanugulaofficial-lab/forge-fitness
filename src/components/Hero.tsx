import { useEffect, useState } from 'react'
import { useLang } from '../i18n/LanguageContext'
import { useCountUp } from '../hooks/useCountUp'
import { useUi } from './UiContext'
import { Icon } from './Icons'
import { scrollToId } from '../lib/scroll'

function Stat({ value, suffix, label, active }: { value: number; suffix: string; label: string; active: boolean }) {
  const current = useCountUp(value, active, 1600)
  return (
    <div className="stat">
      <span className="stat-value">
        {current.toLocaleString('en-IN')}
        <em>{suffix}</em>
      </span>
      <span className="stat-label">{label}</span>
    </div>
  )
}

export function Hero() {
  const { t } = useLang()
  const { goToRegister } = useUi()
  const [active, setActive] = useState(false)

  useEffect(() => {
    const id = window.setTimeout(() => setActive(true), 250)
    return () => window.clearTimeout(id)
  }, [])

  const stats = [
    { value: 12, suffix: '+', label: t.hero.statYears },
    { value: 2500, suffix: '+', label: t.hero.statMembers },
    { value: 24, suffix: '', label: t.hero.statCoaches },
    { value: 60, suffix: '+', label: t.hero.statClasses },
  ]

  return (
    <section className="hero" id="home" aria-label={t.hero.titleTop + ' ' + t.hero.titleHighlight}>
      <div className="hero-bg" aria-hidden="true">
        <img src="/images/hero.jpg" alt="" loading="eager" decoding="async" />
      </div>
      <div className="hero-overlay" aria-hidden="true" />
      <div className="hero-glow" aria-hidden="true" />

      <div className="container hero-inner">
        <div className="hero-copy">
          <span className="hero-eyebrow">
            <span className="pulse-dot" aria-hidden="true" />
            {t.hero.eyebrow}
          </span>

          <h1 className="hero-title">
            <span className="hero-line">{t.hero.titleTop}</span>
            <span className="hero-line hero-line-accent">{t.hero.titleHighlight}</span>
          </h1>

          <p className="hero-sub">{t.hero.subtitle}</p>

          <div className="hero-actions">
            <button className="btn btn-primary btn-lg" onClick={() => goToRegister()}>
              {t.hero.ctaPrimary}
              <Icon name="arrowRight" size={18} />
            </button>
            <button className="btn btn-ghost btn-lg" onClick={() => goToRegister({ schedule: '', goals: '' })}>
              {t.hero.ctaSecondary}
            </button>
            <button
              className="btn btn-text btn-lg"
              onClick={() => goToRegister({ goals: t.assessment.goals[4] })}
            >
              {t.hero.ctaTertiary}
              <span className="btn-free">FREE</span>
            </button>
          </div>

          <ul className="hero-points">
            <li>
              <Icon name="check" size={16} /> {t.footer.openDaily}
            </li>
            <li>
              <Icon name="check" size={16} /> {t.programs.levels.beginner} — {t.programs.levels.advanced}
            </li>
            <li>
              <Icon name="check" size={16} /> {t.about.infoTitle}
            </li>
          </ul>
        </div>

        <aside className="hero-card" aria-label={t.hero.cardLabel}>
          <div className="hero-card-top">
            <span className="hero-card-label">
              <Icon name="bolt" size={14} />
              {t.hero.cardLabel}
            </span>
            <span className="hero-card-live">{t.hero.cardOpen}</span>
          </div>
          <h2 className="hero-card-title">{t.hero.cardTitle}</h2>
          <p className="hero-card-meta">
            <Icon name="clock" size={15} />
            {t.hero.cardMeta}
          </p>
          <div className="hero-card-bar">
            <span style={{ width: '72%' }} />
          </div>
          <p className="hero-card-note">{t.schedule.limited}</p>
          <button className="btn btn-primary btn-block" onClick={() => goToRegister({ schedule: t.register.schedules[2] })}>
            {t.hero.cardBtn}
          </button>
          <ul className="hero-card-list">
            <li>
              <Icon name="timer" size={15} /> 45 {t.common.minutes}
            </li>
            <li>
              <Icon name="flame" size={15} /> 420 kcal
            </li>
            <li>
              <Icon name="users" size={15} /> 18 {t.common.slots}
            </li>
          </ul>
        </aside>
      </div>

      <button className="hero-scroll" onClick={() => scrollToId('about')} aria-label={t.hero.scroll} tabIndex={-1}>
        <span className="mouse" aria-hidden="true">
          <span className="mouse-wheel" />
        </span>
        {t.hero.scroll}
      </button>

      <div className="hero-stats">
        <div className="container hero-stats-grid">
          {stats.map((s) => (
            <Stat key={s.label} {...s} active={active} />
          ))}
        </div>
      </div>

    </section>
  )
}
