import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import BlurText from '../../../components/ui/BlurText'

export default function Scene06_AutonomousExecution() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const opacity = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0, 1, 0])
  const y = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [50, 0, -50])

  return (
    <section ref={ref} className="min-h-[150vh] relative flex flex-col items-end justify-center px-6 lg:px-24">
      
      <motion.div style={{ opacity, y }} className="max-w-3xl text-right relative z-10 p-10 bg-black/50 backdrop-blur-md rounded-3xl border border-white/10">
        <h2 className="text-4xl md:text-6xl font-heading text-emerald-400 mb-8 tracking-tight">
          <BlurText text="Autonomous Execution" />
        </h2>
        
        <div className="space-y-6 text-xl md:text-2xl text-white/80 font-body leading-relaxed">
          <p className="text-3xl text-white font-medium">From architecture to autonomous execution.</p>
          <p>Once the blueprint is set, the AI CTO deploys specialized agent swarms.</p>
          <p>The Frontend Agent builds pixel-perfect React components. The Backend Agent wires up the API routes. The DevOps Agent configures the CI/CD pipeline.</p>
          <p>They work in parallel. They communicate with each other. They test their own code. What used to take a team of six engineers three weeks is now synthesized in hours.</p>
        </div>
      </motion.div>
    </section>
  )
}
