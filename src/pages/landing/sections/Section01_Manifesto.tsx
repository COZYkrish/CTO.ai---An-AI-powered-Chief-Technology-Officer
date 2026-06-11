import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Section01_Manifesto() {
  const containerRef = useRef<HTMLDivElement>(null)
  const linesRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pin and line-by-line reveal
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=150%',
          pin: true,
          scrub: 1,
        }
      })

      linesRef.current.forEach((line, i) => {
        if (!line) return
        tl.fromTo(line, 
          { opacity: 0, y: 50, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 1, ease: 'power2.out' },
          i * 0.5
        )
      })
      
      // Hold at the end
      tl.to({}, { duration: 1 })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={containerRef} className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      <div className="z-10 flex flex-col items-center justify-center text-center gap-4 px-8">
        <div ref={el => linesRef.current[0] = el} className="text-massive-3 text-white">
          HOOKED BY <span className="text-blue-500">IDEAS.</span>
        </div>
        <div ref={el => linesRef.current[1] = el} className="text-massive-3 text-white">
          OBSESSED WITH <span className="text-purple-500">ARCHITECTURE.</span>
        </div>
        <div ref={el => linesRef.current[2] = el} className="text-massive-3 text-white">
          DRIVEN BY <span className="text-cyan-500">EXECUTION.</span>
        </div>
        <div ref={el => linesRef.current[3] = el} className="text-massive-3 text-white mt-12">
          POWERED BY <span className="gradient-text-full">CTO.ai</span>
        </div>
      </div>
    </section>
  )
}
