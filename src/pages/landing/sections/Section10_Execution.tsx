import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Section10_Execution() {
  const containerRef = useRef<HTMLDivElement>(null)
  const statementsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=200%',
          pin: true,
          scrub: 1,
        }
      })

      statementsRef.current.forEach((stmt, i) => {
        if (!stmt) return
        tl.fromTo(stmt,
          { opacity: 0, scale: 0.9, y: 50 },
          { opacity: 1, scale: 1, y: 0, duration: 1, ease: 'power2.out' }
        )
        tl.to(stmt, { opacity: 1, duration: 0.5 })
        if (i < statementsRef.current.length - 1) {
          tl.to(stmt, { opacity: 0, y: -50, scale: 1.1, duration: 1, ease: 'power2.in' })
        }
      })
    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={containerRef} className="relative h-screen w-full bg-black flex items-center justify-center overflow-hidden">
      <div className="relative w-full h-full flex items-center justify-center px-8 text-center">
        <div ref={el => statementsRef.current[0] = el} className="absolute text-massive-2 text-white opacity-0">
          IDEAS ARE EVERYWHERE.
        </div>
        <div ref={el => statementsRef.current[1] = el} className="absolute text-massive-2 text-white opacity-0">
          EXECUTION IS RARE.
        </div>
        <div ref={el => statementsRef.current[2] = el} className="absolute text-massive-2 gradient-text-full opacity-0">
          ARCHITECTURE IS THE BRIDGE.
        </div>
      </div>
    </section>
  )
}
