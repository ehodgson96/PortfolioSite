import useInView from '../hooks/useInView'
import { skills } from '../data/portfolio'

export default function Skills() {
  const [ref, inView] = useInView()

  return (
    <section id="skills" aria-labelledby="skills-heading">
      <div className="skills-inner container">
        <span className="section-label">Technical Skills</span>
        <h2 className="section-title" id="skills-heading">What I Work With</h2>
        <div className="section-divider" aria-hidden="true" />

        <div ref={ref} className="skills-grid">
          {skills.map((group, i) => (
            <div
              key={group.category}
              className={`skill-group fade-in ${inView ? 'visible' : ''}`}
              style={{ transitionDelay: `${i * 0.07}s` }}
            >
              <h3 className="skill-group-title">{group.category}</h3>
              <ul className="skill-badges" aria-label={`${group.category} skills`}>
                {group.items.map(item => (
                  <li key={item} className="skill-badge">{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
