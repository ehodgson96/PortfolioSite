import { useState, useEffect, useRef } from 'react'
import { profile } from '../data/portfolio'
import HeroGradient from './HeroGradient'
import useHeroGradient from '../hooks/useHeroGradient'

export default function Hero() {
  const [photoError, setPhotoError]   = useState(false)
  const [hasScrolled, setHasScrolled] = useState(false)

  // heroRef — the <section> element. Used as the coordinate origin for
  // gradient blob tracking (window-level listener in the hook).
  const heroRef      = useRef(null)

  // wrapRef — the glass wrapper div. Used for the edge-only proximity glow.
  const wrapRef      = useRef(null)
  const rafRef       = useRef(null)
  const photoWrapRef = useRef(null)
  const pingRef      = useRef(null)

  // Gradient blob tracking — window-level listener inside the hook so it
  // fires even when the cursor is over the higher-z glass panel.
  const { blobRef } = useHeroGradient(heroRef, true)

  // Fade out the scroll CTA once the user starts scrolling
  useEffect(() => {
    const onScroll = () => setHasScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Proximity glow: track cursor globally, calculate distance to the glass
  // wrapper, then set CSS custom properties used by the ::before glow ring.
  useEffect(() => {
    const wrap = wrapRef.current
    if (!wrap) return

    const onMove = (e) => {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(() => {
        const rect = wrap.getBoundingClientRect()

        // Position of cursor relative to the wrapper (can be outside)
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        // Distance from cursor to the nearest point on the wrapper's border
        const dx   = Math.max(rect.left - e.clientX, 0, e.clientX - rect.right)
        const dy   = Math.max(rect.top  - e.clientY, 0, e.clientY - rect.bottom)
        const dist = Math.sqrt(dx * dx + dy * dy)

        // Full glow within 200 px, fades to zero at 200 px
        const opacity = Math.max(0, 1 - dist / 200)

        wrap.style.setProperty('--mouse-x',      `${x}px`)
        wrap.style.setProperty('--mouse-y',      `${y}px`)
        wrap.style.setProperty('--glow-opacity', opacity)
      })
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  // Photo ping: trigger once on mouseenter, let the animation complete fully
  // before allowing it to re-trigger. Removed on animationend, not mouseleave.
  useEffect(() => {
    const wrap = photoWrapRef.current
    const ping = pingRef.current
    if (!wrap || !ping) return

    const startPing = () => {
      ping.classList.remove('pinging')
      void ping.offsetWidth // force reflow to restart if needed
      ping.classList.add('pinging')
    }
    const endPing = () => ping.classList.remove('pinging')

    wrap.addEventListener('mouseenter', startPing)
    ping.addEventListener('animationend', endPing)
    return () => {
      wrap.removeEventListener('mouseenter', startPing)
      ping.removeEventListener('animationend', endPing)
    }
  }, [])

  return (
    <section id="hero" className="hero" aria-label="Introduction" ref={heroRef}>
      <HeroGradient interactive={true} blobRef={blobRef} />

      <div className="hero-inner">
        {/* Wrapper provides the border ring + edge-only proximity glow */}
        <div className="hero-glass-wrap" ref={wrapRef}>
          <div className="hero-content">
            <div className="hero-eyebrow">
              <span className="hero-eyebrow-dot" aria-hidden="true" />
              Available for new opportunities
            </div>

            <h1 className="hero-name">
              Hello, I'm <span>Elliot</span>
            </h1>

            <p className="hero-title">Software Engineer</p>
            <p className="hero-tagline">{profile.tagline}</p>

            <div className="hero-actions">
              <a href={`mailto:${profile.email}`} className="btn btn-primary">
                <EmailIcon />
                Email Me
              </a>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                <LinkedInIcon />
                LinkedIn
              </a>
              <a href={profile.github} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                <GitHubIcon />
                GitHub
              </a>
              <a href={profile.cvFile} download className="btn btn-ghost">
                <DownloadIcon />
                CV
              </a>
            </div>
          </div>
        </div>

        <div className="hero-photo-wrap" ref={photoWrapRef}>
          <span className="hero-photo-ping" ref={pingRef} aria-hidden="true" />
          {!photoError ? (
            <img
              src={profile.photo}
              alt="Elliot Hodgson"
              className="hero-photo"
              onError={() => setPhotoError(true)}
            />
          ) : (
            <div className="hero-photo-placeholder" aria-label="EH initials placeholder">EH</div>
          )}
        </div>
      </div>

      {/* Scroll CTA — fades out after the user scrolls */}
      <a
        href="#about"
        className={`hero-scroll-cta ${hasScrolled ? 'hidden' : ''}`}
        aria-label="Scroll to About section"
      >
        <span className="hero-scroll-text">Scroll</span>
        <ChevronDownIcon />
      </a>
    </section>
  )
}

function EmailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

function GitHubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844a9.59 9.59 0 012.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
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

function ChevronDownIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
}
