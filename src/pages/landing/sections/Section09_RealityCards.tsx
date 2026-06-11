import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const cards = [
  { prefix: "70%", text: "OF STARTUPS FAIL." },
  { prefix: "MOST FAILURES BEGIN", text: "WITH POOR PLANNING." },
  { prefix: "IDEAS ARE CHEAP.", text: "EXECUTION IS EXPENSIVE." },
  { prefix: "ARCHITECTURE IS", text: "A COMPETITIVE ADVANTAGE." }
]

import MagneticElement from '@/components/cinematic/MagneticElement'

export default function Section09_RealityCards() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.reality-card').forEach((card: any, i) => {
        gsap.fromTo(card,
          { opacity: 0, y: 150, rotateZ: i % 2 === 0 ? -5 : 5, filter: 'blur(10px)' },
          {
            opacity: 1,
            y: 0,
            rotateZ: i % 2 === 0 ? -5 : 5,
            filter: 'blur(0px)',
            duration: 1.5,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
            }
          }
        )
      })
    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={containerRef} className="relative w-full py-48 bg-transparent flex flex-col items-center justify-center gap-32 overflow-hidden px-8">
      {cards.map((card, i) => (
        <MagneticElement key={i} intensity={0.15}>
          <div 
            className={`reality-card glass-panel w-full max-w-4xl p-12 md:p-24 rounded-3xl border border-white/10 flex flex-col items-center text-center cursor-default`}
          >
            <div className="text-massive-3 text-white/50 mb-4">{card.prefix}</div>
            <div className="text-massive-2 text-white">{card.text}</div>
          </div>
        </MagneticElement>
      ))}
    </section>
  )
}
