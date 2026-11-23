import { useState } from 'react'
import { useLang } from '../i18n/LanguageContext'
import { CATEGORIES, DAYS, SCHEDULE, pick, programById, todayIndex, trainerById, type DayId } from '../data/content'
import { Reveal } from './Reveal'
import { SectionHead } from './SectionHead'
import { useUi } from './UiContext'
import { Icon } from './Icons'

type SlotKey = 'morning' | 'evening'
type SlotStatus = 'available' | 'limited' | 'full'

export function Schedule() {
  const { t, lang } = useLang()
  const { goToRegister } = useUi()
  const [day, setDay] = useState<DayId>(DAYS[todayIndex()].id)

  const schedule = SCHEDULE.find((d) => d.day === day) ?? SCHEDULE[0]
  const todayId = DAYS[todayIndex()].id

  const statusOf = (booked: number, total: number): SlotStatus => {
    const remaining = total - booked
    if (remaining <= 0) return 'full'
    if (remaining <= Math.ceil(total * 0.25)) return 'limited'
    return 'available'
  }

  const renderTable = (slot: SlotKey) => {
    const items = schedule[slot].map((session, index) => {
      const program = programById(session.programId)
      const trainer = trainerById(session.trainerId)
      const status = statusOf(session.booked, session.total)
      return { ...session, program, trainer, status, key: `${slot}-${index}` }
    })

    if (items.length === 0) {
      return (
        <p className="schedule-empty">
          {t.schedule[slot]} — {t.schedule.full}
        </p>
      )
    }

    return (
      <div className="table-scroll">
      <table className="schedule-table">
        <thead>
          <tr>
            <th>{t.schedule.time}</th>
            <th>{t.schedule.workout}</th>
            <th>{t.schedule.trainer}</th>
            <th>{t.schedule.category}</th>
            <th>{t.schedule.slots}</th>
            <th>
              <span className="sr-only">{t.schedule.book}</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.key}>
              <td data-label={t.schedule.time} className="cell-time">
                {item.time}
              </td>
              <td data-label={t.schedule.workout} className="cell-workout">
                {item.program ? pick(item.program.name, lang) : item.programId}
              </td>
              <td data-label={t.schedule.trainer}>{item.trainer?.name}</td>
              <td data-label={t.schedule.category}>
                {item.program && (
                  <span className={`cat-chip cat-${item.program.category}`}>
                    {pick(CATEGORIES[item.program.category], lang)}
                  </span>
                )}
              </td>
              <td data-label={t.schedule.slots}>
                <span className={`slot-pill slot-${item.status}`}>
                  <span className="slot-dot" />
                  {item.total - item.booked} / {item.total}
                  <em>{t.schedule[item.status]}</em>
                </span>
              </td>
              <td className="cell-action">
                <button
                  className="table-book"
                  disabled={item.status === 'full'}
                  onClick={() =>
                    goToRegister({
                      schedule: slot === 'morning' ? t.register.schedules[0] : t.register.schedules[2],
                      goals: item.program ? pick(item.program.name, lang) : '',
                      trainer: item.trainer?.id,
                    })
                  }
                >
                  {item.status === 'full' ? t.schedule.full : t.schedule.book}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    )
  }

  return (
    <section className="section schedule" id="schedule" aria-labelledby="schedule-title">
      <div className="container">
        <SectionHead eyebrow={t.schedule.eyebrow} title={t.schedule.title} subtitle={t.schedule.subtitle} id="schedule-title" />

        <Reveal className="day-tabs" delay={100}>
          {DAYS.map((item) => (
            <button
              key={item.id}
              className={`day-tab ${day === item.id ? 'is-active' : ''} ${todayId === item.id ? 'is-today' : ''}`}
              onClick={() => setDay(item.id)}
              aria-pressed={day === item.id}
            >
              <span className="day-tab-short">{item.short}</span>
              <span className="day-tab-name">{pick(item.name, lang)}</span>
              {todayId === item.id && <span className="day-today-dot" aria-hidden="true" />}
            </button>
          ))}
        </Reveal>

        <Reveal className="schedule-wrap" delay={140}>
          <div className="schedule-block">
            <h3 className="schedule-slot-title">
              <Icon name="sun" size={18} />
              {t.schedule.morning}
            </h3>
            {renderTable('morning')}
          </div>

          <div className="schedule-block">
            <h3 className="schedule-slot-title">
              <Icon name="moon" size={18} />
              {t.schedule.evening}
            </h3>
            {renderTable('evening')}
          </div>

          <div className="schedule-legend">
            <span className="legend-item">
              <span className="slot-dot slot-dot-available" /> {t.schedule.available}
            </span>
            <span className="legend-item">
              <span className="slot-dot slot-dot-limited" /> {t.schedule.limited}
            </span>
            <span className="legend-item">
              <span className="slot-dot slot-dot-full" /> {t.schedule.full}
            </span>
          </div>

          <p className="schedule-note">
            <Icon name="info" size={15} />
            {t.schedule.note}
          </p>
        </Reveal>
      </div>
    </section>
  )
}
