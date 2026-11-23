import { useState } from 'react'
import { useLang } from '../i18n/LanguageContext'
import { FACILITIES, PLANS, formatInr, pick, type Billing } from '../data/content'
import { Reveal } from './Reveal'
import { SectionHead } from './SectionHead'
import { useUi } from './UiContext'
import { Icon } from './Icons'

const BILLING_OPTIONS: { id: Billing; label: 'monthly' | 'quarterly' | 'yearly'; save: 'saveMonthly' | 'saveQuarterly' | 'saveYearly' }[] = [
  { id: 'monthly', label: 'monthly', save: 'saveMonthly' },
  { id: 'quarterly', label: 'quarterly', save: 'saveQuarterly' },
  { id: 'yearly', label: 'yearly', save: 'saveYearly' },
]

const totals = (monthly: number, billing: Billing): { perMonth: number; total: number; period: string } => {
  if (billing === 'quarterly') {
    const total = Math.round(monthly * 3 * 0.9)
    return { perMonth: Math.round(total / 3), total, period: '3 mo' }
  }
  if (billing === 'yearly') {
    const total = Math.round(monthly * 12 * 0.8)
    return { perMonth: Math.round(total / 12), total, period: '12 mo' }
  }
  return { perMonth: monthly, total: monthly, period: '1 mo' }
}

export function Membership() {
  const { t, lang } = useLang()
  const { goToRegister } = useUi()
  const [billing, setBilling] = useState<Billing>('monthly')

  return (
    <section className="section membership" id="membership" aria-labelledby="membership-title">
      <div className="container">
        <SectionHead eyebrow={t.membership.eyebrow} title={t.membership.title} subtitle={t.membership.subtitle} id="membership-title" align="center" />

        <Reveal className="billing-toggle" delay={100}>
          <div className="billing-options" role="tablist" aria-label="Billing period">
            {BILLING_OPTIONS.map((option) => (
              <button
                key={option.id}
                role="tab"
                aria-selected={billing === option.id}
                className={`billing-option ${billing === option.id ? 'is-active' : ''}`}
                onClick={() => setBilling(option.id)}
              >
                <span>{t.membership[option.label]}</span>
                <em>{t.membership[option.save]}</em>
              </button>
            ))}
          </div>
        </Reveal>

        <div className="plan-grid">
          {PLANS.map((plan, index) => {
            const price = totals(plan.monthly, billing)
            return (
              <Reveal className={`plan-card ${plan.popular ? 'is-popular' : ''}`} key={plan.id} delay={index * 90}>
                {plan.popular && <span className="plan-badge">{t.membership.popular}</span>}

                <div className="plan-head">
                  <h3 className="plan-name">{pick(plan.name, lang)}</h3>
                  <p className="plan-tagline">{pick(plan.tagline, lang)}</p>
                </div>

                <div className="plan-price">
                  <span className="plan-amount">{formatInr(price.perMonth)}</span>
                  <span className="plan-per">{t.membership.perMonth}</span>
                </div>
                <p className="plan-billed">
                  {t.membership.billed} {formatInr(price.total)} / {price.period}
                </p>

                <ul className="plan-benefits">
                  {plan.benefits.map((benefit) => (
                    <li key={benefit.en}>
                      <span className="benefit-check">
                        <Icon name="check" size={12} />
                      </span>
                      {pick(benefit, lang)}
                    </li>
                  ))}
                </ul>

                <div className="plan-facilities">
                  <span className="muted-label">{t.membership.includes}</span>
                  <div className="plan-icons">
                    {plan.facilityIds.map((fid) => {
                      const facility = FACILITIES.find((f) => f.id === fid)
                      if (!facility) return null
                      return (
                        <span className="plan-icon" key={fid} title={pick(facility.name, lang)}>
                          <Icon name={facility.icon} size={15} />
                        </span>
                      )
                    })}
                  </div>
                </div>

                <button className={`btn ${plan.popular ? 'btn-primary' : 'btn-outline'} btn-block`} onClick={() => goToRegister({ plan: plan.id })}>
                  {t.membership.choose}
                  <Icon name="arrowRight" size={16} />
                </button>
              </Reveal>
            )
          })}
        </div>

        <Reveal className="plan-note" delay={200}>
          <Icon name="info" size={16} />
          {t.membership.note}
        </Reveal>
      </div>
    </section>
  )
}
