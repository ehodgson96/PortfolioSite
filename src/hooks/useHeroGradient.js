import { useEffect, useRef } from 'react'

/**
 * Tracks mouse position relative to a given containerRef and smoothly
 * animates an interactive blob element towards it using requestAnimationFrame.
 *
 * Accepts a containerRef so the caller can attach mouse tracking at whatever
 * DOM level it wants (e.g. the <section>), decoupled from where the blobs live.
 */
export default function useHeroGradient(containerRef, interactive = true) {
  const blobRef = useRef(null)
  const cur = useRef({ x: 0, y: 0 })
  const tg  = useRef({ x: 0, y: 0 })
  const raf = useRef(null)

  useEffect(() => {
    if (!interactive) return

    function animate() {
      if (blobRef.current) {
        cur.current.x += (tg.current.x - cur.current.x) / 20
        cur.current.y += (tg.current.y - cur.current.y) / 20
        blobRef.current.style.transform =
          `translate(${Math.round(cur.current.x)}px, ${Math.round(cur.current.y)}px)`
      }
      raf.current = requestAnimationFrame(animate)
    }

    raf.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(raf.current)
  }, [interactive])

  // Mouse handler: position is relative to the containerRef element.
  // Attach this to window mousemove so events over sibling elements (glass panel) are captured.
  useEffect(() => {
    if (!interactive) return

    const onMove = (e) => {
      const el = containerRef?.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      tg.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [interactive, containerRef])

  return { blobRef }
}
