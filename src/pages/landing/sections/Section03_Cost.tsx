import { useEffect, useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Section03_Cost() {
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=100%',
          pin: true,
          scrub: 1,
        }
      })

      // Fade in main text
      tl.fromTo(textRef.current,
        { opacity: 0, scale: 0.9, y: 50 },
        { opacity: 1, scale: 1, y: 0, duration: 1 }
      )
      
      // Fade in metrics grid
      tl.fromTo(gridRef.current,
        { opacity: 0, y: 50, filter: 'blur(10px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1 },
        "-=0.5"
      )

      tl.to({}, { duration: 1 }) // Hold
    }, containerRef)

    return () => ctx.revert()
  }, [])

  const metrics = [
    { value: "420+", label: "HOURS LOST TO DEVOPS SETUP" },
    { value: "65%", label: "OF STARTUPS FAIL DUE TO TECH DEBT" },
    { value: "3.5x", label: "SLOWER SHIP VELOCITY WITHOUT CI/CD" },
    { value: "$120k", label: "AVERAGE COST OF A WRONG DB CHOICE" }
  ]

  return (
    <section ref={containerRef} className="relative min-h-screen w-full bg-transparent flex flex-col items-center justify-center overflow-hidden px-8 py-32">
      
      {/* Chapter Indicator */}
      <div className="absolute top-32 right-8 md:right-16 text-white/40 font-mono text-sm tracking-[0.2em] flex items-center gap-4 z-20 hidden md:flex">
        <span>THE COST</span>
        <div className="w-12 h-[1px] bg-white/20"></div>
        <span>03</span>
      </div>

      <div ref={textRef} className="text-center z-10 opacity-0 mt-12">
        <h2 className="text-massive-2 text-white leading-none">THOUSANDS OF DECISIONS.</h2>
        <h2 className="text-massive-2 text-white/50 leading-none">MONTHS OF DELAY.</h2>
      </div>

      {/* Engineering Metrics Grid */}
      <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 md:gap-16 mt-24 opacity-0 z-10 max-w-7xl w-full">
        {metrics.map((m, i) => (
          <div key={i} className="flex flex-col items-center text-center">
            <div className="text-5xl md:text-6xl font-bebas text-red-500 mb-4">{m.value}</div>
            <div className="text-xs md:text-sm font-mono text-white/60 tracking-widest">{m.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
