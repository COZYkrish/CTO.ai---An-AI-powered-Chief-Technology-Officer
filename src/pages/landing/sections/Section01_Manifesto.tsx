import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Section01_Manifesto() {
  const containerRef = useRef<HTMLDivElement>(null)
  const linesRef = useRef<(HTMLDivElement | null)[]>([])

  useLayoutEffect(() => {
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
          { opacity: 0, y: 50, scale: 0.95, filter: 'blur(10px)' },
          { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', duration: 1, ease: 'power2.out' },
          i * 0.5
        )
      })
      
      // Hold at the end
      tl.to({}, { duration: 1 })
      // Intro paragraph fade in
      tl.fromTo('.manifesto-intro',
        { opacity: 0, y: 30, filter: 'blur(10px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.5, ease: 'power2.out' },
        "-=0.5"
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="manifesto" ref={containerRef} className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden px-8 py-32">
      
      {/* Chapter Indicator */}
      <div className="absolute top-32 left-8 md:left-16 text-white/40 font-mono text-sm tracking-[0.2em] flex items-center gap-4 hidden md:flex">
        <span>01</span>
        <div className="w-12 h-[1px] bg-white/20"></div>
        <span>THE GENESIS</span>
      </div>

      <div className="flex flex-col items-center justify-center text-center gap-2 max-w-7xl relative z-10 w-full mt-12">
        <div ref={el => linesRef.current[0] = el} className="text-massive-2 text-white leading-none">
          EVERY COMPANY
        </div>
        <div ref={el => linesRef.current[1] = el} className="text-massive-2 text-white leading-none">
          BEGINS WITH AN IDEA.
        </div>
        <div ref={el => linesRef.current[2] = el} className="text-massive-2 text-white/50 mt-8 leading-none">
          MOST NEVER
        </div>
        <div ref={el => linesRef.current[3] = el} className="text-massive-2 text-white/50 leading-none">
          BECOME SYSTEMS.
        </div>

        {/* Editorial Content */}
        <div className="manifesto-intro mt-16 text-editorial text-white/70 max-w-3xl opacity-0 px-4">
          Ideas are fragile. Without rigorous architecture, scalable infrastructure, and battle-tested engineering, even the most brilliant concepts collapse under the weight of their own execution. We build the systems that carry your vision to reality.
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-white/30 font-mono text-xs tracking-[0.2em] animate-pulse">
        <span>SCROLL</span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-white/50 to-transparent"></div>
      </div>

    </section>
  )
}
