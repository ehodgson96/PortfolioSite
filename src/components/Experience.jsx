import useInView from '../hooks/useInView'
import { experience } from '../data/portfolio'

export default function Experience() {
  const [ref, inView] = useInView()

  return (
    <section id="experience" className="experience" aria-labelledby="experience-heading">
      <div className="experience-inner container">
        <span className="section-label">Work History</span>
        <h2 className="section-title" id="experience-heading">Experience</h2>
        <div className="section-divider" aria-hidden="true" />

        <div ref={ref} className="timeline">
          {experience.map((job, i) => (
            <TimelineItem
              key={job.company}
              job={job}
              inView={inView}
              delay={i * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function TimelineItem({ job, inView, delay }) {
  return (
    <article
      className={`timeline-item fade-in ${inView ? 'visible' : ''}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      <div className={`timeline-dot ${job.current ? 'current' : ''}`} aria-hidden="true" />

      <div className="timeline-card">
        <div className="timeline-header">
          <h3 className="timeline-company">{job.company}</h3>
          <time className="timeline-period">{job.period}</time>
        </div>

        <div className="timeline-role-line">
          <span className="timeline-role">{job.role}</span>
          <span className="timeline-location" aria-label={`Location: ${job.location}`}>
            <PinIcon />
            {job.location}
          </span>
          {job.current && <span className="current-badge">Current</span>}
        </div>

        <ul className="timeline-highlights">
          {job.highlights.map((point, i) => (
            <li key={i} className="timeline-highlight">{point}</li>
          ))}
        </ul>
      </div>
    </article>
  )
}

function PinIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0116 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}
