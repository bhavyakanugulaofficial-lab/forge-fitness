import { useEffect, useState, type FormEvent } from 'react'
import { useLang } from '../i18n/LanguageContext'
import { PLANS, TRAINERS, pick, planById } from '../data/content'
import { Reveal } from './Reveal'
import { SectionHead } from './SectionHead'
import { useUi } from './UiContext'
import { useToast } from './Toast'
import { Icon } from './Icons'
import { isAge, isEmail, isMobile, isName } from '../lib/validators'
import { submitRegistration, type RegistrationPayload } from '../lib/api'

interface FormState {
  name: string
  email: string
  mobile: string
  age: string
  gender: string
  plan: string
  trainer: string
  schedule: string
  goals: string
  requirements: string
  consent: boolean
}

const EMPTY: FormState = {
  name: '',
  email: '',
  mobile: '',
  age: '',
  gender: '',
  plan: '',
  trainer: '',
  schedule: '',
  goals: '',
  requirements: '',
  consent: false,
}

type Errors = Partial<Record<keyof FormState, string>>

export function Register() {
  const { t, lang } = useLang()
  const { prefill, clearPrefill } = useUi()
  const { toast } = useToast()
  const [form, setForm] = useState<FormState>(EMPTY)
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'done'>('idle')
  const [reference, setReference] = useState('')

  /* Pre-fill coming from "Choose Plan", "Book a Trainer" and the timetable. */
  useEffect(() => {
    if (!Object.values(prefill).some(Boolean)) return
    setForm((prev) => ({
      ...prev,
      plan: prefill.plan ?? prev.plan,
      trainer: prefill.trainer ?? prev.trainer,
      schedule: prefill.schedule ?? prev.schedule,
      goals: prefill.goals ?? prev.goals,
    }))
  }, [prefill])

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }))
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: '' }))
  }

  const validate = (): Errors => {
    const next: Errors = {}
    if (!isName(form.name)) next.name = t.register.errors.name
    if (!isEmail(form.email)) next.email = t.register.errors.email
    if (!isMobile(form.mobile)) next.mobile = t.register.errors.mobile
    if (!isAge(form.age)) next.age = t.register.errors.age
    if (!form.plan) next.plan = t.register.errors.required
    if (!form.schedule) next.schedule = t.register.errors.required
    if (!form.consent) next.consent = t.register.errors.consent
    return next
  }

  const submit = async (event: FormEvent) => {
    event.preventDefault()
    const next = validate()
    setErrors(next)
    if (Object.keys(next).length > 0) {
      toast(t.register.errorTitle, 'error')
      const firstInvalid = document.querySelector<HTMLElement>('.field-invalid input, .field-invalid select, .field-invalid textarea')
      firstInvalid?.focus()
      return
    }

    setStatus('sending')
    try {
      const payload: RegistrationPayload = {
        name: form.name.trim(),
        email: form.email.trim(),
        mobile: form.mobile.replace(/[\s-]/g, ''),
        age: form.age,
        gender: form.gender,
        plan: form.plan,
        trainer: form.trainer,
        schedule: form.schedule,
        goals: form.goals.trim(),
        requirements: form.requirements.trim(),
      }
      const response = await submitRegistration(payload)
      setReference(response.ref)
      setStatus('done')
      toast(t.register.successTitle.replace('{name}', form.name.trim().split(' ')[0]))
      window.scrollTo({ top: document.getElementById('register')?.offsetTop ?? 0, behavior: 'smooth' })
    } catch {
      setStatus('idle')
      toast(t.common.error, 'error')
    }
  }

  const reset = () => {
    setForm(EMPTY)
    setErrors({})
    setStatus('idle')
    setReference('')
    clearPrefill()
  }

  const plan = planById(form.plan)
  const fieldClass = (key: keyof FormState) => `field ${errors[key] ? 'field-invalid' : ''}`

  return (
    <section className="section register" id="register" aria-labelledby="register-title">
      <div className="container">
        <SectionHead eyebrow={t.register.eyebrow} title={t.register.title} subtitle={t.register.subtitle} id="register-title" />

        <Reveal className="register-shell" delay={100}>
          {status === 'done' ? (
            <div className="form-success form-success-lg">
              <span className="success-icon">
                <Icon name="check" size={34} />
              </span>
              <h3>{t.register.successTitle.replace('{name}', form.name.trim().split(' ')[0])}</h3>
              <p>{t.register.successText}</p>
              <dl className="success-meta">
                <div>
                  <dt>{t.register.refLabel}</dt>
                  <dd>{reference}</dd>
                </div>
                <div>
                  <dt>{t.register.planLabel}</dt>
                  <dd>{plan ? pick(plan.name, lang) : form.plan}</dd>
                </div>
                <div>
                  <dt>{t.register.trialLabel}</dt>
                  <dd>{t.register.trialValue}</dd>
                </div>
              </dl>
              <p className="demo-note">
                <Icon name="info" size={14} />
                {t.register.demoNote}
              </p>
              <button className="btn btn-ghost" onClick={reset}>
                {t.register.again}
              </button>
            </div>
          ) : (
            <form className="form register-form" onSubmit={submit} noValidate>
              <div className="form-grid">
                <label className={`${fieldClass('name')} span-2`}>
                  <span className="field-label">
                    {t.register.fields.name} <em>*</em>
                  </span>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => update('name', e.target.value)}
                    aria-invalid={!!errors.name}
                    autoComplete="name"
                    placeholder="Aarav Sharma"
                  />
                  {errors.name && <span className="field-error">{errors.name}</span>}
                </label>

                <label className={fieldClass('email')}>
                  <span className="field-label">
                    {t.register.fields.email} <em>*</em>
                  </span>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => update('email', e.target.value)}
                    aria-invalid={!!errors.email}
                    autoComplete="email"
                    placeholder="you@example.com"
                  />
                  {errors.email && <span className="field-error">{errors.email}</span>}
                </label>

                <label className={fieldClass('mobile')}>
                  <span className="field-label">
                    {t.register.fields.mobile} <em>*</em>
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

                <label className={fieldClass('age')}>
                  <span className="field-label">
                    {t.register.fields.age} <em>*</em>
                  </span>
                  <input
                    type="number"
                    inputMode="numeric"
                    min="13"
                    max="90"
                    value={form.age}
                    onChange={(e) => update('age', e.target.value)}
                    aria-invalid={!!errors.age}
                    placeholder="28"
                  />
                  {errors.age && <span className="field-error">{errors.age}</span>}
                </label>

                <label className={fieldClass('gender')}>
                  <span className="field-label">
                    {t.register.fields.gender} <em className="optional">({t.register.optional})</em>
                  </span>
                  <select value={form.gender} onChange={(e) => update('gender', e.target.value)}>
                    <option value="">—</option>
                    <option value="female">{t.register.genders.female}</option>
                    <option value="male">{t.register.genders.male}</option>
                    <option value="other">{t.register.genders.other}</option>
                    <option value="none">{t.register.genders.none}</option>
                  </select>
                </label>

                <label className={`${fieldClass('plan')} span-2`}>
                  <span className="field-label">
                    {t.register.fields.plan} <em>*</em>
                  </span>
                  <select value={form.plan} onChange={(e) => update('plan', e.target.value)} aria-invalid={!!errors.plan}>
                    <option value="">—</option>
                    {PLANS.map((item) => (
                      <option key={item.id} value={item.id}>
                        {pick(item.name, lang)}
                      </option>
                    ))}
                  </select>
                  {errors.plan && <span className="field-error">{errors.plan}</span>}
                </label>

                <label className={fieldClass('trainer')}>
                  <span className="field-label">
                    {t.register.fields.trainer} <em className="optional">({t.register.optional})</em>
                  </span>
                  <select value={form.trainer} onChange={(e) => update('trainer', e.target.value)}>
                    <option value="">—</option>
                    {TRAINERS.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </label>

                <label className={fieldClass('schedule')}>
                  <span className="field-label">
                    {t.register.fields.schedule} <em>*</em>
                  </span>
                  <select
                    value={form.schedule}
                    onChange={(e) => update('schedule', e.target.value)}
                    aria-invalid={!!errors.schedule}
                  >
                    <option value="">—</option>
                    {t.register.schedules.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                  {errors.schedule && <span className="field-error">{errors.schedule}</span>}
                </label>

                <label className={`${fieldClass('goals')} span-2`}>
                  <span className="field-label">{t.register.fields.goals}</span>
                  <textarea
                    rows={3}
                    value={form.goals}
                    onChange={(e) => update('goals', e.target.value)}
                    placeholder={t.assessment.goals.join(', ')}
                  />
                </label>

                <label className={`${fieldClass('requirements')} span-2`}>
                  <span className="field-label">
                    {t.register.fields.requirements} <em className="optional">({t.register.optional})</em>
                  </span>
                  <textarea
                    rows={2}
                    value={form.requirements}
                    onChange={(e) => update('requirements', e.target.value)}
                    placeholder={t.register.fields.requirements}
                  />
                </label>
              </div>

              <label className={`consent ${errors.consent ? 'field-invalid' : ''}`}>
                <input
                  type="checkbox"
                  checked={form.consent}
                  onChange={(e) => update('consent', e.target.checked)}
                  aria-invalid={!!errors.consent}
                />
                <span className="consent-box" aria-hidden="true">
                  <Icon name="check" size={13} />
                </span>
                <span className="consent-text">{t.register.consent}</span>
              </label>
              {errors.consent && <span className="field-error consent-error">{errors.consent}</span>}

              <button type="submit" className="btn btn-primary btn-lg btn-block" disabled={status === 'sending'}>
                {status === 'sending' ? t.register.sending : t.register.submit}
                {status !== 'sending' && <Icon name="arrowRight" size={18} />}
              </button>

              <p className="form-footnote">
                <Icon name="lock" size={13} />
                {t.register.demoNote}
              </p>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  )
}
