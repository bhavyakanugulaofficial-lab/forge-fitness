import { Reveal } from './Reveal'

interface SectionHeadProps {
  eyebrow: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  id?: string
}

export function SectionHead({ eyebrow, title, subtitle, align = 'left', id }: SectionHeadProps) {
  return (
    <Reveal className={`section-head ${align === 'center' ? 'is-center' : ''}`}>
      <span className="eyebrow">
        <span className="eyebrow-line" aria-hidden="true" />
        {eyebrow}
      </span>
      <h2 className="section-title" id={id}>
        {title}
      </h2>
      {subtitle && <p className="section-sub">{subtitle}</p>}
    </Reveal>
  )
}
