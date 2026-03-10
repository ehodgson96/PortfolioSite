import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { projects } from '../data/portfolio'

export default function ProjectPage() {
  const { slug } = useParams()
  const navigate  = useNavigate()

  const projectIndex = projects.findIndex(p => p.slug === slug)
  const project      = projects[projectIndex]
  const prevProject  = projects[projectIndex - 1] ?? null
  const nextProject  = projects[projectIndex + 1] ?? null

  // Scroll to top whenever slug changes
  useEffect(() => { window.scrollTo(0, 0) }, [slug])

  if (!project) {
    return (
      <main className="project-page-404">
        <p>Project not found.</p>
        <Link to="/" className="btn btn-primary">Back to Portfolio</Link>
      </main>
    )
  }

  return (
    <main className="project-page">
      {/* ── Header ──────────────────────────────────────────────────── */}
      <div className="pp-header">
        <div className="container">
          <Link to="/#projects" className="pp-back-link">
            <ChevronLeftIcon /> Back to Portfolio
          </Link>

          <div className="pp-meta-row">
            <div className="pp-badges">
              {project.category === 'professional' && project.company && (
                <span className="badge badge-type">{project.company}</span>
              )}
              <span className="badge badge-type">{project.type}</span>
              <span className={`badge badge-${project.statusVariant}`}>{project.status}</span>
            </div>
            {project.period && <span className="pp-period">{project.period}</span>}
          </div>

          <h1 className="pp-title">{project.title}</h1>
          <p className="pp-summary">{project.summary}</p>

          <div className="pp-header-actions">
            {project.link && (
              <a href={project.link} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                <ExternalLinkIcon /> Visit Live Site
              </a>
            )}
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                <GitHubIcon /> View on GitHub
              </a>
            )}
          </div>
        </div>
      </div>

      {/* ── Image Gallery ───────────────────────────────────────────── */}
      {project.images && project.images.length > 0 && (
        <ImageGallery images={project.images} title={project.title} />
      )}

      {/* ── Main Content ────────────────────────────────────────────── */}
      <div className="pp-body container">
        <div className="pp-content-grid">

          {/* Left: Description + Highlights */}
          <div className="pp-main">
            <section className="pp-section">
              <h2 className="pp-section-title">Overview</h2>
              {project.description.split('\n\n').map((para, i) => (
                <p key={i} className="pp-paragraph">{para}</p>
              ))}
            </section>

            <section className="pp-section">
              <h2 className="pp-section-title">Key Highlights</h2>
              <ul className="pp-highlights">
                {project.highlights.map((point, i) => (
                  <li key={i} className="pp-highlight">{point}</li>
                ))}
              </ul>
            </section>
          </div>

          {/* Right: Sidebar */}
          <aside className="pp-sidebar">
            <div className="pp-sidebar-card">
              <h3 className="pp-sidebar-heading">Tech Stack</h3>
              <ul className="pp-tags">
                {project.tags.map(tag => (
                  <li key={tag} className="tag">{tag}</li>
                ))}
              </ul>
            </div>

            {project.category === 'professional' && (
              <div className="pp-sidebar-card">
                <h3 className="pp-sidebar-heading">Details</h3>
                {project.company && <p className="pp-sidebar-detail"><strong>Company</strong> {project.company}</p>}
                {project.period  && <p className="pp-sidebar-detail"><strong>Period</strong>  {project.period}</p>}
                <p className="pp-sidebar-detail"><strong>Type</strong> {project.type}</p>
              </div>
            )}
          </aside>
        </div>

        {/* ── Prev / Next navigation ─────────────────────────────────── */}
        <nav className="pp-nav" aria-label="Project navigation">
          <div className="pp-nav-inner">
            {prevProject ? (
              <Link to={`/project/${prevProject.slug}`} className="pp-nav-link pp-nav-prev">
                <ChevronLeftIcon />
                <span>
                  <span className="pp-nav-label">Previous</span>
                  <span className="pp-nav-title">{prevProject.title}</span>
                </span>
              </Link>
            ) : <div />}

            {nextProject ? (
              <Link to={`/project/${nextProject.slug}`} className="pp-nav-link pp-nav-next">
                <span>
                  <span className="pp-nav-label">Next</span>
                  <span className="pp-nav-title">{nextProject.title}</span>
                </span>
                <ChevronRightIcon />
              </Link>
            ) : <div />}
          </div>
        </nav>
      </div>
    </main>
  )
}

