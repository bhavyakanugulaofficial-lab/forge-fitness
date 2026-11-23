import { useLang } from '../i18n/LanguageContext'
import { CATEGORIES, DAYS, SCHEDULE, pick, programById } from '../data/content'
import { Modal } from './Modal'
import { Icon } from './Icons'
import { useUi } from './UiContext'

export function ProgramModal({ id, onClose }: { id: string | null; onClose: () => void }) {
  const { t, lang } = useLang()
  const { goToRegister } = useUi()

  const program = id ? programById(id) : undefined
  if (!program) return null

  const sessions = SCHEDULE.flatMap((day) => [
    ...day.morning.map((s) => ({ ...s, day: day.day, slot: 'morning' as const })),
    ...day.evening.map((s) => ({ ...s, day: day.day, slot: 'evening' as const })),
  ]).filter((s) => s.programId === program.id)

  const dayName = (dayId: string) => {
    const day = DAYS.find((d) => d.id === dayId)
    return day ? pick(day.name, lang) : ''
  }

  return (
    <Modal open={!!id} onClose={onClose} size="lg" labelledBy="program-modal-title">
      <div className="program-modal">
        <div className="program-modal-media">
          <img src={program.image} alt="" />
          <span className={`level-badge level-${program.level}`}>
            {program.level === 'all' ? t.programs.levels.all : t.programs.levels[program.level]}
          </span>
        </div>

        <div className="program-modal-body">
          <div className="program-modal-head">
            <span className="eyebrow">{pick(CATEGORIES[program.category], lang)}</span>
            <h3 className="program-modal-title" id="program-modal-title">
              {pick(program.name, lang)}
            </h3>
          </div>

          <p className="program-modal-desc">{pick(program.description, lang)}</p>

          <div className="program-modal-stats">
            <div>
              <Icon name="clock" size={16} />
              <span>{program.duration} {t.programs.mins}</span>
            </div>
            <div>
              <Icon name="calendar" size={16} />
              <span>{program.perWeek} {t.programs.perWeek}</span>
            </div>
            <div>
              <Icon name="users" size={16} />
              <span>{pick(program.suitable, lang)}</span>
            </div>
          </div>

          <h4 className="modal-subhead">{t.programs.benefits}</h4>
          <ul className="benefit-list benefit-list-lg">
            {program.benefits.map((benefit) => (
              <li key={benefit.en}>
                <span className="benefit-check">
                  <Icon name="check" size={13} />
                </span>
                {pick(benefit, lang)}
              </li>
            ))}
          </ul>

          {sessions.length > 0 && (
            <>
              <h4 className="modal-subhead">{t.programs.scheduleLabel}</h4>
              <ul className="session-mini">
                {sessions.slice(0, 4).map((session, index) => (
                  <li key={`${session.day}-${index}`}>
                    <span className="session-mini-day">{dayName(session.day)}</span>
                    <span className="session-mini-time">{session.time}</span>
                  </li>
                ))}
              </ul>
            </>
          )}

          <div className="modal-actions">
            <button className="btn btn-primary btn-block" onClick={() => goToRegister({ goals: pick(program.name, lang) })}>
              {t.programs.register}
              <Icon name="arrowRight" size={17} />
            </button>
          </div>
        </div>
      </div>
    </Modal>
  )
}
