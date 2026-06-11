import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import BlurText from '../../../components/ui/BlurText'

export default function Scene05_MasterBlueprint() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const opacity = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0, 1, 0])
  const y = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [50, 0, -50])

  return (
    <section ref={ref} className="min-h-[150vh] relative flex flex-col items-start justify-center px-6 lg:px-24">
      
      <motion.div style={{ opacity, y }} className="max-w-3xl text-left relative z-10">
        <h2 className="text-4xl md:text-6xl font-heading text-white mb-8 tracking-tight">
          <BlurText text="The Master Blueprint" />
        </h2>
        
        <div className="space-y-6 text-xl md:text-2xl text-white/80 font-body leading-relaxed">
          <p className="text-3xl text-white font-medium">A living, breathing architecture.</p>
          <p>Traditional documentation is static. The AI CTO creates a dynamic Master Blueprint. From the UI components down to the serverless edge functions, every piece of your platform is mapped, analyzed, and optimized in real-time.</p>
          <p>When you propose a new feature, the AI CTO instantly calculates the impact across your entire stack—identifying bottlenecks, predicting database load, and rewriting the blueprint before a single line of code is committed.</p>
        </div>
      </motion.div>
    </section>
  )
}