// ── Image Gallery ────────────────────────────────────────────────────────────

function ImageGallery({ images, title }) {
  const [active, setActive]   = useState(0)
  const [lightbox, setLightbox] = useState(false)

  const prev = () => setActive(i => (i - 1 + images.length) % images.length)
  const next = () => setActive(i => (i + 1) % images.length)

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!lightbox) return
    const onKey = (e) => {
      if (e.key === 'ArrowLeft')  prev()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'Escape')     setLightbox(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightbox])

  return (
    <div className="pp-gallery">
      <div className="container">
        <div className="pp-gallery-main">
          <ImageWithFallback
            src={images[active]}
            alt={`${title} screenshot ${active + 1}`}
            className="pp-gallery-img"
            onClick={() => setLightbox(true)}
          />

          {images.length > 1 && (
            <>
              <button className="pp-gallery-arrow pp-gallery-arrow-prev" onClick={prev} aria-label="Previous image">
                <ChevronLeftIcon />
              </button>
              <button className="pp-gallery-arrow pp-gallery-arrow-next" onClick={next} aria-label="Next image">
                <ChevronRightIcon />
              </button>

              <div className="pp-gallery-dots" role="tablist" aria-label="Image navigation">
                {images.map((_, i) => (
                  <button
                    key={i}
                    role="tab"
                    aria-selected={i === active}
                    className={`pp-gallery-dot ${i === active ? 'active' : ''}`}
                    onClick={() => setActive(i)}
                    aria-label={`Image ${i + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {images.length > 1 && (
          <div className="pp-gallery-thumbs">
            {images.map((src, i) => (
              <button
                key={i}
                className={`pp-gallery-thumb ${i === active ? 'active' : ''}`}
                onClick={() => setActive(i)}
                aria-label={`View image ${i + 1}`}
              >
                <ImageWithFallback src={src} alt={`Thumbnail ${i + 1}`} />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div className="pp-lightbox" onClick={() => setLightbox(false)} role="dialog" aria-modal="true" aria-label="Image lightbox">
          <button className="pp-lightbox-close" onClick={() => setLightbox(false)} aria-label="Close lightbox">
            <XIcon />
          </button>
          <button className="pp-lightbox-arrow pp-lightbox-prev" onClick={(e) => { e.stopPropagation(); prev() }} aria-label="Previous">
            <ChevronLeftIcon />
          </button>
          <img
            src={images[active]}
            alt={`${title} screenshot ${active + 1}`}
            className="pp-lightbox-img"
            onClick={e => e.stopPropagation()}
          />
          <button className="pp-lightbox-arrow pp-lightbox-next" onClick={(e) => { e.stopPropagation(); next() }} aria-label="Next">
            <ChevronRightIcon />
          </button>
        </div>
      )}
    </div>
  )
}

// Falls back to a styled placeholder if the image 404s
function ImageWithFallback({ src, alt, className, onClick }) {
  const [error, setError] = useState(false)

  if (error) {
    return (
      <div className={`img-placeholder ${className ?? ''}`} onClick={onClick} aria-label={alt}>
        <ImagePlaceholderIcon />
        <span>Screenshot coming soon</span>
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setError(true)}
      onClick={onClick}
      loading="lazy"
    />
  )
}

// ── Icons ────────────────────────────────────────────────────────────────────

function ChevronLeftIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="15 18 9 12 15 6"/></svg>
}
function ChevronRightIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="9 18 15 12 9 6"/></svg>
}
function ExternalLinkIcon() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
}
function GitHubIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844a9.59 9.59 0 012.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
}
function XIcon() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
}
function ImagePlaceholderIcon() {
  return <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
}
