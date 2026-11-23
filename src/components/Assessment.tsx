import { useMemo, useState } from 'react'
import { useLang } from '../i18n/LanguageContext'
import { computeBmi } from '../lib/bmi'
import { Reveal } from './Reveal'
import { SectionHead } from './SectionHead'
import { useUi } from './UiContext'
import { Icon } from './Icons'

const GOAL_KEYS = ['lose', 'muscle', 'endurance', 'flexibility', 'general', 'sport'] as const

const CATEGORY_COLORS: Record<string, string> = {
  under: '#5EC8F2',
  normal: '#4ADE80',
  over: '#FBBF24',
  obese: '#FF5C1A',
}

const RADIUS = 56
const CIRC = 2 * Math.PI * RADIUS
const ARC = (CIRC * 240) / 360

export function Assessment() {
  const { t } = useLang()
  const { goToRegister } = useUi()
  const [form, setForm] = useState({
    name: '',
    age: '',
    height: '',
    weight: '',
    goal: 4,
    activity: 1,
    experience: 1,
    type: 0,
    time: 1,
  })

  const update = (key: keyof typeof form, value: string | number) =>
    setForm((prev) => ({ ...prev, [key]: value }))

  const result = useMemo(
    () => computeBmi(Number(form.height), Number(form.weight)),
    [form.height, form.weight],
  )

  const goalKey = GOAL_KEYS[form.goal] ?? 'general'
  const ideas = t.assessment.ideas[goalKey]
  const color = result ? CATEGORY_COLORS[result.key] : '#FF5C1A'

  const reset = () =>
    setForm({
      name: '',
      age: '',
      height: '',
      weight: '',
      goal: 4,
      activity: 1,
      experience: 1,
      type: 0,
      time: 1,
    })

  return (
    <section className="section assessment" id="assess" aria-labelledby="assessment-title">
      <div className="container">
        <SectionHead eyebrow={t.assessment.eyebrow} title={t.assessment.title} subtitle={t.assessment.subtitle} id="assessment-title" />

        <div className="assessment-grid">
          <Reveal className="assessment-form-wrap">
            <form className="form assessment-form" onSubmit={(e) => e.preventDefault()}>
              <div className="field-row">
                <label className="field">
                  <span className="field-label">{t.assessment.fields.name}</span>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => update('name', e.target.value)}
                    autoComplete="name"
                    placeholder="A. Sharma"
                  />
                </label>
                <label className="field">
                  <span className="field-label">{t.assessment.fields.age}</span>
                  <input
                    type="number"
                    inputMode="numeric"
                    min="13"
                    max="90"
                    value={form.age}
                    onChange={(e) => update('age', e.target.value)}
                    placeholder="28"
                  />
                </label>
              </div>

              <div className="field-row">
                <label className="field">
                  <span className="field-label">{t.assessment.fields.height}</span>
                  <input
                    type="number"
                    inputMode="decimal"
                    min="80"
                    max="250"
                    value={form.height}
                    onChange={(e) => update('height', e.target.value)}
                    placeholder="170"
                  />
                </label>
                <label className="field">
                  <span className="field-label">{t.assessment.fields.weight}</span>
                  <input
                    type="number"
                    inputMode="decimal"
                    min="20"
                    max="300"
                    step="0.1"
                    value={form.weight}
                    onChange={(e) => update('weight', e.target.value)}
                    placeholder="68"
                  />
                </label>
              </div>

              <label className="field">
                <span className="field-label">{t.assessment.fields.goal}</span>
                <select value={form.goal} onChange={(e) => update('goal', Number(e.target.value))}>
                  {t.assessment.goals.map((goal, index) => (
                    <option key={goal} value={index}>
                      {goal}
                    </option>
                  ))}
                </select>
              </label>

              <div className="field-row">
                <label className="field">
                  <span className="field-label">{t.assessment.fields.activity}</span>
                  <select value={form.activity} onChange={(e) => update('activity', Number(e.target.value))}>
                    {t.assessment.activityLevels.map((level, index) => (
                      <option key={level} value={index}>
                        {level}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="field">
                  <span className="field-label">{t.assessment.fields.experience}</span>
                  <select value={form.experience} onChange={(e) => update('experience', Number(e.target.value))}>
                    {t.assessment.experienceLevels.map((level, index) => (
                      <option key={level} value={index}>
                        {level}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="field-row">
                <label className="field">
                  <span className="field-label">{t.assessment.fields.type}</span>
                  <select value={form.type} onChange={(e) => update('type', Number(e.target.value))}>
                    {t.assessment.types.map((type, index) => (
                      <option key={type} value={index}>
                        {type}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="field">
                  <span className="field-label">{t.assessment.fields.time}</span>
                  <select value={form.time} onChange={(e) => update('time', Number(e.target.value))}>
                    {t.assessment.times.map((time, index) => (
                      <option key={time} value={index}>
                        {time}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="assessment-actions">
                <button type="submit" className="btn btn-primary">
                  {result ? t.assessment.recalc : t.assessment.calculate}
                </button>
                <button type="button" className="btn btn-text" onClick={reset}>
                  {t.assessment.reset}
                </button>
              </div>
            </form>
          </Reveal>

          <Reveal className="assessment-result" delay={120}>
            <div className="result-head">
              <h3>{t.assessment.resultTitle}</h3>
              {form.name.trim() && <span className="result-name">{form.name.trim()}</span>}
            </div>

            <div className="gauge">
              <svg viewBox="0 0 140 140" className="gauge-svg" role="img" aria-label={`${t.assessment.bmiLabel}: ${result ? result.bmi : '—'}`}>
                <defs>
                  <linearGradient id="bmi-grad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#FF8A3D" />
                    <stop offset="1" stopColor="#FF4A0E" />
                  </linearGradient>
                </defs>
                <circle cx="70" cy="70" r={RADIUS} className="gauge-track" strokeDasharray={`${ARC} ${CIRC}`} transform="rotate(150 70 70)" />
                {result && (
                  <circle
                    cx="70"
                    cy="70"
                    r={RADIUS}
                    className="gauge-fill"
                    strokeDasharray={`${ARC * result.position} ${CIRC}`}
                    transform="rotate(150 70 70)"
                    style={{ stroke: color }}
                  />
                )}
                {result && (
                  <g transform={`rotate(${result.position * 240 - 120} 70 70)`}>
                    <circle cx="70" cy="14" r="4.5" fill={color} />
                  </g>
                )}
              </svg>
              <div className="gauge-center">
                <span className="gauge-value">{result ? result.bmi : '—'}</span>
                <span className="gauge-label">{t.assessment.bmiLabel}</span>
              </div>
            </div>

            {result ? (
              <>
                <div className="result-category" style={{ borderColor: color }}>
                  <span className="result-category-dot" style={{ background: color }} />
                  {t.assessment.categories[result.key]}
                </div>
                <p className="result-interpretation">{t.assessment.interpretations[result.key]}</p>

                <div className="suggestions">
                  <h4 className="modal-subhead">{t.assessment.suggestionsTitle}</h4>
                  <ul className="suggestion-list">
                    {ideas.map((idea) => (
                      <li key={idea}>
                        <span className="benefit-check">
                          <Icon name="arrowRight" size={13} />
                        </span>
                        {idea}
                      </li>
                    ))}
                  </ul>
                  <p className="suggestion-note">{t.assessment.suggestionNote}</p>
                </div>

                <button className="btn btn-primary btn-block" onClick={() => goToRegister({ goals: t.assessment.goals[form.goal] })}>
                  {t.assessment.cta}
                  <Icon name="arrowRight" size={16} />
                </button>
              </>
            ) : (
              <div className="result-placeholder">
                <Icon name="target" size={26} />
                <p>{t.assessment.subtitle}</p>
              </div>
            )}

            <p className="disclaimer">
              <Icon name="info" size={14} />
              {t.assessment.disclaimer}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
