import { useState, type FormEvent } from 'react'
import { useLang } from '../i18n/LanguageContext'
import { pick, trainerById } from '../data/content'
import { Modal } from './Modal'
import { Icon } from './Icons'
import { useToast } from './Toast'
import { isMobile, isName } from '../lib/validators'
import { submitTrainerBooking } from '../lib/api'

interface FormState {
  name: string
  mobile: string
  date: string
  time: string
  goal: string
}

const TIMES = ['06:30', '08:00', '10:00', '17:30', '18:30', '19:30']

export function TrainerModal({ id, onClose }: { id: string | null; onClose: () => void }) {
  const { t, lang } = useLang()
  const { toast } = useToast()
  const trainer = id ? trainerById(id) : undefined
  const [form, setForm] = useState<FormState>({ name: '', mobile: '', date: '', time: '06:30', goal: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'done'>('idle')

  if (!trainer) return null

  const update = (key: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }))
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: '' }))
  }

  const submit = async (event: FormEvent) => {
    event.preventDefault()
    const next: Record<string, string> = {}
    if (!isName(form.name)) next.name = t.register.errors.name
    if (!isMobile(form.mobile)) next.mobile = t.register.errors.mobile
    if (!form.date) next.date = t.register.errors.required
    setErrors(next)
    if (Object.keys(next).length > 0) return

    setStatus('sending')
    try {
      await submitTrainerBooking({
        trainerId: trainer.id,
        trainerName: trainer.name,
        name: form.name,
        mobile: form.mobile,
        date: form.date,
        time: form.time,
        goal: form.goal,
      })
      setStatus('done')
      toast(`${t.trainers.successTitle} — ${trainer.name}`)
    } catch {
      setStatus('idle')
      toast(t.common.error, 'error')
    }
  }

  const today = new Date().toISOString().split('T')[0]

  return (
    <Modal open={!!id} onClose={onClose} size="md" labelledBy="trainer-modal-title">
      {status === 'done' ? (
        <div className="form-success">
          <span className="success-icon">
            <Icon name="check" size={30} />
          </span>
          <h3 id="trainer-modal-title">{t.trainers.successTitle}</h3>
          <p>{t.trainers.successText}</p>
          <button className="btn btn-primary" onClick={onClose}>
            {t.common.close}
          </button>
        </div>
      ) : (
        <div className="booking">
          <div className="booking-head">
            <img src={trainer.photo} alt="" className="booking-avatar" />
            <div>
              <h3 className="modal-title" id="trainer-modal-title">
                {trainer.name}
              </h3>
              <p className="modal-sub">{pick(trainer.specialization, lang)}</p>
            </div>
          </div>
          <p className="booking-note">{t.trainers.bookingSub}</p>

          <form className="form" onSubmit={submit} noValidate>
            <div className="field-row">
              <label className="field">
                <span className="field-label">
                  {t.trainers.fieldName} <em>*</em>
                </span>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => update('name', e.target.value)}
                  aria-invalid={!!errors.name}
                  autoComplete="name"
                  placeholder="A. Sharma"
                />
                {errors.name && <span className="field-error">{errors.name}</span>}
              </label>

              <label className="field">
                <span className="field-label">
                  {t.trainers.fieldMobile} <em>*</em>
                </span>
                <input
                  type="tel"
                  inputMode="tel"
                  value={form.mobile}
                  onChange={(e) => update('mobile', e.target.value)}
                  aria-invalid={!!errors.mobile}
                  autoComplete="tel"
                  placeholder="98765 43210"
                />
                {errors.mobile && <span className="field-error">{errors.mobile}</span>}
              </label>
            </div>

            <div className="field-row">
              <label className="field">
                <span className="field-label">
                  {t.trainers.fieldDate} <em>*</em>
                </span>
                <input
                  type="date"
                  value={form.date}
                  min={today}
                  onChange={(e) => update('date', e.target.value)}
                  aria-invalid={!!errors.date}
                />
                {errors.date && <span className="field-error">{errors.date}</span>}
              </label>

              <label className="field">
                <span className="field-label">{t.trainers.fieldTime}</span>
                <select value={form.time} onChange={(e) => update('time', e.target.value)}>
                  {TIMES.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <label className="field">
              <span className="field-label">{t.trainers.fieldGoal}</span>
              <textarea
                rows={2}
                value={form.goal}
                onChange={(e) => update('goal', e.target.value)}
                placeholder={t.assessment.goals[4]}
              />
            </label>

            <div className="modal-actions">
              <button type="submit" className="btn btn-primary btn-block" disabled={status === 'sending'}>
                {status === 'sending' ? t.common.sending : t.trainers.submit}
                {status !== 'sending' && <Icon name="arrowRight" size={17} />}
              </button>
            </div>
          </form>
        </div>
      )}
    </Modal>
  )
}
