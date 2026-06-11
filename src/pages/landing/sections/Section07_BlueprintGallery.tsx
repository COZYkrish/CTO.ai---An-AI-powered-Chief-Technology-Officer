import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    title: "NETFLIX FOR EDUCATION",
    tags: ["React", "Spring Boot", "PostgreSQL", "Redis", "AWS"],
    color: "from-blue-500/20 to-purple-500/20"
  },
  {
    title: "AI E-COMMERCE PLATFORM",
    tags: ["Microservices", "JWT", "Gemini", "Redis"],
    color: "from-emerald-500/20 to-cyan-500/20"
  },
  {
    title: "SMART COMPLAINT PORTAL",
    tags: ["Security", "Spring Boot", "PostgreSQL", "Government Tech"],
    color: "from-orange-500/20 to-red-500/20"
  }
]

export default function Section07_BlueprintGallery() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.project-card').forEach((card: any) => {
        gsap.fromTo(card,
          { opacity: 0, y: 100 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
            }
          }
        )
      })
    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={containerRef} className="relative w-full py-32 bg-black px-8 lg:px-24">
      <div className="text-massive-2 text-white/20 mb-24 font-bebas">GENERATED BLUEPRINTS</div>
      
      <div className="flex flex-col gap-32">
        {projects.map((project, i) => (
          <div key={i} className="project-card group cursor-pointer">
            {/* Massive Title */}
            <div className="text-massive-3 text-white group-hover:text-blue-400 transition-colors duration-500">
              {project.title}
            </div>
            
            {/* Tags */}
            <div className="flex flex-wrap gap-4 mt-6 mb-12">
              {project.tags.map((tag, j) => (
                <span key={j} className="text-editorial text-white/50 border border-white/20 rounded-full px-6 py-2">
                  {tag}
                </span>
              ))}
            </div>
            
            {/* Abstract Preview Panel */}
            <div className={`w-full h-[60vh] rounded-3xl bg-gradient-to-br ${project.color} border border-white/10 flex items-center justify-center overflow-hidden relative glass-panel group-hover:border-white/30 transition-all duration-700`}>
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              {/* Wireframe Mock */}
              <div className="w-3/4 h-3/4 border border-white/20 rounded-2xl flex flex-col p-8 gap-6 transform group-hover:scale-105 transition-transform duration-700">
                <div className="w-full h-12 bg-white/5 rounded-lg" />
                <div className="flex gap-6 h-full">
                  <div className="w-1/3 h-full bg-white/5 rounded-lg" />
                  <div className="w-2/3 h-full bg-white/5 rounded-lg" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
