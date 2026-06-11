import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Section08_Philosophy() {
  const containerRef = useRef<HTMLDivElement>(null)
  const bgWordsRef = useRef<HTMLDivElement>(null)
  const fgTextRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax effect
      gsap.to(bgWordsRef.current, {
        y: -300,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.5
        }
      })

      gsap.fromTo(fgTextRef.current,
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: fgTextRef.current,
            start: 'top 60%',
            end: 'top 40%',
            scrub: 1
          }
        }
      )
    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={containerRef} className="relative h-screen w-full bg-void flex items-center justify-center overflow-hidden">
      
      {/* Background massive words */}
      <div 
        ref={bgWordsRef}
        className="absolute inset-0 flex flex-col items-center justify-center opacity-[0.03] select-none pointer-events-none"
      >
        <div className="text-[15vw] leading-none font-bebas">CLARITY</div>
        <div className="text-[15vw] leading-none font-bebas">ARCHITECTURE</div>
        <div className="text-[15vw] leading-none font-bebas">SECURITY</div>
        <div className="text-[15vw] leading-none font-bebas">SCALABILITY</div>
        <div className="text-[15vw] leading-none font-bebas">EXECUTION</div>
      </div>

      {/* Foreground Statement */}
      <div ref={fgTextRef} className="z-10 text-center px-8">
        <h2 className="text-massive-2 text-white">BUILD UNDERSTANDING FIRST.</h2>
        <h2 className="text-massive-2 gradient-text-purple">WRITE CODE SECOND.</h2>
      </div>

    </section>
  )
}
