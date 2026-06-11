import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Section02_Reality() {
  const containerRef = useRef<HTMLDivElement>(null)
  const wordsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const words = wordsRef.current.filter(Boolean)
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: `+=${words.length * 100}%`,
          pin: true,
          scrub: 1,
        }
      })

      words.forEach((word, i) => {
        // Fade in
        tl.fromTo(word,
          { opacity: 0, scale: 0.8, y: 50 },
          { opacity: 1, scale: 1, y: 0, duration: 1, ease: 'power3.out' }
        )
        // Hold
        tl.to(word, { opacity: 1, duration: 0.5 })
        // Fade out
        if (i < words.length - 1) {
          tl.to(word, { opacity: 0, scale: 1.2, duration: 1, ease: 'power2.in' })
        }
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  const statements = [
    'ARCHITECTURE.',
    'DATABASES.',
    'SECURITY.',
    'INFRASTRUCTURE.',
    'SCALABILITY.',
    'Thousands of decisions.',
    'Millions of consequences.'
  ]

  return (
    <section ref={containerRef} className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-void">
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent via-black/50 to-black/90" />
      
      <div className="z-10 relative w-full h-full flex items-center justify-center">
        {statements.map((text, i) => (
          <div
            key={i}
            ref={el => wordsRef.current[i] = el}
            className={`absolute text-center px-4 ${i >= 5 ? 'text-manifesto' : 'text-massive-2'} text-white opacity-0`}
          >
            {text}
          </div>
        ))}
      </div>
    </section>
  )
}
