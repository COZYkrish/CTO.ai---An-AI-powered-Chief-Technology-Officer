import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Section05_MeetCTO() {
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const descRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 60%',
          end: 'top 20%',
          scrub: 1
        }
      })

      tl.fromTo(titleRef.current,
        { opacity: 0, y: 100, rotateX: -20 },
        { opacity: 1, y: 0, rotateX: 0, duration: 1, ease: 'power3.out' }
      )
      
      tl.fromTo(descRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: 'power2.out' },
        '-=0.5'
      )

    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={containerRef} className="relative w-full py-48 bg-void flex flex-col items-center justify-center perspective-[1000px]">
      <div ref={titleRef} className="text-center">
        <h2 className="text-massive-2 text-white">YOUR AI</h2>
        <h2 className="text-massive-2 gradient-text-blue">CHIEF TECHNOLOGY OFFICER.</h2>
      </div>
      
      <div ref={descRef} className="mt-12 text-editorial text-white/80 max-w-3xl text-center px-8">
        The system that transforms ideas<br/>into engineering blueprints.
      </div>
    </section>
  )
}
