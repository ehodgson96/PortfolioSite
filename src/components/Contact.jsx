import useInView from '../hooks/useInView'
import { profile } from '../data/portfolio'

export default function Contact() {
  const [ref, inView] = useInView()

  return (
    <section id="contact" aria-labelledby="contact-heading">
      <div className="contact-inner container">
        <span className="section-label">Get In Touch</span>
        <h2 className="section-title" id="contact-heading">Contact</h2>
        <div className="section-divider" aria-hidden="true" />

        <div ref={ref} className={`fade-in ${inView ? 'visible' : ''}`}>
          <p className="contact-intro">
            I'm always open to interesting conversations about new technologies,
            ambitious projects, or just a chat. Feel free to reach out.
          </p>

          <div className="contact-cards">
            <a href={`mailto:${profile.email}`} className="contact-card">
              <div className="contact-card-icon"><EmailIcon /></div>
              <div className="contact-card-content">
                <div className="contact-card-label">Email</div>
                <div className="contact-card-value">{profile.email}</div>
              </div>
              <ArrowIcon className="contact-card-arrow" />
            </a>

            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="contact-card">
              <div className="contact-card-icon"><LinkedInIcon /></div>
              <div className="contact-card-content">
                <div className="contact-card-label">LinkedIn</div>
                <div className="contact-card-value">linkedin.com/in/elliot-hodgson</div>
              </div>
              <ArrowIcon className="contact-card-arrow" />
            </a>

            <a href={`tel:${profile.phone.replace(/\s/g, '')}`} className="contact-card">
              <div className="contact-card-icon"><PhoneIcon /></div>
              <div className="contact-card-content">
                <div className="contact-card-label">Phone</div>
                <div className="contact-card-value">{profile.phone}</div>
              </div>
              <ArrowIcon className="contact-card-arrow" />
            </a>
          </div>

          <div className="contact-actions">
            <a href={`mailto:${profile.email}`} className="btn btn-primary">
              <EmailIcon />
              Send an Email
            </a>
            <a href={profile.cvFile} download className="btn btn-outline">
              <DownloadIcon />
              Download CV
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

function EmailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

function GitHubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844a9.59 9.59 0 012.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.07 1.18 2 2 0 012.06 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.09 6.09l1.27-.84a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
    </svg>
  )
}

function ArrowIcon({ className }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  )
}

function DownloadIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  )
}
