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
        { opacity: 0, scale: 0.5, filter: 'blur(20px)' },
        { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 1.5, ease: 'power3.out' }
      )

      tl.fromTo('.features-grid > div',
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, stagger: 0.2, duration: 1, ease: 'power2.out' },
        "-=0.5"
      )
      
      tl.to({}, { duration: 1 })
      
      tl.fromTo(descRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: 'power2.out' },
        '-=0.5'
      )
      tl.to(titleRef.current, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' })
      tl.to('.features-grid > div', {
        opacity: 1,
        y: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: 'power2.out'
      }, '-=0.5')

    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={containerRef} className="relative min-h-screen w-full bg-void flex flex-col items-center justify-center overflow-hidden px-8 py-32">
      
      {/* Abstract Background Grid */}
      <div className="absolute inset-0 z-0 dot-grid opacity-20 mask-radial-fade"></div>

      <div ref={titleRef} className="z-10 text-center opacity-0 mt-12">
        <h1 className="text-massive-1 gradient-text-full leading-none">MEET CTO.AI</h1>
      </div>

      <div className="features-grid grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mt-24 max-w-7xl w-full z-10">
        <div className="flex flex-col items-center text-center p-8 glass-panel rounded-2xl opacity-0 translate-y-10">
          <div className="w-16 h-16 rounded-full bg-blue-500/20 border border-blue-500/50 flex items-center justify-center mb-6">
            <svg className="w-8 h-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
          </div>
          <h3 className="text-2xl font-bebas text-white mb-4 tracking-widest">INSTANT INFRASTRUCTURE</h3>
          <p className="text-editorial text-white/60 text-sm">Deploy AWS, GCP, or Azure configurations in seconds. Terraformed, secure, and production-ready from day zero.</p>
        </div>

        <div className="flex flex-col items-center text-center p-8 glass-panel rounded-2xl opacity-0 translate-y-10">
          <div className="w-16 h-16 rounded-full bg-purple-500/20 border border-purple-500/50 flex items-center justify-center mb-6">
            <svg className="w-8 h-8 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
          </div>
          <h3 className="text-2xl font-bebas text-white mb-4 tracking-widest">SCALABLE ARCHITECTURE</h3>
          <p className="text-editorial text-white/60 text-sm">Microservices or monoliths. We intelligently design your backend systems to survive hyper-growth and extreme load.</p>
        </div>

        <div className="flex flex-col items-center text-center p-8 glass-panel rounded-2xl opacity-0 translate-y-10">
          <div className="w-16 h-16 rounded-full bg-cyan-500/20 border border-cyan-500/50 flex items-center justify-center mb-6">
            <svg className="w-8 h-8 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
          </div>
          <h3 className="text-2xl font-bebas text-white mb-4 tracking-widest">BATTLE-TESTED SECURITY</h3>
          <p className="text-editorial text-white/60 text-sm">Enterprise-grade auth, WAF rules, and role-based access controls baked directly into your generated codebase.</p>
        </div>
      </div>

    </section>
  )
}
