import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import BlurText from '../../../components/ui/BlurText'

export default function Scene01_TheWeight() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const opacity = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0, 1, 0])
  const y = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [50, 0, -50])

  return (
    <section ref={ref} className="min-h-[150vh] relative flex flex-col items-center justify-center px-6">
      <motion.div style={{ opacity, y }} className="max-w-4xl mx-auto text-center relative z-10">
        <h2 className="text-4xl md:text-6xl font-heading text-white mb-8 tracking-tight">
          <BlurText text="The Weight of the Vision" />
        </h2>
        
        <div className="space-y-6 text-xl md:text-2xl text-white/80 font-body max-w-3xl mx-auto leading-relaxed">
          <p>Every great product begins as a fragile spark.</p>
          <p>You hold the vision. You see the end state. But the gap between a brilliant idea and a shipped product is a canyon filled with technical debt, architectural dead-ends, and thousands of micro-decisions.</p>
          <p>As a founder, you aren't just building a product. You are managing a constantly shifting puzzle of infrastructure, databases, scaling laws, and deployment pipelines. The weight of these decisions rests entirely on your shoulders.</p>
        </div>
      </motion.div>
    </section>
  )
}
