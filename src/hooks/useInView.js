import { useEffect, useRef, useState } from 'react'

/**
 * Fires once when the element enters the viewport.
 * Returns [ref, isInView].
 */
export default function useInView(options = {}) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.unobserve(el) // animate only once
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px', ...options },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return [ref, inView]
}
