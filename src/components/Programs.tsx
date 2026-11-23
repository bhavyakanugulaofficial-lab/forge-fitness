import { useMemo, useState } from 'react'
import { useLang } from '../i18n/LanguageContext'
import { PROGRAMS, pick, type Level } from '../data/content'
import { Reveal } from './Reveal'
import { SectionHead } from './SectionHead'
import { useUi } from './UiContext'
import { Icon } from './Icons'

const LEVEL_ORDER: ('all' | Level)[] = ['all', 'beginner', 'intermediate', 'advanced']

export function Programs() {
  const { t, lang } = useLang()
  const { openProgram } = useUi()
  const [query, setQuery] = useState('')
  const [level, setLevel] = useState<'all' | Level>('all')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return PROGRAMS.filter((program) => {
      const haystack = `${pick(program.name, lang)} ${pick(program.description, lang)} ${program.benefits
        .map((b) => pick(b, lang))
        .join(' ')}`
        .toLowerCase()
      const matchesQuery = q === '' || haystack.includes(q)
      const matchesLevel = level === 'all' || program.level === level || program.level === 'all'
      return matchesQuery && matchesLevel
    })
  }, [query, level, lang])

  return (
    <section className="section programs" id="programs" aria-labelledby="programs-title">
      <div className="container">
        <div className="programs-head">
          <SectionHead eyebrow={t.programs.eyebrow} title={t.programs.title} subtitle={t.programs.subtitle} id="programs-title" />
          <Reveal className="program-filters" delay={120}>
            <label className="search-box">
              <Icon name="search" size={18} />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={t.programs.search}
                aria-label={t.programs.search}
              />
              {query && (
                <button className="search-clear" onClick={() => setQuery('')} aria-label={t.common.close}>
                  <Icon name="close" size={14} />
                </button>
              )}
            </label>

            <div className="chip-row" role="group" aria-label={t.programs.filterLabel}>
              {LEVEL_ORDER.map((item) => (
                <button
                  key={item}
                  className={`chip ${level === item ? 'is-active' : ''}`}
                  onClick={() => setLevel(item)}
                  aria-pressed={level === item}
                >
                  {item === 'all' ? t.programs.levels.all : t.programs.levels[item]}
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        {filtered.length === 0 ? (
          <div className="empty-state">
            <Icon name="search" size={34} />
            <h3>{t.programs.emptyTitle}</h3>
            <p>{t.programs.emptyText}</p>
            <button
              className="btn btn-ghost btn-sm"
              onClick={() => {
                setQuery('')
                setLevel('all')
              }}
            >
              {t.programs.clear}
            </button>
          </div>
        ) : (
          <div className="program-grid">
            {filtered.map((program, index) => (
              <Reveal className="program-card" key={program.id} delay={(index % 3) * 80}>
                <div className="program-media">
                  <img src={program.image} alt="" loading="lazy" decoding="async" />
                  <span className={`level-badge level-${program.level}`}>
                    {program.level === 'all' ? t.programs.levels.all : t.programs.levels[program.level]}
                  </span>
                  <span className="program-icon">
                    <Icon name={program.icon} size={20} />
                  </span>
                </div>

                <div className="program-body">
                  <div className="program-meta">
                    <span>
                      <Icon name="clock" size={14} /> {program.duration} {t.programs.mins}
                    </span>
                    <span>
                      <Icon name="calendar" size={14} /> {program.perWeek} {t.programs.perWeek}
                    </span>
                  </div>
                  <h3 className="program-name">{pick(program.name, lang)}</h3>
                  <p className="program-desc">{pick(program.description, lang)}</p>

                  <ul className="benefit-list">
                    {program.benefits.slice(0, 2).map((benefit) => (
                      <li key={benefit.en}>
                        <Icon name="check" size={14} />
                        {pick(benefit, lang)}
                      </li>
                    ))}
                  </ul>

                  <div className="program-suitable">
                    <span className="muted-label">{t.programs.suitable}</span>
                    <span>{pick(program.suitable, lang)}</span>
                  </div>

                  <button className="program-link" onClick={() => openProgram(program.id)}>
                    {t.programs.details}
                    <Icon name="arrowRight" size={16} />
                  </button>
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
