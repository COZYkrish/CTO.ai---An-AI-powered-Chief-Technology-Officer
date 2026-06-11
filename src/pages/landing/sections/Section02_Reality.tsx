import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const words = [
  { main: "ARCHITECTURE.", desc: "Microservices vs. monolith. Event-driven vs. REST. The foundational choices that dictate your trajectory.", code: "System.design() => Scalability" },
  { main: "DATABASES.", desc: "Relational schemas, NoSQL caching, sharding strategies, and multi-region replication layers.", code: "SELECT * FROM scaling_nightmares" },
  { main: "SECURITY.", desc: "JWTs, RBAC, WAF rules, encryption at rest, and zero-trust VPC configurations.", code: "401 Unauthorized" },
  { main: "SCALABILITY.", desc: "Load balancers, auto-scaling groups, and CDN edge caching to survive the HackerNews hug of death.", code: "CPU Utilization > 90%" },
  { main: "INFRASTRUCTURE.", desc: "Terraform configurations, CI/CD pipelines, Docker containers, and Kubernetes orchestration.", code: "terraform apply -auto-approve" }
]

export default function Section02_Reality() {
  const containerRef = useRef<HTMLDivElement>(null)
  const itemsRef = useRef<(HTMLDivElement | null)[]>([])

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

      itemsRef.current.forEach((item, i) => {
        if (!item) return
        
        // Target sub-elements
        const word = item.querySelector('.word')
        const desc = item.querySelector('.desc')
        const code = item.querySelector('.code')

        // Fade in block
        tl.fromTo(item,
          { opacity: 0, y: 100 },
          { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
        )

        // Stagger inner elements
        tl.fromTo(word, { opacity: 0, filter: 'blur(15px)' }, { opacity: 1, filter: 'blur(0px)', duration: 0.5 }, "<")
        tl.fromTo(desc, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, "-=0.2")
        tl.fromTo(code, { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.5 }, "-=0.4")
        
        // Hold
        tl.to(item, { opacity: 1, duration: 1 })
        
        // Fade out block completely and move up
        if (i < itemsRef.current.length - 1) {
          tl.to(item, { opacity: 0, y: -100, filter: 'blur(15px)', duration: 1, ease: 'power2.in' })
        }
      })
    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={containerRef} className="relative h-screen w-full bg-transparent flex items-center justify-center overflow-hidden">
      
      {/* Chapter Indicator */}
      <div className="absolute top-32 left-8 md:left-16 text-white/40 font-mono text-sm tracking-[0.2em] flex items-center gap-4 z-20">
        <span>02</span>
        <div className="w-12 h-[1px] bg-white/20"></div>
        <span>THE REALITY</span>
      </div>

      <div className="relative w-full h-[60vh] flex items-center justify-center">
        {words.map((item, i) => (
          <div 
            key={i} 
            ref={el => itemsRef.current[i] = el} 
            className="absolute flex flex-col items-center justify-center text-center max-w-6xl px-8 w-full opacity-0"
          >
            <div className="word text-massive-1 text-white tracking-tighter">{item.main}</div>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 mt-8 md:mt-16 w-full">
              <div className="desc text-editorial text-white/60 max-w-xl text-center md:text-left">
                {item.desc}
              </div>
              <div className="code font-mono text-blue-400/80 bg-blue-900/10 border border-blue-500/20 px-6 py-3 rounded flex-shrink-0 text-sm tracking-widest hidden md:block">
                {item.code}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
