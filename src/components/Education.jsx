import useInView from '../hooks/useInView'
import { education } from '../data/portfolio'

export default function Education() {
  const [ref, inView] = useInView()

  return (
    <section id="education" className="education" aria-labelledby="education-heading">
      <div className="education-inner container">
        <span className="section-label">Academic Background</span>
        <h2 className="section-title" id="education-heading">Education</h2>
        <div className="section-divider" aria-hidden="true" />

        <div ref={ref} className="education-grid">
          {education.map((entry, i) => (
            <article
              key={entry.institution}
              className={`education-card fade-in ${inView ? 'visible' : ''}`}
              style={{ transitionDelay: `${i * 0.12}s` }}
            >
              <h3 className="education-institution">{entry.institution}</h3>
              <p className="education-qualification">{entry.qualification}</p>

              <div className="education-meta">
                <span className="education-detail">
                  <PinIcon />
                  {entry.location}
                </span>
                <span className="education-detail">
                  <CalendarIcon />
                  {entry.period}
                </span>
              </div>

              <span className="education-grade">{entry.grade}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function PinIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0116 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

function CalendarIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8"  y1="2" x2="8"  y2="6" />
      <line x1="3"  y1="10" x2="21" y2="10" />
    </svg>
  )
}
