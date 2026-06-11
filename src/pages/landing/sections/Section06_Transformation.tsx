import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Terminal } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const stages = [
  { title: "Requirements", desc: "Analyzing target audience, core loop, and MVP scope." },
  { title: "User Stories", desc: "Mapping user journeys, edge cases, and role access." },
  { title: "Architecture", desc: "Designing microservices vs monolith, event streams." },
  { title: "Database", desc: "Structuring relational schemas, NoSQL caching layers." },
  { title: "API Endpoints", desc: "Defining REST/GraphQL contracts, rate limits." },
  { title: "Infrastructure", desc: "Provisioning AWS/GCP resources, CI/CD pipelines." },
  { title: "Security", desc: "Enforcing JWT, RBAC, WAF, and encryption at rest." },
  { title: "Roadmap", desc: "Sequencing sprints, dependencies, and milestones." },
  { title: "Documentation", desc: "Generating comprehensive engineering blueprints." }
]

export default function Section06_Transformation() {
  const containerRef = useRef<HTMLDivElement>(null)
  const itemsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: `+=${stages.length * 150}%`,
          pin: true,
          scrub: 1,
        }
      })

      itemsRef.current.forEach((item, i) => {
        if (!item) return
        tl.fromTo(item,
          { opacity: 0, y: 100, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 1, ease: 'power2.out' }
        )
        
        // Hold state so it's readable
        tl.to(item, { opacity: 1, duration: 0.5 })
        
        // Fade out completely and move up if it's not the last item
        if (i < itemsRef.current.length - 1) {
          tl.to(item, { opacity: 0, y: -100, scale: 1.05, duration: 1, ease: 'power2.in' })
        }
      })

    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={containerRef} className="relative h-screen w-full bg-deep flex items-center overflow-hidden">
      
      {/* Fixed Input State */}
      <div className="absolute left-8 lg:left-24 top-1/2 -translate-y-1/2 w-full max-w-md z-20">
        <div className="text-editorial text-white/50 mb-4 font-mono">Input:</div>
        <div className="glass-panel p-6 rounded-xl border border-white/10 flex items-center gap-4">
          <Terminal className="text-blue-500 w-6 h-6" />
          <span className="text-2xl text-white font-medium font-geist">Build Netflix For Education</span>
        </div>
        <div className="mt-8 text-manifesto text-white/10 opacity-50">
          EVOLUTION
        </div>
      </div>

      {/* Scrolling Transformation Stages */}
      <div className="absolute right-8 lg:right-24 top-1/2 -translate-y-1/2 w-full max-w-xl h-[60vh] flex flex-col justify-center items-end">
        {stages.map((stage, i) => (
          <div
            key={i}
            ref={el => itemsRef.current[i] = el}
            className="absolute right-0 flex flex-col items-end text-right opacity-0"
          >
            <div className="text-massive-3 text-white leading-none mb-4">{stage.title}</div>
            <div className="text-editorial text-white/70 max-w-md">
              {stage.desc}
            </div>
          </div>
        ))}
      </div>
      
    </section>
  )
}
