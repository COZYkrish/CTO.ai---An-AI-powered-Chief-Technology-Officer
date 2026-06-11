import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Section10_Execution() {
  const containerRef = useRef<HTMLDivElement>(null)
  const statementsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      statementsRef.current.forEach((stmt) => {
        if (!stmt) return
        gsap.fromTo(stmt,
          { opacity: 0, y: 100, scale: 0.95, filter: 'blur(20px)' },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: 'blur(0px)',
            duration: 1.5,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: stmt,
              start: 'top 80%',
              end: 'top 30%',
              scrub: 1
            }
          }
        )
      })
    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={containerRef} className="relative w-full bg-void py-[30vh] flex flex-col items-center justify-center gap-[50vh] overflow-hidden px-8">
      
      {/* Statement 1 */}
      <div ref={el => statementsRef.current[0] = el} className="w-full max-w-7xl flex flex-col md:flex-row items-center justify-between gap-16">
        <div className="text-massive-2 text-white text-left max-w-2xl">
          IDEAS ARE<br/>EVERYWHERE.
        </div>
        <div className="w-full md:w-1/2 h-64 border border-white/10 rounded-2xl glass-panel relative overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PHBhdGggZD0iTTAgMGg0MHY0MEgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0wIDAuNWg0ME0wIDEwLjVoNDBNMCAyMC41aDQwTTAgMzAuNWg0ME0wLjUgMHY0ME0xMC41IDB2NDBNMjAuNSAwdjQwTTMwLjUgMHY0MCIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz48L3N2Zz4=')]"></div>
          <div className="text-white/30 font-mono text-sm">[ CONCEPTUAL ABSTRACTION ]</div>
        </div>
      </div>

      {/* Statement 2 */}
      <div ref={el => statementsRef.current[1] = el} className="w-full max-w-7xl flex flex-col md:flex-row-reverse items-center justify-between gap-16">
        <div className="text-massive-2 text-white text-right max-w-2xl">
          EXECUTION IS<br/>RARE.
        </div>
        <div className="w-full md:w-1/2 h-64 border border-white/10 rounded-2xl glass-panel relative overflow-hidden flex items-center justify-center bg-blue-900/10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PHBhdGggZD0iTTAgMGg0MHY0MEgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0wIDAuNWg0ME0wIDEwLjVoNDBNMCAyMC41aDQwTTAgMzAuNWg0ME0wLjUgMHY0ME0xMC41IDB2NDBNMjAuNSAwdjQwTTMwLjUgMHY0MCIgc3Ryb2tlPSJyZ2JhKDU5LDEzMCwyNDYsMC4xKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9zdmc+')]"></div>
          <div className="text-blue-400/50 font-mono text-sm">[ DEPLOYMENT PIPELINE RUNNING ]</div>
        </div>
      </div>

      {/* Statement 3 */}
      <div ref={el => statementsRef.current[2] = el} className="w-full max-w-7xl flex flex-col items-center justify-center mt-32">
        <div className="text-massive-2 gradient-text-full text-center">
          ARCHITECTURE IS<br/>THE BRIDGE.
        </div>
      </div>

    </section>
  )
}
