import { Link } from 'react-router-dom'
import useInView from '../hooks/useInView'
import { projects } from '../data/portfolio'

const personalProjects    = projects.filter(p => p.category === 'personal')
const professionalProjects = projects.filter(p => p.category === 'professional')

export default function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-heading">
      <div className="projects-inner container">
        <span className="section-label">Things I've Built</span>
        <h2 className="section-title" id="projects-heading">Projects</h2>
        <div className="section-divider" aria-hidden="true" />

        <ProjectGroup title="Personal" projects={personalProjects} startDelay={0} />
        <ProjectGroup title="Professional Highlights" projects={professionalProjects} startDelay={0} />
      </div>
    </section>
  )
}

function ProjectGroup({ title, projects: items, startDelay }) {
  const [ref, inView] = useInView()

  return (
    <div className="project-group" ref={ref}>
      <h3 className="project-group-label">{title}</h3>
      <div className="projects-grid">
        {items.map((project, i) => (
          <ProjectCard
            key={project.slug}
            project={project}
            inView={inView}
            delay={startDelay + i * 0.1}
          />
        ))}
      </div>
    </div>
  )
}

function ProjectCard({ project, inView, delay }) {
  return (
    <div
      className={`project-card fade-in ${inView ? 'visible' : ''}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      <div className="project-card-header">
        <div className="project-badges">
          <span className="badge badge-type">{project.type}</span>
          <span className={`badge badge-${project.statusVariant}`}>{project.status}</span>
        </div>
        {project.company && (
          <span className="project-company">{project.company}</span>
        )}
      </div>

      <h3 className="project-title">{project.title}</h3>
      <p className="project-description">{project.summary}</p>

      <ul className="project-tags" aria-label="Technologies used">
        {project.tags.slice(0, 5).map(tag => (
          <li key={tag} className="tag">{tag}</li>
        ))}
        {project.tags.length > 5 && (
          <li className="tag tag-more">+{project.tags.length - 5}</li>
        )}
      </ul>

      <div className="project-card-footer">
        <Link to={`/project/${project.slug}`} className="project-detail-link">
          View Details
          <ArrowIcon />
        </Link>
        {project.link && (
          <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-external-link" aria-label={`Visit ${project.title}`}>
            <ExternalLinkIcon />
          </a>
        )}
      </div>
    </div>
  )
}

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  )
}

function ExternalLinkIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  )
}
