import useInView from '../hooks/useInView'
import { about, stats, profile } from '../data/portfolio'

export default function About() {
  const [ref, inView] = useInView()

  return (
    <section id="about" className="about" aria-labelledby="about-heading">
      <div className="about-inner container">
        <span className="section-label">Profile</span>
        <h2 className="section-title" id="about-heading">About Me</h2>
        <div className="section-divider" aria-hidden="true" />

        <div ref={ref} className={`about-grid fade-in ${inView ? 'visible' : ''}`}>
          <div>
            <p className="about-text">{about}</p>
            <p className="about-location">
              <PinIcon />
              {profile.location}
            </p>
          </div>

          <div className="about-stats">
            {stats.map(stat => (
              <div key={stat.label} className="stat-card">
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function PinIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0116 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}
