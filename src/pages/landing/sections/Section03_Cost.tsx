import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Section03_Cost() {
  const containerRef = useRef<HTMLDivElement>(null)
  const statementsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      statementsRef.current.forEach((el) => {
        if (!el) return
        gsap.fromTo(el,
          { opacity: 0, y: 100 },
          {
            opacity: 1,
            y: 0,
            duration: 1.5,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 80%',
              end: 'top 40%',
              scrub: 1
            }
          }
        )
      })
    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={containerRef} className="relative w-full py-32 bg-black flex flex-col items-center justify-center gap-64">
      <div 
        ref={el => statementsRef.current[0] = el}
        className="text-massive-3 text-white text-center px-8"
      >
        THE <span className="text-red-500">WRONG DATABASE</span><br/>CAN COST MONTHS.
      </div>

      <div 
        ref={el => statementsRef.current[1] = el}
        className="text-massive-3 text-white text-center px-8"
      >
        THE <span className="text-red-500">WRONG ARCHITECTURE</span><br/>CAN KILL GROWTH.
      </div>

      <div 
        ref={el => statementsRef.current[2] = el}
        className="text-massive-3 text-white text-center px-8"
      >
        BUILDING WITHOUT A PLAN<br/>IS <span className="text-red-500">GAMBLING.</span>
      </div>
    </section>
  )
}
