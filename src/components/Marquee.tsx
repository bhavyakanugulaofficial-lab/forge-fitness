import { useLang } from '../i18n/LanguageContext'

export function Marquee() {
  const { t } = useLang()
  const words = [...t.marquee, ...t.marquee]

  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {words.map((word, index) => (
          <span className="marquee-item" key={`${word}-${index}`}>
            <span className="marquee-text">{word}</span>
            <span className="marquee-dot" />
          </span>
        ))}
      </div>
    </div>
  )
}
