import { useState, useEffect } from 'react'

/**
 * Animated gradient background for the Hero section.
 * Pure CSS keyframe animations + a mouse-following blob via rAF.
 *
 * blobRef is passed in from the parent (Hero) so it can be driven
 * by a window-level mouse listener that fires even when the cursor
 * is over sibling elements like the glass panel.
 */
export default function HeroGradient({ interactive = true, blobRef }) {
  // Safari doesn't support combined filter: url() blur(), so we fall back
  // to a plain blur which still looks good.
  const [isSafari, setIsSafari] = useState(false)
  useEffect(() => {
    setIsSafari(/^((?!chrome|android).)*safari/i.test(navigator.userAgent))
  }, [])

  return (
    <div className="hero-gradient" aria-hidden="true">
      {/* SVG filter produces the liquid "goo" merge between blobs */}
      <svg className="hero-gradient-svg">
        <defs>
          <filter id="hero-goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

      <div
        className="hero-gradient-blobs"
        style={{ filter: isSafari ? 'blur(24px)' : 'url(#hero-goo) blur(40px)' }}
      >
        <div className="hg-blob hg-blob-1" />
        <div className="hg-blob hg-blob-2" />
        <div className="hg-blob hg-blob-3" />
        <div className="hg-blob hg-blob-4" />
        <div className="hg-blob hg-blob-5" />
        {interactive && <div ref={blobRef} className="hg-blob hg-blob-pointer" />}
      </div>
    </div>
  )
}
