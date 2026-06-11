import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import BlurText from '../../../components/ui/BlurText'

export default function Scene04_ParadigmShift() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const opacity = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0, 1, 0])
  const y = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [50, 0, -50])

  return (
    <section ref={ref} className="min-h-[150vh] relative flex flex-col items-center justify-center px-6">
      
      <motion.div style={{ opacity, y }} className="max-w-4xl mx-auto text-center relative z-10 p-12 glassmorphism rounded-3xl border border-white/20 shadow-2xl shadow-blue-500/10">
        <h2 className="text-4xl md:text-6xl font-heading text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300 mb-8 tracking-tight">
          <BlurText text="The Paradigm Shift" />
        </h2>
        
        <div className="space-y-6 text-xl md:text-2xl text-white/90 font-body max-w-3xl mx-auto leading-relaxed">
          <p>Enter the AI Chief Technology Officer.</p>
          <p>Not a coding assistant. Not an autocomplete tool. A strategic partner.</p>
          <p>Imagine an entity that understands your entire codebase, your database schema, and your business logic simultaneously. An entity that doesn't just write functions, but architects entire systems, provisions infrastructure, and manages sprints.</p>
          <p className="font-semibold text-indigo-200">It holds the complete context of your universe in its memory, 24/7.</p>
        </div>
      </motion.div>
    </section>
  )
}
