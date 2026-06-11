import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Section04_WhyCTOsExist() {
  const containerRef = useRef<HTMLDivElement>(null)
  const introRef = useRef<HTMLDivElement>(null)
  const untilNowRef = useRef<HTMLDivElement>(null)

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

      // Fade in the storytelling gap
      tl.fromTo(introRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1 }
      )
      
      // Hold it
      tl.to(introRef.current, { opacity: 1, duration: 1 })

      // Fade it out
      tl.to(introRef.current, { opacity: 0, y: -50, scale: 0.9, duration: 1 })

      // Reveal "UNTIL NOW" dramatically
      tl.fromTo(untilNowRef.current,
        { opacity: 0, scale: 0.5, filter: 'blur(20px)' },
        { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 1.5, ease: 'power3.out' }
      )
      
      // Hold "UNTIL NOW"
      tl.to(untilNowRef.current, { scale: 1.1, duration: 1 })

    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={containerRef} className="relative h-screen w-full bg-void flex items-center justify-center overflow-hidden">
      <div ref={introRef} className="absolute text-editorial text-white/80 text-center max-w-4xl px-8 flex flex-col gap-8">
        <p>Every successful company<br/>has technical leadership.</p>
        <p>Most great ideas don't.</p>
        <p className="text-white">That's the gap we're solving.</p>
      </div>

      <div ref={untilNowRef} className="absolute text-massive-1 gradient-text-full opacity-0">
        UNTIL NOW.
      </div>
    </section>
  )
}
