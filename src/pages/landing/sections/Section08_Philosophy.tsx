import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Section08_Philosophy() {
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const editorialRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 60%',
          end: 'top 10%',
          scrub: 1
        }
      })

      tl.fromTo(textRef.current,
        { opacity: 0, scale: 0.9, filter: 'blur(20px)' },
        { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 1 }
      )

      tl.fromTo(editorialRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1 },
        "-=0.5"
      )
    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={containerRef} className="relative w-full py-48 bg-void flex flex-col items-center justify-center overflow-hidden px-8">
      <div ref={textRef} className="text-center z-10 opacity-0">
        <h2 className="text-massive-2 text-white">WE BELIEVE IN</h2>
        <h2 className="text-massive-2 gradient-text-purple">SOFTWARE THAT WORKS.</h2>
      </div>

      <div ref={editorialRef} className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32 mt-32 max-w-6xl z-10 opacity-0 px-8">
        <div>
          <h3 className="text-xl font-mono text-purple-400 mb-6 tracking-widest">// THE PROBLEM</h3>
          <p className="text-editorial text-white/70">
            The era of low-code tools taught everyone how to build toys. But when real businesses scale, they don't need toys—they need hardened, highly-available systems. The industry has democratized the UI, but it has completely neglected the deep backend engineering required to actually run a company.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-mono text-blue-400 mb-6 tracking-widest">// OUR SOLUTION</h3>
          <p className="text-editorial text-white/70">
            We don't generate simple scripts. CTO.ai operates as a senior engineering team, making architectural decisions, provisioning AWS/GCP infrastructure via Terraform, and writing microservices that scale horizontally. We are bringing rigorous computer science to the age of AI.
          </p>
        </div>
      </div>
    </section>
  )
}
